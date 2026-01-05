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

// Pagination utils

"use strict";

import Express from "express";

/**
 * Max page limit
 */
export const PAGE_SIZE_DEFAULT_LIMIT = 25;

/**
 * Default page limit
 */
export const PAGE_SIZE_HARD_LIMIT = 256;

/**
 * Parses pagination parameters from query
 * @param request The request
 * @returns The pagination parameters
 */
export function parsePaginationParameters(request: Express.Request): [limit: number, continuationToken?: string] {
    let limit = PAGE_SIZE_DEFAULT_LIMIT;

    if (request.query.limit) {
        limit = parseInt(request.query.limit + "", 10) || 0;
        limit = Math.min(Math.max(1, limit), PAGE_SIZE_HARD_LIMIT);
    }

    let continuationToken: string;

    if (request.query.continuationToken) {
        continuationToken = (request.query.continuationToken + "").substring(0, 255);
    }

    return [limit, continuationToken];
}
