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

// UserDoc generation

"use strict";

require('dotenv').config();

import Path from "path";
import FS from "fs";
import { SMART_CONTRACTS } from "./contracts";
import { ContractDoc } from "./utils/user-doc";

async function main() {
    const markdownLines = [
        "# Smart contracts documentation",
        "",
        "This document contains the generated documentation of the main smart contracts.",
        "",
        "This documentation was extracted from the SolidityDoc present in the methods and events.",
        "",
    ];

    for (const contract of Object.values(SMART_CONTRACTS)) {
        if (contract.skipFromDocumentation) {
            continue;
        }

        const contractName = contract.contractName;

        let docs: ContractDoc = {
            user: {},
            dev: {},
        };

        try {
            docs = {
                user: JSON.parse(FS.readFileSync(
                    Path.resolve(__dirname, "..", "build", contractName + "_sol_" + contractName + ".userdoc.json")
                ).toString()),
                dev: JSON.parse(FS.readFileSync(
                    Path.resolve(__dirname, "..", "build", contractName + "_sol_" + contractName + ".devdoc.json")
                ).toString()),
            };
        } catch (ex) {
            console.error("Error reading documentation files: " + ex.message);
        }

        const userDoc = docs.user || {};
        const devDoc = docs.dev || {};

        markdownLines.push("## " + contractName);
        markdownLines.push("");

        markdownLines.push(userDoc.notice || "This smart contract lacks a description.");

        markdownLines.push("");

        const eventKeys = Array.from(new Set<string>(Object.keys(userDoc.events || {}).concat(Object.keys(devDoc.events || {})))).sort();

        if (eventKeys.length > 0) {
            markdownLines.push("### Events");
            markdownLines.push("");

            const userDocEvents = userDoc.events || {};
            const devDocEvents = devDoc.events || {};

            for (const event of eventKeys) {
                markdownLines.push("**" + event + "**");
                if (userDocEvents[event] && userDocEvents[event].notice) {
                    markdownLines.push(" - Description: " + userDocEvents[event].notice);
                } else if (devDocEvents[event] && devDocEvents[event].details) {
                    markdownLines.push(" - Details: " + devDocEvents[event].details);
                }


                const eventDevDoc = devDocEvents[event];

                if (eventDevDoc) {
                    if (eventDevDoc.params && Object.keys(eventDevDoc.params).length > 0) {
                        markdownLines.push(" - Parameters:");
                        for (const param of Object.keys(eventDevDoc.params)) {
                            markdownLines.push("    - `" + param + "` - " + (eventDevDoc.params[param] || "No description provided"));
                        }
                    }
                }

                markdownLines.push("");
            }

            markdownLines.push("");
        }

        const methodKeys = Array.from(new Set<string>(Object.keys(userDoc.methods || {}).concat(Object.keys(devDoc.methods || {})))).sort();

        if (methodKeys.length > 0) {
            markdownLines.push("### Methods");
            markdownLines.push("");

            const userDocMethods = userDoc.methods || {};
            const devDocMethods = devDoc.methods || {};

            for (const method of methodKeys) {
                markdownLines.push("**" + method + "**");

                if (userDocMethods[method] && userDocMethods[method].notice) {
                    markdownLines.push(" - Description: " + userDocMethods[method].notice);
                } else if (devDocMethods[method] && devDocMethods[method].details) {
                    markdownLines.push(" - Details: " + devDocMethods[method].details);
                }

                const methodDevDoc = devDocMethods[method];

                if (methodDevDoc) {
                    if (methodDevDoc.params && Object.keys(methodDevDoc.params).length > 0) {
                        markdownLines.push(" - Parameters:");
                        for (const param of Object.keys(methodDevDoc.params)) {
                            markdownLines.push("    - `" + param + "` - " + (methodDevDoc.params[param] || "No description provided"));
                        }
                    }
                    if (methodDevDoc.returns && Object.keys(methodDevDoc.returns).length > 0) {
                        markdownLines.push(" - Returns:");
                        for (const ret of Object.keys(methodDevDoc.returns)) {
                            markdownLines.push("    - `" + ret + "` - " + (methodDevDoc.returns[ret] || "No description provided"));
                        }
                    }
                }

                markdownLines.push("");
            }
        }

        markdownLines.push("");
    }

    FS.writeFileSync("CONTRACTS_DOC.md", markdownLines.join("\n"));
}

main().catch(function (ex) {
    console.error(ex);
    process.exit(1);
});
