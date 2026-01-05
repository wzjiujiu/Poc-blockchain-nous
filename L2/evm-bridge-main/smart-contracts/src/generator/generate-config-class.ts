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

// Generates configuration class for ths smart contract wrappers

"use strict";

import Path from "path";
import FS from "fs";
import { SMART_CONTRACTS } from "../contracts";
import { contractKeyToConfigKey } from "../utils/config-utils";
import { toTypescriptFileName } from "../utils/generator-utils";
import { licenseCommentLines } from "../utils/license";
import { backendSrcPath, AUTO_GEN_WARNING, tab, tab2, tab3 } from "./common";

export function generateSmartContractsConfigClass() {
    const configFile = Path.resolve(backendSrcPath, "config", "config-smart-contracts.ts");

    const lines = [];

    for (const l of licenseCommentLines) {
        lines.push(l);
    }

    lines.push(`// Smart contracts configuration`);
    lines.push(AUTO_GEN_WARNING);
    lines.push("");
    lines.push('"use strict";');
    lines.push("");

    lines.push(`import { BlockchainConfig } from "./config-blockchain";`);
    lines.push(`import { ZERO_ADDRESS } from "../utils/blockchain";`);

    for (const contractKey of Object.keys(SMART_CONTRACTS)) {
        const contractName = SMART_CONTRACTS[contractKey].contractName;
        lines.push(`import { ${contractName}Wrapper } from "../contracts/${toTypescriptFileName(contractName)}";`);
    }

    lines.push("");

    lines.push(`/**`);
    lines.push(` * Smart contracts configuration.`);
    lines.push(` */`);
    lines.push(`export class SmartContractsConfig {`);

    lines.push(tab + `// Singleton instance`);
    lines.push(tab + `private static instance: SmartContractsConfig = null;`);
    lines.push("");

    lines.push(tab + `/**`);
    lines.push(tab + ` * Gets the configuration instance.`);
    lines.push(tab + ` */`);
    lines.push(tab + `public static getInstance(): SmartContractsConfig {`);

    lines.push(tab2 + `if (SmartContractsConfig.instance) {`);
    lines.push(tab3 + `return SmartContractsConfig.instance;`);
    lines.push(tab2 + `}`);
    lines.push("");

    lines.push(tab2 + `const config: SmartContractsConfig = new SmartContractsConfig();`);
    lines.push("");

    for (const contractKey of Object.keys(SMART_CONTRACTS)) {
        const contractName = SMART_CONTRACTS[contractKey].contractName;
        lines.push(`config.${contractKey} = new ${contractName}Wrapper(process.env.${contractKeyToConfigKey(contractKey)} || ZERO_ADDRESS, { provider: BlockchainConfig.getInstance().provider });`);
    }
    lines.push("");

    lines.push(tab2 + `return config;`);

    lines.push(tab + `}`);

    lines.push("");

    for (const contractKey of Object.keys(SMART_CONTRACTS)) {
        const contractName = SMART_CONTRACTS[contractKey].contractName;
        lines.push(`public ${contractKey}: ${contractName}Wrapper;`);
    }

    lines.push(`}`);
    lines.push("");

    FS.writeFileSync(configFile, lines.join("\n"));
}
