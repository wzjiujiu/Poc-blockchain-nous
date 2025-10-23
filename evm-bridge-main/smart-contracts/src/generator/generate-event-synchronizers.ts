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

// Generates event synchronization code

"use strict";

import Path from "path";
import FS from "fs";
import { ABILike } from "@asanrom/smart-contract-wrapper";
import { toTypescriptFileName, toClassName, getModelPropertyName } from "../utils/generator-utils";
import { licenseCommentLines } from "../utils/license";
import { backendSrcPath, AUTO_GEN_WARNING, tab, tab2, tab3, tab4, tab5, tab6, tab7, tab8 } from "./common";

export function generateEventsSynchronizer(contractKey: string, contractName: string, abi: ABILike) {
    const eventSynchronizerFile = Path.resolve(backendSrcPath, "services", "synchronizers", "sync-auto-" + toTypescriptFileName(contractKey) + ".ts");

    const lines = [];

    for (const l of licenseCommentLines) {
        lines.push(l);
    }

    lines.push(`// Smart contract synchronizer for ${toClassName(contractKey)}`);
    lines.push(AUTO_GEN_WARNING);
    lines.push("");
    lines.push('"use strict";');
    lines.push("");

    lines.push(`import { SmartContractsConfig } from "../../config/config-smart-contracts";`);
    lines.push(`import { SmartContractEventSynchronizer } from "./event-synchronizer";`);

    let usesNormalizeUint256 = false;
    let usesNormalizeInt256 = false;
    let usesNormalizeAddress = false;
    let usesNormalizeBytes32 = false;
    let usesStringifyOutputAbiParam = false;

    for (const fragment of abi) {
        if (fragment.type !== "event") {
            continue;
        }

        const eventClassName = "Event" + toClassName(contractKey) + fragment.name;

        lines.push(`import { ${eventClassName} } from "../../models/event-sync/${toTypescriptFileName(contractKey)}/${toTypescriptFileName(fragment.name)}";`);

        (fragment.inputs || []).map((input) => {
            const isArray = (input.type || "").endsWith("]");

            if (!isArray && (input.type || "").startsWith("uint")) {
                usesNormalizeUint256 = true;
            } else if (!isArray && (input.type || "").startsWith("int")) {
                usesNormalizeInt256 = true;
            } else if (input.type === "address") {
                usesNormalizeAddress = true;
            } else if (input.type === "bytes32") {
                usesNormalizeBytes32 = true;
            } else if (input.type !== "string" && input.type !== "bytes" && input.type !== "bool") {
                usesStringifyOutputAbiParam = true;
            }
        });
    }

    const blockchainUtilsImports = ["createEventUID"];

    if (usesNormalizeUint256) {
        blockchainUtilsImports.push("normalizeDatabaseUint256");
    }

    if (usesNormalizeInt256) {
        blockchainUtilsImports.push("normalizeDatabaseInt256");
    }

    if (usesNormalizeAddress) {
        blockchainUtilsImports.push("normalizeAddress");
    }

    if (usesNormalizeBytes32) {
        blockchainUtilsImports.push("normalizeBytes32");
    }

    if (usesStringifyOutputAbiParam) {
        blockchainUtilsImports.push("stringifyOutputAbiParam");
    }

    if (blockchainUtilsImports.length > 0) {
        lines.push(`import { ${blockchainUtilsImports.join(", ")} } from "../../utils/blockchain";`);
    }

    lines.push("");

    lines.push(`/**`);
    lines.push(` * Event synchronizer for ${toClassName(contractKey)} (${contractName})`);
    lines.push(` */`);
    lines.push(`export class ${toClassName(contractKey)}EventSynchronizer extends SmartContractEventSynchronizer {`);

    lines.push(tab + `constructor() {`);
    lines.push(tab2 + `super(SmartContractsConfig.getInstance().${contractKey}.address);`);
    lines.push(tab + `}`);
    lines.push("");

    lines.push(tab + `getContractName(): string {`);
    lines.push(tab2 + `return "${toClassName(contractKey)}";`);
    lines.push(tab + `}`);
    lines.push("");

    lines.push(tab + `async scanEvents(fromBlock: number, toBlock: number): Promise<void> {`);

    lines.push(tab2 + `const events = await SmartContractsConfig.getInstance().${contractKey}.findEvents(fromBlock, toBlock);`);
    lines.push("");

    lines.push(tab2 + `this.logEvents(events.events);`);
    lines.push("");

    lines.push(tab2 + `for (let i = 0; i < events.length(); i++) {`);

    lines.push(tab3 + `const eventType = events.getEventType(i);`);
    lines.push(tab3 + `switch (eventType) {`);

    for (const fragment of abi) {
        if (fragment.type !== "event") {
            continue;
        }

        const eventName = fragment.name;
        const eventClassName = "Event" + toClassName(contractKey) + fragment.name;

        lines.push(tab4 + `case "${eventName}":`);
        lines.push(tab5 + `{`);

        lines.push(tab6 + `const ev = events.get${eventName}Event(i);`);
        lines.push("");
        lines.push(tab6 + `const block = Number(ev.event.log.blockNumber);`);
        lines.push(tab6 + `const timestamp = await this.getBlockTimestamp(block);`);
        lines.push(tab6 + `const eventIndex = Number(ev.event.log.logIndex);`);
        lines.push(tab6 + `const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();`);
        lines.push("");
        lines.push(tab6 + `const id = createEventUID(block, eventIndex, tx);`);
        lines.push("");

        (fragment.inputs || []).map((input, i) => {
            const propName = getModelPropertyName(input, i);
            const eventStructPropName = (input.name || ("_" + i));
            const isArray = (input.type || "").endsWith("]");

            if (!isArray && (input.type || "").startsWith("uint")) {
                lines.push(tab6 + `const ${propName} = normalizeDatabaseUint256(ev.data.${eventStructPropName});`);
            } else if (!isArray && (input.type || "").startsWith("int")) {
                lines.push(tab6 + `const ${propName} = normalizeDatabaseInt256(ev.data.${eventStructPropName});`);
            } else if (input.type === "address") {
                lines.push(tab6 + `const ${propName} = normalizeAddress(ev.data.${eventStructPropName});`);
            } else if (input.type === "bytes32") {
                lines.push(tab6 + `const ${propName} = normalizeBytes32(ev.data.${eventStructPropName});`);
            } else if (input.type === "string" || input.type === "bytes" || input.type === "bool") {
                lines.push(tab6 + `const ${propName} = ev.data.${eventStructPropName};`);
            } else {
                lines.push(tab6 + `const ${propName} = JSON.stringify(stringifyOutputAbiParam(ev.data.${eventStructPropName}));`);
            }
        });

        lines.push(tab6 + `const exists = await ${eventClassName}.exists(id);`);
        lines.push(tab6 + `if (!exists) {`);

        lines.push(tab7 + `const newEvent = new ${eventClassName}({`);

        lines.push(tab8 + `id,`);
        lines.push(tab8 + `block,`);
        lines.push(tab8 + `timestamp,`);
        lines.push(tab8 + `eventIndex,`);
        lines.push(tab8 + `tx,`);

        (fragment.inputs || []).map((input, i) => {
            lines.push(tab8 + `${getModelPropertyName(input, i)},`);
        });

        lines.push(tab7 + `});`);
        lines.push("");
        lines.push(tab7 + `await newEvent.insert();`);

        lines.push(tab6 + `}`);

        lines.push(tab5 + `}`);
        lines.push(tab5 + `break;`);
    }

    lines.push(tab3 + `}`);

    lines.push(tab2 + `}`);

    lines.push(tab + `}`);

    lines.push(tab + `async reset(): Promise<void> {`);
    for (const fragment of abi) {
        if (fragment.type !== "event") {
            continue;
        }

        const eventClassName = "Event" + toClassName(contractKey) + fragment.name;

        lines.push(tab2 + `await ${eventClassName}.reset();`);
    }
    lines.push(tab + `}`);

    lines.push(`}`);

    lines.push("");

    FS.writeFileSync(eventSynchronizerFile, lines.join("\n"));
}
