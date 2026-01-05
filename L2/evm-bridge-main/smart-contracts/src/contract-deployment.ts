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

// Contract deployment

"use strict";

import { BlockchainConfig } from "./config/config-blockchain";
import { deployProxiedContract } from "./utils/proxy";
import { ParallelTxFunc, runParallelTransactions } from "./utils/tx-parallel";
import { getContractByteCode } from "./utils/byecode";
import { BackendEnvFileEntry, updateBackendEnvFile } from "./backend-env-update";
import { DeployedContracts, PendingDeployedContracts, SMART_CONTRACTS } from "./contracts";
import { contractKeyToConfigKey } from "./utils/config-utils";
import { AsyncProvider } from "@asanrom/async-tools";

/**
 * Deploys smart contracts
 */
export async function deploySmartContracts(): Promise<DeployedContracts> {
    console.log("------------------------------------------");
    console.log("Ethereum node: " + BlockchainConfig.getInstance().url);
    console.log("Deployer: " + BlockchainConfig.getInstance().deployAccountAddress);
    console.log("------------------------------------------");

    const contracts: DeployedContracts = Object.create(null);

    // ----------------------------------------------------------
    // Deploy
    // ----------------------------------------------------------

    console.log("Deploying smart contracts...");

    const deploymentFuncs: ParallelTxFunc[] = [];

    const pendingContracts: PendingDeployedContracts = Object.create(null);

    for (const contractKey of Object.keys(SMART_CONTRACTS)) {
        pendingContracts[contractKey] = new AsyncProvider();
    }

    for (const contractKey of Object.keys(SMART_CONTRACTS)) {
        const contractConfig = SMART_CONTRACTS[contractKey];
        const contractProvider = (pendingContracts[contractKey] as AsyncProvider);
        
        if (contractConfig.deploy) {
            deploymentFuncs.push(async getTxOptions => {
                const wrapper = await contractConfig.deploy(pendingContracts, getTxOptions);
                contracts[contractKey] = wrapper;
                contractProvider.provideValue(wrapper);
            });
        } else {
            // Generic deployment (proxied)
            const bytecode = getContractByteCode(contractConfig.contractName);
            deploymentFuncs.push(async getTxOptions => {
                const wrapper = await deployProxiedContract(contractConfig.contractName, bytecode, contractConfig.wrapper, getTxOptions());
                contracts[contractKey] = wrapper;
                contractProvider.provideValue(wrapper);
            });
        }
    }

    await runParallelTransactions(deploymentFuncs);

    // ----------------------------------------------------------
    // Initialize
    // ----------------------------------------------------------

    console.log("Initializing smart contracts...");

    const initializeFuncs: ParallelTxFunc[] = [];

    for (const contractKey of Object.keys(SMART_CONTRACTS)) {
        const contractConfig = SMART_CONTRACTS[contractKey];

        if (contractConfig.initialize) {
            initializeFuncs.push(async getTxOptions => {
                await contractConfig.initialize(contracts, getTxOptions);
            });
        }
    }

    await runParallelTransactions(initializeFuncs);

    // ----------------------------------------------------------
    // Print final configuration
    // ----------------------------------------------------------

    if (!BlockchainConfig.IS_TEST) {
        console.log("------------------------------------------");
        console.log("Done. Printing final configuration...");
        console.log("------------------------------------------");
        console.log("");

        console.log("### Smart contracts ###");
        console.log("");

        const backendEnvEntries: BackendEnvFileEntry[] = [];

        for (const key of Object.keys(contracts)) {
            const configKeyName = contractKeyToConfigKey(key);
            console.log(`${configKeyName}=${contracts[key].address}`);
            console.log("");

            backendEnvEntries.push({
                name: `${configKeyName}`,
                value: contracts[key].address,
            });
        }

        console.log("------------------------------------------");
        console.log("");

        updateBackendEnvFile(backendEnvEntries);
    } else {
        console.log("------------------------------------------");
        console.log("");
    }

    return contracts;
}
