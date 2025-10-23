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

// Generates APIs controllers for smart contracts

"use strict";

import { ABILike } from "@asanrom/smart-contract-wrapper";
import { ContractDoc } from "../utils/user-doc";
import { generateApiBase } from "./generate-api-base";
import { generateApiCall } from "./generate-api-call";
import { generateApiTx } from "./generate-api-tx";
import { generateApiEvents } from "./generate-api-events";

export function generateApi(contractKey: string, contractName: string, abi: ABILike, docs: ContractDoc) {
    generateApiBase(contractKey, contractName);
    generateApiCall(contractKey, contractName, abi, docs);
    generateApiTx(contractKey, contractName, abi, docs);
    generateApiEvents(contractKey, contractName, abi, docs);
}
