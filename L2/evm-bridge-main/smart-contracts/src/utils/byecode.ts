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

// Util to get the bytecode of a contract

"use strict";

import Path from "path";
import FS from "fs";

/**
 * Reads the bytecode of a contract
 * @param name The name of the contract
 */
export function getContractByteCode(name: string, subFolder?: string): Buffer {
    const buildPath = Path.resolve(__dirname, "..", "..", "build", (subFolder ? (subFolder + "_") : "") + name + "_sol_" + name + ".bin");

    let bytecode: Buffer;

    try {
        bytecode = Buffer.from(FS.readFileSync(buildPath).toString(), "hex");
    } catch (ex) {
        console.error(ex);
        console.log("Error reading the bytecode of " + name + ". Make sure you compiled the smart contracts. Also make sure the name of the contract is correct.");
        process.exit(1);
    }

    return bytecode;
}
