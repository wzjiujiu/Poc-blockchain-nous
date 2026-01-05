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

// Utils for big integers

"use strict";

const MAX_BIG_INTEGER_SIZE = 80;

/**
 * Checks if a string is a valid big-integer
 * @param str The string
 * @returns True if the string can be parsed to big integer
 */
export function isBigInteger(str: string): boolean {
    if (str.length > MAX_BIG_INTEGER_SIZE) {
        return false; // Too long
    }
    try {
        BigInt(str);
        return true;
    } catch (ex) {
        return false;
    }
}

/**
 * Parses big-integer
 * @param bi The big integer as string
 * @returns The big integer
 */
export function parseBigInteger(bi: string): bigint {
    try {
        return BigInt(bi);
    } catch (ex) {
        return BigInt(0);
    }
}

/**
 * Creates identifier from big integer
 * @param b The big integer
 * @param size The identifier size 
 * @returns The identifier
 */
export function uintToId(b: bigint, size: number): string {
    let hex = b.toString(16);

    while (hex.length < size) {
        hex = "0" + hex;
    }

    return hex;
}
