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

// Script to generate backend APIs and models for the smart contracts

"use strict";

import Path from "path";
import FS from "fs";
import ChildProcess from "child_process";
import { rimrafSync } from 'rimraf';
import { SMART_CONTRACTS } from "./contracts";
import { backendPath, backendSrcPath } from "./generator/common";
import { generateSmartContractsConfigClass } from "./generator/generate-config-class";
import { generateSmartContractBackendCode } from "./generator/generate-contract-code";

async function main() {
    console.log("Cleaning up old generated code...");

    const apisPath = Path.resolve(backendSrcPath, "controllers", "api");
    const apisPathFilesToDelete = FS.readdirSync(apisPath).filter(f => f.startsWith("api-auto-contract-") && f.endsWith(".ts"));

    for (const toRemove of apisPathFilesToDelete) {
        FS.unlinkSync(Path.resolve(apisPath, toRemove));
    }

    const modelsPath = Path.resolve(backendSrcPath, "models", "event-sync");

    if (FS.existsSync(modelsPath)) {
        rimrafSync(modelsPath);
    }

    const synchronizersPath = Path.resolve(backendSrcPath, "services", "synchronizers");
    const synchronizersPathFilesToDelete = FS.readdirSync(synchronizersPath).filter(f => f.startsWith("sync-auto-") && f.endsWith(".ts"));

    for (const toRemove of synchronizersPathFilesToDelete) {
        FS.unlinkSync(Path.resolve(synchronizersPath, toRemove));
    }

    generateSmartContractsConfigClass();

    for (const contractKey of Object.keys(SMART_CONTRACTS)) {
        const contractName = SMART_CONTRACTS[contractKey].contractName;
        console.log("Generating backend code for contract: " + contractKey + " (" + contractName + ")");
        generateSmartContractBackendCode(contractKey, contractName);
    }

    console.log("Done: Generated backend code. Running build command...");

    await new Promise<void>((resolve, reject) => {
        const task = ChildProcess.spawn("npm", ["run", "build"], {
            cwd: backendPath,
            shell: true,
        });

        task.on("message", msg => {
            console.log(msg);
        });

        task.stderr.on("data", chunk => {
            console.log(chunk.toString());
        });

        task.stdout.on("data", chunk => {
            console.log(chunk.toString());
        });

        task.on("error", err => {
            reject(err);
        });

        task.on("exit", (code) => {
            if (code) {
                return reject("Build failed (" + code + ")");
            }
            resolve();
        });
    });
}

main().catch(function (ex) {
    console.error(ex);
    process.exit(1);
});
