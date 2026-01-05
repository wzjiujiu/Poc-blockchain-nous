// SPDX-License-Identifier: MIT
//
// The MIT License (MIT)
// 
// Copyright (c) 2025 AIR Institute and BISITE (USAL)
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Entry point file

"use strict";

require('dotenv').config();

import Cluster from "cluster";
import FS from "fs";
import Path from "path";
import { DatabaseConfig } from "./config/config-database";
import { BlockchainConfig } from "./config/config-blockchain";
import { CrashGuard } from "./crash-guard";
import { Monitor } from "./monitor";
import { BlockchainEventsScanner } from "./services/blockchain-events-scan";
import { WorkerProcess } from "./worker";
import { Config } from "./config/config";
import { TaskService } from "./services/task-service";

DatabaseConfig.getInstance(); // Initialize database

CrashGuard.enable();

const processMap: any = {};

async function main() {
    if (Cluster.isMaster) {
        Monitor.status(`Master process started. PID = ${process.pid}`);

        // Clear temp dir

        try {
            FS.mkdirSync(Path.resolve(__dirname, "..", "temp"));
        } catch (ex) { }

        const tempFiles = FS.readdirSync(Path.resolve(__dirname, "..", "temp"));

        for (const tempFile of tempFiles) {
            try {
                FS.unlinkSync(Path.resolve(__dirname, "..", "temp", tempFile));
            } catch (e) { }
        }

        Monitor.status(`Spawning workers...`);
        const numWorkers = Config.getInstance().numberOfWorkers;

        const workerEnv = Object.create(null);

        for (const key of Object.keys(process.env)) {
            workerEnv[key] = process.env[key];
        }

        workerEnv["WorkerType"] = "server";

        for (let i = 0; i < numWorkers; i++) {
            const pid = Cluster.fork(workerEnv).id;
            Monitor.debug(`Spawned ${pid}`);
            processMap[pid] = "server";
        }

        // Messages
        Cluster.on("message", (worker, message) => {
            if (typeof message === "object" && !!message && message.type === "will-die") {
                const type = processMap[worker.id];

                delete processMap[worker.id];

                if (type === "server") {
                    Monitor.info(`Server worker ${worker.id} (PID=${worker.process.pid}) will die. Spawning new worker to replace it...`);
                    const pid = Cluster.fork(workerEnv).id;
                    Monitor.debug(`Spawned ${pid}`);
                    processMap[pid] = "server";
                } else {
                    Monitor.info(`Worker ${worker.id} (PID=${worker.process.pid}) will die.`);
                }
            }
        });

        // Watch for workers
        Cluster.on("exit", function (worker, code, signal) {
            const type = processMap[worker.id];

            delete processMap[worker.id];

            if (type === "server") {
                Monitor.error(`Server worker ${worker.id} (PID=${worker.process.pid}) died (${signal || code}). Spawning new worker to replace it...`);
                const pid = Cluster.fork(workerEnv).id;
                Monitor.debug(`Spawned ${pid}`);
                processMap[pid] = "server";
            } else {
                Monitor.status(`Worker ${worker.id} (PID=${worker.process.pid}) died (${signal || code}).`);
            }
        });

        // Run blockchain sync
        if (BlockchainConfig.getInstance().sync) {
            BlockchainEventsScanner.getInstance().start().catch(err => {
                Monitor.exception(err);
            });
        }

        // Master process

        // Start task service
        TaskService.getInstance().start();

        Monitor.status("Server initialization completed");
    } else {
        Monitor.status(`Worker started. PID = ${process.pid} / WORKER ${Cluster.worker.id} / TYPE = ${process.env.WorkerType}`);

        if (process.env.WorkerType === "server") {
            const worker: WorkerProcess = new WorkerProcess();
            worker.run();
        } else {
            Monitor.error(`Environment variable WorkerType expected to be 'server', but found '${process.env.WorkerType}' | The worker cannot be started.`);
            process.exit(1);
        }
    }
}

main().catch(function (ex) {
    console.error(ex);
    process.exit(1);
});
