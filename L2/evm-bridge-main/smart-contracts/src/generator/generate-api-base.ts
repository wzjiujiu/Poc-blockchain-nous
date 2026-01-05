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

// Generates base APIs for a smart contract

"use strict";

import Path from "path";
import FS from "fs";
import { toTypescriptFileName, toClassName } from "../utils/generator-utils";
import { licenseCommentLines } from "../utils/license";
import { backendSrcPath, AUTO_GEN_WARNING, tab, tab2, tab3 } from "./common";

export function generateApiBase(contractKey: string, contractName: string) {
    const apiGroup = toTypescriptFileName(contractKey);
    const apiControllerFile = Path.resolve(backendSrcPath, "controllers", "api", "api-auto-contract-" + apiGroup + ".ts");

    const apiGroupTag = `@group ${apiGroup.replace(/\-/g, "_")} - API for smart contract: ${toClassName(contractKey)} (${contractName})`;

    const lines = [];

    for (const l of licenseCommentLines) {
        lines.push(l);
    }

    lines.push(`// Smart contract synchronizer for ${toClassName(contractKey)}`);
    lines.push(AUTO_GEN_WARNING);
    lines.push("");
    lines.push('"use strict";');
    lines.push("");

    lines.push(`import Express from "express";`);
    lines.push(`import { Controller } from "../controller";`);
    lines.push(`import { noCache, sendApiResult } from "../../utils/http-utils";`);
    lines.push(`import { SmartContractsConfig } from "../../config/config-smart-contracts";`);
    lines.push(`import { ContractEventStatus } from "../../models/contract-event-status";`);
    lines.push(`import { normalizeAddress } from "../../utils/blockchain";`);
    lines.push(`import { ${contractName}Wrapper } from "../../contracts/${toTypescriptFileName(contractName)}";`);

    lines.push("");

    lines.push(`/**`);
    lines.push(` * Auto generated smart contract API`);
    lines.push(` * Contract ${toClassName(contractKey)} (${contractName})`);
    lines.push(` * This file contains the base API for the smart contract`);
    lines.push(` * ${apiGroupTag}`);
    lines.push(` */`);

    lines.push(`export class ${toClassName(contractKey)}ContractApiBasicController extends Controller {`);

    lines.push(tab + `public registerAPI(prefix: string, application: Express.Express) {`);
    lines.push(tab2 + `application.get(prefix + "/contracts/${apiGroup}", noCache(this.getSmartContractInformation.bind(this)));`);
    lines.push(tab + `}`);

    lines.push("");

    lines.push(tab + `/**`);
    lines.push(tab + ` * Gets the information for the smart contract: ${toClassName(contractKey)}`);
    lines.push(tab + ` * Binding: GetSmartContractInformation`);
    lines.push(tab + ` * @route GET /contracts/${apiGroup}`);
    lines.push(tab + ` * ${apiGroupTag}`);
    lines.push(tab + ` * @returns {SmartContractInformation.model} 200 - Block information`);
    lines.push(tab + ` * @security BearerAuthorization`);
    lines.push(tab + ` */`);

    lines.push(tab + `public async getSmartContractInformation(request: Express.Request, response: Express.Response) {`);

    lines.push(tab2 + `const address = SmartContractsConfig.getInstance().example.address;`);
    lines.push(tab2 + `const abi = ${contractName}Wrapper.abi();`);
    lines.push("");
    lines.push(tab2 + `let firstEventBlock: number;`);
    lines.push(tab2 + `let lastSyncedEventBlock: number;`);
    lines.push("");
    lines.push(tab2 + `const eventStatus = await ContractEventStatus.finder.findByKey(normalizeAddress(address));`);
    lines.push("");
    lines.push(tab2 + `if (eventStatus) {`);
    lines.push(tab3 + `firstEventBlock = eventStatus.firstEvent;`);
    lines.push(tab3 + `lastSyncedEventBlock = eventStatus.lastSyncEvent;`);
    lines.push(tab2 + `}`);
    lines.push("");
    lines.push(tab2 + `sendApiResult(request, response, {`);
    lines.push(tab3 + `address,`);
    lines.push(tab3 + `abi,`);
    lines.push(tab3 + `firstEventBlock,`);
    lines.push(tab3 + `lastSyncedEventBlock,`);
    lines.push(tab2 + `});`);

    lines.push(tab + `}`);


    lines.push(`}`);

    lines.push("");

    FS.writeFileSync(apiControllerFile, lines.join("\n"));
}