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

// Request logs

"use strict";

import { LogsConfig } from "../config/config-logs";
import { RequestLogContext } from "../index.d";
import { Monitor, MonitorLogLevel } from "../monitor";
import { createRandomUID } from "./text-utils";

/**
 * LOgger for requests
 */
export class RequestLogger implements RequestLogContext {
    /**
     * Request identifier
     */
    public id: string;

    /**
     * Log levels enabled
     */
    public levels: { error: boolean; warning: boolean; info: boolean; debug: boolean; trace: boolean; };

    constructor() {
        this.id = createRandomUID();
        const logsConfig = LogsConfig.getInstance();
        this.levels = {
            error: logsConfig.logRequests,
            warning: logsConfig.logRequests,
            info: logsConfig.logRequests && logsConfig.logInfo,
            debug: logsConfig.logRequests && logsConfig.logDebug,
            trace: logsConfig.logRequests && logsConfig.logTrace,
        };
    }

    /**
     * Logs message for the request
     * @param level The level
     * @param msg The message
     * @param metadata The metadata
     */
    private log(level: MonitorLogLevel, msg: string, metadata?: { [key: string]: any; }) {
        Monitor.log(level, '[REQUEST] [' + level.toUpperCase() + '] ' + msg, {
            ...(metadata || {}),
            requestId: this.id,
        });
    }
    
    /**
     * Logs error message
     * @param msg The message
     * @param metadata Metadata
     */
    public error(msg: string | Error, metadata?: { [key: string]: any; }) {
        if (!this.levels.error) {
            return;
        }

        if (typeof msg === "string") {
            this.log('error', msg, metadata);
        } else {
            this.log('error', msg.message + "\n" + msg.stack, metadata);
        }
    }

    /**
     * Logs warning message
     * @param msg The message
     * @param metadata Metadata
     */
    public warning(msg: string, metadata?: { [key: string]: any; }) {
        if (!this.levels.warning) {
            return;
        }

        this.log('warn', msg, metadata);
    }

    /**
     * Logs info message
     * @param msg The message
     * @param metadata Metadata
     */
    public info(msg: string, metadata?: { [key: string]: any; }) {
        if (!this.levels.info) {
            return;
        }

        this.log('info', msg, metadata);
    }

    /**
     * Logs debug message
     * @param msg The message
     * @param metadata Metadata
     */
    public debug(msg: string, metadata?: { [key: string]: any; }) {
        if (!this.levels.debug) {
            return;
        }

        this.log('debug', msg, metadata);
    }

    /**
     * Logs trace message
     * @param msg The message
     * @param metadata Metadata
     */
    public trace(msg: string, metadata?: { [key: string]: any; }) {
        if (!this.levels.trace) {
            return;
        }

        this.log('trace', msg, metadata);
    }
}
