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

"use strict";

import Express from "express";
import { Controller } from "../controller";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, noCache, NOT_FOUND, sendApiError, sendApiResult } from "../../utils/http-utils";
import { AccountInformation, Block, BlockchainService, Transaction } from "../../services/blockchain-service";
import { normalizeAddress, sanitizeAbi, sanitizeAbiInputParameters, StringifiedOutputParam, stringifyAbiResult, validateAddress } from "../../utils/blockchain";
import { Bytes, hexWithPrefix, Interface, normalizeABIResult, Web3RPCClient } from "@asanrom/smart-contract-wrapper";
import { BlockchainConfig } from "../../config/config-blockchain";

const TX_HASH_LENGTH = 66; // 0x + 64 hex chars

/**
 * Blockchain API
 * @group blockchain
 */
export class BlockchainController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.get(prefix + "/blockchain/blocks/:block", noCache(this.getBlock.bind(this)));
        application.get(prefix + "/blockchain/account/:address", noCache(this.getAccount.bind(this)));
        application.get(prefix + "/blockchain/transactions/:tx", noCache(this.getTransaction.bind(this)));
        application.post(prefix + "/blockchain/contracts/:address/call", noCache(this.callContract.bind(this)));
    }

    /**
     * @typedef SmartContractInformation
     * @property {string} address.required - Smart contract address - eg: 0x0000000000000000000000000000000000000000
     * @property {Array.<AbiEntry>} abi.required - Smart contract ABI - eg: []
     * @property {number} firstEventBlock - Block number for the first found event
     * @property {number} lastSyncedEventBlock - Block number for the last synced event
     */

    /**
     * @typedef BlockInformation
     * @property {number} number.required - Block number
     * @property {string} hash.required - Block hash
     * @property {string} mixHash.required - Mix hash
     * @property {string} parentHash.required - Parent hash
     * @property {string} transactionsRoot.required - Transactions root
     * @property {number} timestamp.required - Block timestamp
     * @property {string} nonce - Nonce
     * @property {string} sha3Uncles - sha3Uncles
     * @property {string} logsBloom - Logs bloom
     * @property {string} stateRoot - State root
     * @property {string} receiptsRoot - Receipts root
     * @property {string} miner - Miner address
     * @property {number} difficulty - Difficulty
     * @property {number} totalDifficulty - Total difficulty
     * @property {string} extraData - Extra data
     * @property {number} size - Block size
     * @property {number} gasLimit - Gas limit
     * @property {number} gasUsed - Gas used
     * @property {number} baseFeePerGas - Base fee per gas
     * @property {Array.<string>} transactions - Block transactions hashes list
     */

    /**
     * Gets block information
     * Binding: GetBlock
     * @route GET /blockchain/blocks/{block}
     * @group blockchain - Blockchain information API
     * @param {string} block.path.required - Block number or hash - eg: latest
     * @returns {BlockInformation.model} 200 - Block information
     * @returns {void} 400 - Bad request: INVALID_BLOCK_HASH, INVALID_BLOCK
     * @returns {void} 404 - Not found: BLOCK_NOT_FOUND
     * @security BearerAuthorization
     */
    public async getBlock(request: Express.Request, response: Express.Response) {
        const block = (request.params.block || "") + "";

        let blockInfo: Block;

        try {
            if (block === "latest") {
                blockInfo = await BlockchainService.getInstance().getBlockByNumber("latest");
            } else if (block.startsWith("0x")) {

                const isValidHash = /^0x[a-fA-F0-9]{64}$/.test(block);

                if (!isValidHash) {
                    sendApiError(
                        request,
                        response,
                        BAD_REQUEST,
                        "INVALID_BLOCK_HASH"
                    );
                    return;
                }

                blockInfo = await BlockchainService.getInstance().getBlockByHash(block);
            } else {
                if (!/^-?(0|[1-9]\d*)$/.test(block)) {
                    sendApiError(
                        request,
                        response,
                        BAD_REQUEST,
                        "INVALID_BLOCK",
                    );
                    return;
                }

                let blockNumber: bigint;

                try {
                    blockNumber = BigInt(block);
                } catch (ex) {
                    sendApiError(
                        request,
                        response,
                        BAD_REQUEST,
                        "INVALID_BLOCK",
                    );
                    return;
                }

                if (blockNumber < BigInt(0)) {
                    sendApiError(
                        request,
                        response,
                        BAD_REQUEST,
                        "INVALID_BLOCK",
                    );
                    return;
                }

                blockInfo = await BlockchainService.getInstance().getBlockByNumber(blockNumber);
            }
        } catch (ex) {
            sendApiError(
                request,
                response,
                INTERNAL_SERVER_ERROR,
                "INTERNAL_SERVER_ERROR",
                ex.message,
            );
            return;
        }

        if (!blockInfo) {
            sendApiError(
                request,
                response,
                NOT_FOUND,
                "BLOCK_NOT_FOUND",
            );
            return;
        }

        sendApiResult(request, response, blockInfo);
    }

    /**
     * @typedef AccountInformation
     * @property {number} balance - Account balance
     * @property {number} totalTransactions - Total transactions
     * @property {boolean} isContract - True if address is a contract, false if not
     */

    /**
     * Gets account information
     * Binding: GetAccount
     * @route GET /blockchain/account/{address}
     * @group blockchain - Blockchain information API
     * @param {string} address.path.required - Account address
     * @returns {AccountInformation.model} 200 - Account information
     * @returns {void} 400 - Bad request: INVALID_WALLET_ADDRESS
     * @security BearerAuthorization
     */
    public async getAccount(request: Express.Request, response: Express.Response) {
        const address = (request.params.address || "") + "";

        if (!validateAddress(address)) {
            response.status(BAD_REQUEST);
            response.json({ code: "INVALID_WALLET_ADDRESS" });
            return;
        }

        let info: AccountInformation;

        try {
            info = await BlockchainService.getInstance().getAccountInfo(address);
        } catch (ex) {
            sendApiError(
                request,
                response,
                INTERNAL_SERVER_ERROR,
                "INTERNAL_SERVER_ERROR",
                ex.message,
            );
            return;
        }

        sendApiResult(request, response, info);
    }

    /**
     * @typedef TransactionLogInformation
     * @property {number} index.required - Log index
     * @property {string} address.required - Contract address - eg: 0x0000000000000000000000000000000000000000
     * @property {Array.<string>} topics.required - Log topics
     * @property {string} data.required - Log data - eg: 0x
     */

    /**
     * @typedef TransactionInformation
     * @property {string} hash.required - Transaction hash
     * @property {number} type.required - Transaction type
     * @property {string} from.required - From address
     * @property {string} blockHash - Block hash
     * @property {number} blockNumber - Block number
     * @property {number} transactionIndex - Transaction index
     * @property {string} chainId - Chain ID
     * @property {number} gas - Gas
     * @property {number} gasPrice - Gas price
     * @property {number} maxPriorityFeePerGas - Max priority fee per gas
     * @property {number} maxFeePerGas - Max fee per gas
     * @property {string} input - Transaction input
     * @property {string} nonce.required - Nonce
     * @property {string} to - To address
     * @property {number} value - Transaction value
     * @property {number} yParity - y parity
     * @property {string} v - V (signature part)
     * @property {string} r - R (signature part)
     * @property {string} s - S (signature part)
     * @property {boolean} success - True if transaction succeeded, false if reverted
     * @property {string} deployedContract - Address of the deployed smart contract
     * @property {Array.<TransactionLogInformation>} logs - Transaction logs
     */

    /**
     * Gets transaction information
     * Binding: GetTransaction
     * @route GET /blockchain/transactions/{tx}
     * @group blockchain - Blockchain information API
     * @param {string} tx.path.required - Transaction hash
     * @returns {TransactionInformation.model} 200 - Transaction information
     * @returns {void} 400 - Bad request: INVALID_TRANSACTION
     * @returns {void} 404 - Not found: TRANSACTION_NOT_FOUND
     * @security BearerAuthorization
     */
    public async getTransaction(request: Express.Request, response: Express.Response) {
        const tx = hexWithPrefix((request.params.tx || "") + "");

        if (tx.length !== TX_HASH_LENGTH) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_TRANSACTION",
            );
            return;
        }

        let transactionInfo: Transaction;

        try {
            transactionInfo = await BlockchainService.getInstance().getTransaction(tx);
        } catch (ex) {
            sendApiError(
                request,
                response,
                INTERNAL_SERVER_ERROR,
                "INTERNAL_SERVER_ERROR",
                ex.message,
            );
            return;
        }

        if (!transactionInfo) {
            sendApiError(
                request,
                response,
                NOT_FOUND,
                "TRANSACTION_NOT_FOUND",
            );
            return;
        }

        sendApiResult(request, response, transactionInfo);
    }

    /**
     * @typedef CallSmartContractBody
     * @property {Array.<AbiEntry>} abi.required - Smart contract ABI - eg: []
     * @property {string} method.required - Name of the contract method to invoke
     * @property {Array.<string>} parameters.required - Function parameters / inputs - eg: []
     */

    /**
     * @typedef CallSmartContractBadRequest
     * @property {string} code.required - Error Code:
     *  - INVALID_CONTRACT_ADDRESS: Invalid smart contract address
     *  - INVALID_ABI_OR_PARAMETERS: Invalid ABI or parameters provided
     *  - INVALID_ABI_RESULT: INvalid ABI. Cannot parse the call result using it.
     */

    /**
     * @typedef CallSmartContractResponse
     * @property {boolean} success.required - True if the call was successful, false otherwise
     * @property {Array.<string>} result - Result of the smart contract call, in an array in the same other the ABI specifies the outputs for the method
     * @property {string} error - Error message, in case success is false
     */

    /**
     * Calls a View / Pure method of a smart contract
     * In order to obtain information from the blockchain
     * related to the status of the smart contract
     * Binding: CallContract
     * @route POST /blockchain/contracts/{address}/call
     * @group blockchain - Blockchain information API
     * @param {string} address.path.required - Smart contract address
     * @param {CallSmartContractBody.model} request.body - Request body
     * @returns {CallSmartContractResponse.model} 200 - Smart contract call response
     * @returns {CallSmartContractBadRequest.model} 400 - Bad request
     * @security BearerAuthorization
     */
    public async callContract(request: Express.Request, response: Express.Response) {
        const contractAddress = normalizeAddress(request.params.address + "");

        if (!validateAddress(contractAddress)) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_CONTRACT_ADDRESS",
            );
            return;
        }

        const abi = sanitizeAbi(request.body.abi);

        const method = request.body.method + "";

        const parameters = sanitizeAbiInputParameters(request.body.parameters);

        let txData: string;
        let contractInterface: Interface;

        try {
            contractInterface = new Interface(abi);
            txData = contractInterface.encodeFunctionData(method, parameters)
        } catch (ex) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_ABI_OR_PARAMETERS",
                ex.message,
            );
            return;
        }

        let callResult: Bytes;

        try {
            callResult = await Web3RPCClient.getInstance().msgCall({
                to: contractAddress,
                data: txData,
            }, "latest", {
                provider: BlockchainConfig.getInstance().provider,
            })
        } catch (ex) {
            sendApiResult(request, response, {
                success: false,
                error: ex.message,
            });
            return;
        }

        let result: StringifiedOutputParam;

        try {
            result = stringifyAbiResult(normalizeABIResult(contractInterface.decodeFunctionResult(method, callResult)));
        } catch (ex) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_ABI_RESULT",
                ex.message,
            );
            return;
        }

        sendApiResult(request, response, {
            success: true,
            result,
        });
    }
}