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

// Monitor

"use strict";

import Cluster from "cluster";
import { formatDate } from "./utils/time-utils";
import { LogsConfig } from "./config/config-logs";

/**
 * Log level
 */
export type MonitorLogLevel = "info" | "warn" | "error" | "debug" | "trace";

/**
 * Monitor log metadata
 */
export type MonitorLogMetadata = any;


/**
 * Monitor. Logs messages.
 */
export class Monitor {
    /**
     * Logs a message.
     * @param level Log level
     * @param msg The message to log.
     * @param metadata The log metadata
     */
    public static log(_level: MonitorLogLevel, msg: string, metadata?: MonitorLogMetadata) {
        if (Cluster.isMaster || Cluster.isPrimary) {
            console.log(`[${formatDate(Date.now())}] ${msg} ${metadata ? JSON.stringify(metadata) : ''}`);
        } else {
            console.log(`[${formatDate(Date.now())}] [Worker ${Cluster.worker ? Cluster.worker.id : '-'}] ${msg} ${metadata ? JSON.stringify(metadata) : ''}`);
        }
    }

    /**
     * Logs an information message.
     * @param msg The message to log.
     * @param metadata The log metadata
     */
    public static status(msg: string, metadata?: MonitorLogMetadata) {
        Monitor.log('info', `[STATUS] ${msg}`, metadata);
    }

    /**
     * Logs an information message.
     * @param msg The message to log.
     * @param metadata The log metadata
     */
    public static info(msg: string, metadata?: MonitorLogMetadata) {
        if (!LogsConfig.getInstance().logInfo) {
            return;
        }
        Monitor.log('info', `[INFO] ${msg}`, metadata);
    }

    /**
     * Logs a debug message.
     * @param msg The message to log.
     * @param metadata The log metadata
     */
    public static debug(msg: string, metadata?: MonitorLogMetadata) {
        if (!LogsConfig.getInstance().logDebug) {
            return;
        }
        Monitor.log('debug', `[DEBUG] ${msg}`, metadata);
    }

    /**
     * Logs a trace message.
     * @param msg The message to log.
     * @param metadata The log metadata
     */
    public static trace(msg: string, metadata?: MonitorLogMetadata) {
        if (!LogsConfig.getInstance().logDebug) {
            return;
        }
        Monitor.log('trace', `[TRACE] ${msg}`, metadata);
    }

    /**
     * Logs an error stack trace for debugging purposes.
     * @param err The error to log.
     * @param metadata The log metadata
     */
    public static debugException(err: Error, metadata?: MonitorLogMetadata) {
        if (!LogsConfig.getInstance().logDebug) {
            return;
        }
        Monitor.log('error', `[DEV-ERROR] ${err.message} \n ${err.stack}`, metadata);
    }

    /**
     * Logs a warning message.
     * @param msg The message to log.
     * @param metadata The log metadata
     */
    public static warning(msg: string, metadata?: MonitorLogMetadata) {
        Monitor.log('warn', `[WARNING] ${msg}`, metadata);
    }

    /**
     * Logs an error message.
     * @param msg The message to log.
     * @param metadata The log metadata
     */
    public static error(msg: string, metadata?: MonitorLogMetadata) {
        Monitor.log('error', `[ERROR] ${msg}`, metadata);
    }

    /**
     * Logs an error stack trace.
     * @param err The error to log.
     * @param metadata The log metadata
     */
    public static exception(err: Error, metadata?: MonitorLogMetadata) {
        Monitor.log('error', `[ERROR] ${err.message} \n ${err.stack}`, metadata);
    }
}
