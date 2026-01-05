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

// API binding utilities

"use strict";

import { getServerStatus } from "../server-setup";

/**
 * API prefix
 */
export const API_PREFIX = "/api/v1";

/**
 * Gets full API URL from path
 * @param path The path
 * @returns The full API URL
 */
export function getApiUrl(path: string): string {
    const serverStatus = getServerStatus();
    return `http://127.0.0.1:${serverStatus.port}${API_PREFIX}${path}`;
}

/**
 * Generates query string for API
 * @param params The parameters
 * @returns The query string
 */
export function generateURIQuery(params: any): string {
    if (typeof params !== "object" || !params) {
        return "";
    }

    const keys = Object.keys(params);

    if (keys.length === 0) {
        return "";
    }

    let result = "";

    for (const key of keys) {
        if (params[key] === undefined || params[key] === null) {
            continue;
        }

        if (result !== "") {
            result += "&";
        } else {
            result += "?";
        }

        result += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }

    return result;
}
