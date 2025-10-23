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

// Global typescript definitions

export interface RequestLogContext {
    /**
     * Identifier to co-relate the logs
     */
    id: string;

    /**
     * Levels to check if they are enabled
     */
    levels: {
        error: boolean,
        warning: boolean,
        info: boolean,
        debug: boolean,
        trace: boolean,
    },

    /**
     * Logs an error message
     * @param msg The message
     * @param metadata The metadata
     */
    error(msg: string | Error, metadata?: {[key: string]: any});

    /**
     * Logs a warning message
     * @param msg The warning message
     * @param metadata The metadata
     */
    warning(msg: string, metadata?: {[key: string]: any});

    /**
     * Logs an info message
     * @param msg The warning message
     * @param metadata The metadata
     */
    info(msg: string, metadata?: {[key: string]: any});

    /**
     * Logs a debug message
     * @param msg The debug message
     * @param metadata The metadata
     */
    debug(msg: string, metadata?: {[key: string]: any});

    /**
     * Logs a debug message
     * @param msg The debug message
     * @param metadata The metadata
     */
    trace(msg: string, metadata?: {[key: string]: any});
}

declare global {
    namespace Express {
        export interface Request {
            user?: string;
            logger: RequestLogContext;
        }
    }
}
