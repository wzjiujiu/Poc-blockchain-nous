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

// Configuration utils

"use strict";

function isUpper(c: string): boolean {
    return c.toUpperCase() === c;
}

/**
 * Gets the env variable name for the specific smart contract
 * @param contractKey The contract key in the DeployedContracts object 
 * @returns The name of the env variable to hold the contract address
 */
export function contractKeyToConfigKey(contractKey: string): string {
    let result = "";

    let prevLower = true;

    for (let i = 0; i < contractKey.length; i++) {
        const c = contractKey.charAt(i);

        if (isUpper(c) && prevLower) {
            result += "_";
        }

        result += c.toUpperCase();

        prevLower = !isUpper(c);
    }

    return "CONTRACT_" + result;
}
