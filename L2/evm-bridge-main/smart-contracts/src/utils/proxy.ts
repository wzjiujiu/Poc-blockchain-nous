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

// ERC1967 proxy utils

"use strict";

import { AddressLike, RPCOptions, TransactionSendingOptions, deploySmartContract } from "@asanrom/smart-contract-wrapper";
import { ERC1967ProxyWrapper } from "../contract-wrappers/erc1967-proxy";
import { getContractByteCode } from "./byecode";
import { logDebug } from "./log-debug";

const ERC1967ProxyByteCode = getContractByteCode("ERC1967Proxy");

export type GenericWrapper<T> = new (address: AddressLike, rpcOptions: RPCOptions) => T;

/**
 * Deploys proxied smart contract that supports upgrades
 * @param bytecode The bytecode
 * @param wrapper The wrapper
 * @returns The smart contract wrapper
 */
export async function deployProxiedContract<T>(contractName: string, bytecode: Buffer, wrapper: GenericWrapper<T>, txOptions: TransactionSendingOptions): Promise<T> {
    // Deploy implementation
    logDebug(`[${contractName}] Deploying implementation...`);

    const deployedImplementation = await deploySmartContract(bytecode, [], [], 0, txOptions);
    const implementationAddress = deployedImplementation.result;

    logDebug(`[${contractName}] Deployed implementation: ${implementationAddress}`);

    // Deploy proxy
    logDebug(`[${contractName}] Deploying proxy (ERC1967)...`);

    const deployedProxy = await ERC1967ProxyWrapper.deploy(implementationAddress, Buffer.from(""), ERC1967ProxyByteCode, txOptions);
    const proxyAddress = deployedProxy.address;

    logDebug(`[${contractName}] Deployed proxy: ${proxyAddress}`);

    // Create wrapper

    return new wrapper(proxyAddress, txOptions);
}
