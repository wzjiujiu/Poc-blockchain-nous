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

// Smart contracts configuration
// WARNING: THIS FILE IS AUTO-GENERATED. DO NOT ADD ANY CHANGES OR THEY MAY BE LOST THE NEXT TIME YOU GENERATE THE CODE

"use strict";

import { BlockchainConfig } from "./config-blockchain";
import { ZERO_ADDRESS } from "../utils/blockchain";
import { UpgradeControlWrapper } from "../contracts/upgrade-control";
import { RoleManagerWrapper } from "../contracts/role-manager";
import { ExampleContractWrapper } from "../contracts/example-contract";

/**
 * Smart contracts configuration.
 */
export class SmartContractsConfig {
    // Singleton instance
    private static instance: SmartContractsConfig = null;

    /**
     * Gets the configuration instance.
     */
    public static getInstance(): SmartContractsConfig {
        if (SmartContractsConfig.instance) {
            return SmartContractsConfig.instance;
        }

        const config: SmartContractsConfig = new SmartContractsConfig();

        config.upgradeControl = new UpgradeControlWrapper(process.env.CONTRACT_UPGRADE_CONTROL || ZERO_ADDRESS, { provider: BlockchainConfig.getInstance().provider });
        config.roleManager = new RoleManagerWrapper(process.env.CONTRACT_ROLE_MANAGER || ZERO_ADDRESS, { provider: BlockchainConfig.getInstance().provider });
        config.example = new ExampleContractWrapper(process.env.CONTRACT_EXAMPLE || ZERO_ADDRESS, { provider: BlockchainConfig.getInstance().provider });

        return config;
    }

    public upgradeControl: UpgradeControlWrapper;
    public roleManager: RoleManagerWrapper;
    public example: ExampleContractWrapper;
}
