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

// Certificates watcher

"use strict";

import { AsyncInterval } from "@asanrom/async-tools";
import { type MainWebApplication } from "./app";
import { Monitor } from "./monitor";
import { stat, statSync } from "fs";
import { Config } from "./config/config";

// Interval wo watch for changes
const WATCH_INTERVAL_MS = 10 * 1000;

/**
 * Certificates watcher
 */
export class CertificatesWatcher {
    // App ref
    private app: MainWebApplication;

    // Last modified date
    private lastModifiedDate: number;

    private interval: AsyncInterval;

    /**
     * Constructor
     * @param app App ref
     */
    constructor(app: MainWebApplication) {
        this.app = app;
        this.interval = new AsyncInterval(this.check.bind(this), WATCH_INTERVAL_MS);
    }

    public start() {
        // Get the last modified date

        try {
            const certStats = statSync(Config.getInstance().https.certFile);
            this.lastModifiedDate = (new Date(certStats.mtime)).getTime();
        } catch (ex) {
            Monitor.exception(ex);
            this.lastModifiedDate = 0;
        }

        try {
            const keyStats = statSync(Config.getInstance().https.keyFile);
            this.lastModifiedDate = Math.max(this.lastModifiedDate, (new Date(keyStats.mtime)).getTime());
        } catch (ex) {
            Monitor.exception(ex);
        }

        this.interval.start();
    }

    private async getCertificateLastModifiedTime(): Promise<number> {
        return new Promise<number>((resolve) => {
            stat(Config.getInstance().https.certFile, (err, stats) => {
                if (err) {
                    return resolve(0);
                }

                try {
                    resolve((new Date(stats.mtime)).getTime());
                } catch (ex) {
                    Monitor.debugException(ex);
                    return resolve(0);
                }
            });
        });
    }

    private async getKeyLastModifiedTime(): Promise<number> {
        return new Promise<number>((resolve) => {
            stat(Config.getInstance().https.keyFile, (err, stats) => {
                if (err) {
                    return resolve(0);
                }

                try {
                    resolve((new Date(stats.mtime)).getTime());
                } catch (ex) {
                    Monitor.debugException(ex);
                    return resolve(0);
                }
            });
        });
    }

    /**
     * Checks for changes
     */
    private async check() {
        const certLastTime = await this.getCertificateLastModifiedTime();
        const keyLastTime = await this.getKeyLastModifiedTime();

        const latestTime = Math.max(certLastTime, keyLastTime);

        if (this.lastModifiedDate < latestTime) {
            // Changes detected

            Monitor.info("Changes in SSL certificates detected.");

            this.lastModifiedDate = latestTime;

            // Notify the master process that the server process will die

            process.send({ type: "will-die" });

            // Close the server

            await this.app.close();

            // Kill the process

            process.exit(0);
        }
    }
}
