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

// Compilation script

"use strict";

require('dotenv').config();

import ChildProcess from "child_process";
import Path from "path";
import FS from "fs";

async function main() {
    // Find smart contracts to compile

    const contractFiles = FS.readdirSync(Path.resolve(__dirname, "..", "contracts")).filter(f => f.endsWith(".sol"));

    if (FS.existsSync(Path.resolve(__dirname, "..", "contracts", "test"))) {
        const testContractFiles = FS.readdirSync(Path.resolve(__dirname, "..", "contracts", "test")).filter(f => f.endsWith(".sol"));

        for (const contractFile of testContractFiles) {
            contractFiles.push("test/" + contractFile);
        }
    }

    // Prepare and run solc command

    await new Promise<void> ((resolve, reject) => {
        const task = ChildProcess.spawn(JSON.stringify(Path.resolve(__dirname, "..", "node_modules", ".bin", "solcjs" + (process.platform === "win32" ? ".cmd" : ""))), [
            "--bin", "--abi",
            "--optimize",
            "--optimize-runs", "1",
            "--base-path", JSON.stringify(Path.resolve(__dirname, "..", "contracts")),
            "--include-path", JSON.stringify(Path.resolve(__dirname, "..", "node_modules")),
            "--output-dir", JSON.stringify(Path.resolve(__dirname, "..", "build")),
            "--pretty-json",
            "--verbose",
        ].concat(contractFiles.map(c => JSON.stringify(c))), {
            stdio: "pipe",
            env: process.env,
            cwd: Path.resolve(__dirname, "..", "contracts"),
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
                return reject("Compilation failed (" + code + ")");
            }
            resolve();
        });
    });
}

main().catch(function (ex) {
    console.error(ex);
    process.exit(1);
});
