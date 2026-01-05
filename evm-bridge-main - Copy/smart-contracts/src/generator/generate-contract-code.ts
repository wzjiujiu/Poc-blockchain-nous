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

// Generates backend code for specific smart contract

"use strict";

import Path from "path";
import FS from "fs";
import { ContractDoc } from "../utils/user-doc";
import { ABILike } from "@asanrom/smart-contract-wrapper";
import { generateEventsModels } from "./generate-event-models";
import { generateEventsSynchronizer } from "./generate-event-synchronizers";
import { generateApi } from "./generate-api";

export function generateSmartContractBackendCode(contractKey: string, contractName: string) {
    const artifactPathABI = Path.resolve(__dirname, "..", "..", "build", contractName + "_sol_" + contractName + ".abi");

    if (!FS.existsSync(artifactPathABI)) {
        console.log(`Error: Contract ${contractName} not found (${artifactPathABI}). Make sure you have compiled the contracts first`);
        process.exit(1);
    }

    const abi = JSON.parse(FS.readFileSync(artifactPathABI).toString()) as ABILike;

    let docs: ContractDoc = {
        user: {},
        dev: {},
    };

    try {
        docs = {
            user: JSON.parse(FS.readFileSync(
                Path.resolve(__dirname, "..", "..", "build", contractName + "_sol_" + contractName + ".userdoc.json")
            ).toString()),
            dev: JSON.parse(FS.readFileSync(
                Path.resolve(__dirname, "..", "..", "build", contractName + "_sol_" + contractName + ".devdoc.json")
            ).toString()),
        };
    } catch (ex) {
        console.error("Error reading documentation files: " + ex.message);
    }

    generateEventsModels(contractKey, contractName, abi);
    generateEventsSynchronizer(contractKey, contractName, abi);
    generateApi(contractKey, contractName, abi, docs);
}