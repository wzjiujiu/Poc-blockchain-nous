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
import { BAD_REQUEST, ensureObjectBody, noCache, sendApiError, sendApiResult } from "../../utils/http-utils";
import { normalizeAddress, sanitizeAbi, sanitizeAbiInputParameters, validateAddress } from "../../utils/blockchain";
import { BlockchainConfig } from "../../config/config-blockchain";
import { getTxBuildDetailsForDeploy, hexNoPrefix, hexWithPrefix, Interface, TransactionBuildDetails, TransactionReceipt, Web3RPCClient } from "@asanrom/smart-contract-wrapper";
import { Monitor } from "../../monitor";
import { isBigInteger, parseBigInteger } from "../../utils/bigint";
import { handleTransactionSending } from "../../utils/tx-sending";

/**
 * Transaction API
 * @group transaction
 */
export class TransactionController extends Controller {
    public registerAPI(prefix: string, application: Express.Express): any {
        application.get(prefix + "/tx/account/:address", noCache(this.getAccountTransactionState.bind(this)));

        application.post(prefix + "/tx/gas/estimation", ensureObjectBody(this.estimateTransactionGas.bind(this)));

        application.post(prefix + "/tx/signed", ensureObjectBody(this.sendSignedTransaction.bind(this)));

        application.post(prefix + "/tx", ensureObjectBody(this.sendTransaction.bind(this)));

        application.post(prefix + "/tx/contract/deployment", ensureObjectBody(this.deploySmartContract.bind(this)));

        application.post(prefix + "/tx/contract", ensureObjectBody(this.sendSmartContractTransaction.bind(this)));
    }

    /**
     * @typedef TxBadRequest
     * @property {string} code.required - Error Code:
     *  - INVALID_PARAMETERS: Invalid smart contract function parameters
     *  - INVALID_VALUE: Invalid transaction value
     */

    /**
     * @typedef TxSigningOptions
     * @property {enum} mode.required - Mode for signing the transaction. Can be return_data(do not sign, return the transaction data), wallet(use a wallet) or private_key (use a private key) - eg: return_data,wallet,private_key
     * @property {string} walletId - ID of the wallet to use
     * @property {string} walletPassword - Password to unlock the wallet
     * @property {string} privateKey - Private key to sign the transaction (hexadecimal)
     */

    /**
     * @typedef TxSigningForbiddenResponse
     * @property {string} code.required - Error Code:
     *  - ACCESS_DENIED: Access denied to the API
     *  - WALLET_NOT_FOUND: Wallet not found
     *  - INVALID_WALLET_PASSWORD: Invalid wallet password
     *  - INVALID_PRIVATE_KEY: Invalid private key provided
     */

    /**
     * @typedef TransactionData
     * @property {string} to - Destination address of the transaction
     * @property {string} data.required - Transaction data (hexadecimal)
     * @property {string} value.required - Transaction value (hexadecimal with 0x prefix)
     */

    /**
     * @typedef TxResponse
     * @property {SendSignedTransactionResponse.model} sendResult - Result for sending the transaction
     * @property {TransactionData.model} transactionData - Transaction data (only of mode = return_data)
     */

    /**
     * @typedef AccountTransactionState
     * @property {string} nonce.required - Next transaction nonce (hexadecimal with 0x prefix)
     * @property {number} chainId.required - Chain ID
     */

    /**
     * Gets the account status required to send a transaction
     * Binding: GetAccountTransactionState
     * @route GET /tx/account/{address}
     * @group transaction - Transaction sending API
     * @param {string} address.path.required - Address
     * @returns {AccountTransactionState.model} 200 - OK
     * @returns {void} 400 - Bad request (Invalid address)
     * @security BearerAuthorization
     */
    public async getAccountTransactionState(request: Express.Request, response: Express.Response) {
        const address = normalizeAddress(request.params.address + "");

        if (!validateAddress(address)) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_ADDRESS", "Invalid address provided");
            return;
        }

        const nonce = await Web3RPCClient.getInstance().getTransactionCount(address, "pending", {
            provider: BlockchainConfig.getInstance().provider,
        });

        const chainId = await Web3RPCClient.getInstance().getNetworkId({
            provider: BlockchainConfig.getInstance().provider,
        });

        response.json({
            nonce: hexWithPrefix(nonce.toString(16)),
            chainId: Number(chainId),
        });
    }

    /**
     * @typedef GasEstimationRequest
     * @property {string} to - Destination address of the transaction
     * @property {string} from.required - Sender address
     * @property {string} data.required - Transaction data (hexadecimal)
     * @property {string} value.required - Transaction value (hexadecimal with 0x prefix)
     */

    /**
     * @typedef GasEstimationBadRequest
     * @property {string} code.required - Error Code:
     *  - INVALID_TO: Invalid to address
     *  - INVALID_FROM: Invalid from address
     *  - INVALID_DATA: Invalid transaction data
     *  - INVALID_VALUE Invalid transaction value
     */

    /**
     * @typedef GasEstimationResponse
     * @property {boolean} success.required - True if the estimation was successful
     * @property {string} gas - Estimated mount of gas (hexadecimal with 0x prefix)
     * @property {string} error - Error message if the estimation failed
     */

    /**
     * Estimates the transaction gas in order to set the gas limit
     * Binding: EstimateGas
     * @route POST /tx/gas/estimation
     * @group transaction - Transaction sending API
     * @param {GasEstimationRequest.model} request.body - Request body
     * @returns {GasEstimationResponse.model} 200 - OK
     * @returns {GasEstimationBadRequest.model} 400 - Bad request
     * @security BearerAuthorization
     */
    public async estimateTransactionGas(request: Express.Request, response: Express.Response) {
        // Parameters

        let to: string | null = null;

        if (request.body.to) {
            to = ((request.body.to || "") + "") || null;

            if (to) {
                to = normalizeAddress(to);
            }

            if (to && !validateAddress(to)) {
                sendApiError(
                    request,
                    response,
                    BAD_REQUEST,
                    "INVALID_TO",
                );
                return;
            }
        }

        const from = normalizeAddress(request.body.from + "");

        if (!validateAddress(from)) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_FROM",
            );
            return;
        }

        let data: Buffer;

        try {
            data = Buffer.from(hexNoPrefix((request.body.data || "") + ""), "hex");
        } catch (_ex) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_DATA",
            );
            return;
        }

        let value: bigint;

        try {
            value = BigInt((request.body.value || "0") + "");
        } catch (_ex) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_VALUE",
            );
            return;
        }

        // Gas estimation

        try {
            const gas = await Web3RPCClient.getInstance().estimateGas({
                to: to,
                from: from,
                data: data,
                value: value,
            }, "pending", {
                provider: BlockchainConfig.getInstance().provider,
            });


            sendApiResult(request, response, {
                success: true,
                gas: "0x" + gas.toString(16),
            });
        } catch (ex) {
            Monitor.debugException(ex);

            sendApiResult(request, response, {
                success: false,
                error: ex.message,
            });
        }
    }

    /**
     * @typedef SendSignedTransactionRequest
     * @property {string} account.required - Account sending the transaction
     * @property {string} tx.required - Signed transaction (hex)
     * @property {string} nonce.required - The transaction nonce
     */

    /**
     * @typedef SendSignedTransactionBadRequest
     * @property {string} code.required - Error Code:
     *  - INVALID_ACCOUNT - Invalid account address
     *  - INVALID_NONCE - Invalid nonce
     *  - INVALID_TX - Invalid transaction
     */

    /**
     * @typedef SendSignedTransactionResponse
     * @property {boolean} success.required - True if success
     * @property {string} error - Error message
     * @property {string} txHash - Transaction hash
     * @property {number} status - EVM Execution status (1 = OK, 0 = ERROR)
     * @property {string} contract - Deployed contract address
     */

    /**
     * Sends a signed transaction to the blockchain
     * Binding: SendSignedTransaction
     * @route POST /tx/signed
     * @group transaction - Transaction sending API
     * @param {SendSignedTransactionRequest.model} request.body - Request body
     * @returns {SendSignedTransactionResponse.model} 200 - OK
     * @returns {SendSignedTransactionBadRequest.model} 400 - Bad request
     * @security BearerAuthorization
     */
    public async sendSignedTransaction(request: Express.Request, response: Express.Response) {
        // Parameters

        const account = normalizeAddress(request.body.account + "");

        if (!validateAddress(account)) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_ACCOUNT",
            );
            return;
        }

        let nonce: bigint;

        try {
            nonce = BigInt(request.body.nonce);
        } catch (ex) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_NONCE",
            );
            return;
        }

        let serializedTx: Buffer;

        try {
            serializedTx = Buffer.from(hexNoPrefix(request.body.tx + ""), "hex");
        } catch (ex) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_TX",
            );
            return;
        }

        let txHash: string;

        try {
            const txHashBytes = await Web3RPCClient.getInstance().sendRawTransaction(serializedTx, {
                provider: BlockchainConfig.getInstance().provider,
            });

            txHash = txHashBytes.toString("hex");
        } catch (ex) {
            sendApiResult(request, response, {
                success: false,
                error: ex.message,
            });
            return;
        }

        // Wait for the receipt

        const startTime = Date.now();
        let receipt: TransactionReceipt;
        let nonceChanged = false;

        while (!receipt) {
            receipt = await Web3RPCClient.getInstance().getTransactionReceipt(txHash, {
                provider: BlockchainConfig.getInstance().provider,
            });

            if (receipt) {
                sendApiResult(request, response, {
                    success: true,
                    txHash: txHash,
                    status: Number(receipt.status),
                    contract: receipt.contractAddress,
                });
                return;
            }

            if (nonceChanged) {
                sendApiResult(request, response, {
                    success: false,
                    error: "Nonce collision",
                });
                return;
            }

            // Wait 1 second and try fetching the receipt again
            await (new Promise(function (resolve2) {
                setTimeout(resolve2, 1000);
            }));

            // Check timeout
            if ((Date.now() - startTime > 30000)) {
                sendApiResult(request, response, {
                    success: false,
                    error: "Timed out",
                });
                return;
            }

            // Check nonce
            const nonceFromRPC = await Web3RPCClient.getInstance().getTransactionCount(account, "latest", {
                provider: BlockchainConfig.getInstance().provider,
            });

            if (nonceFromRPC > nonce) {
                nonceChanged = true;
            }
        }

        sendApiResult(request, response, {
            success: true,
            txHash: txHash,
        });
    }

    /**
     * @typedef SendArbitraryTransactionBody
     * @property {string} to.required - Destination address - eg: 0x0000000000000000000000000000000000000000
     * @property {string} value.required - The transaction value (wei) - eg: 0
     * @property {string} data.required - The transaction data (hexadecimal) - eg: 0x
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * @typedef SendArbitraryTransactionBadRequest
     * @property {string} code.required - Error Code:
     *  - INVALID_TO: Invalid to address provided
     *  - INVALID_VALUE: Invalid transaction value provided
     *  - INVALID_DATA: Invalid transaction data provided
     */

    /**
     * Signs and sends a transaction to the blockchain
     * Binding: SendTransaction
     * @route POST /tx
     * @group transaction - Transaction sending API
     * @param {SendArbitraryTransactionBody.model} request.body - Request body
     * @returns {TxResponse.model} 200 - OK
     * @returns {SendArbitraryTransactionBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async sendTransaction(request: Express.Request, response: Express.Response) {
        // Parameters

        const to = normalizeAddress(request.body.to + "");

        if (!validateAddress(to)) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_TO",
            );
            return;
        }

        const valueStr = request.body.value + "";

        if (!isBigInteger(valueStr)) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_VALUE",
            );
            return;
        }

        const value = parseBigInteger(valueStr);

        const dataStr = request.body.data + "";
        let data: Buffer;

        try {
            data = Buffer.from(hexNoPrefix(dataStr));
        } catch (ex) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_DATA",
                ex.message,
            );
            return;
        }

        // Send transaction

        await handleTransactionSending(request, response, {
            to,
            value,
            data,
        });
    }

    /**
     * @typedef AbiEntryType
     * @property {string} name - Name - eg: value
     * @property {string} type - Type - eg: uint256
     * @property {string} internalType - Internal type - eg: uint256
     * @property {boolean} indexed - If the event parameter is indexed.
     * @property {Array.<AbiEntryType>} components - Components for tuple types
     */

    /**
     * @typedef AbiEntry
     * @property {string} name - Entry name - eg: Transfer
     * @property {string} type - Entry type - eg: event
     * @property {boolean} anonymous - If the event is anonymous.
     * @property {boolean} payable - If the function is payable.
     * @property {boolean} constant - If the function is constant.
     * @property {string} stateMutability -  The mutability state of the function. - eg: vies
     * @property {string} gas - The gas limit to use when sending a transaction for this function. - eg: 0x100
     */

    /**
     * @typedef DeploySmartContractBody
     * @property {Array.<AbiEntry>} abi.required - Smart contract ABI - eg: []
     * @property {string} bytecode.required - Smart contract bytecode (hexadecimal) - eg: 
     * @property {Array.<string>} constructorParameters.required - Constructor parameters - eg: []
     * @property {string} value.required - The transaction value (wei) - eg: 0
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * @typedef DeploySmartContractBadRequest
     * @property {string} code.required - Error Code:
     *  - INVALID_VALUE: Invalid transaction value provided
     *  - INVALID_ABI: Invalid ABI provided
     *  - INVALID_BYTECODE: Invalid bytecode
     */

    /**
     * Deploys a new smart contract
     * Binding: DeploySmartContract
     * @route POST /tx/contract/deployment
     * @group transaction - Transaction sending API
     * @param {DeploySmartContractBody.model} request.body - Request body
     * @returns {TxResponse.model} 200 - OK
     * @returns {DeploySmartContractBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async deploySmartContract(request: Express.Request, response: Express.Response) {
        // Parameters

        const valueStr = request.body.value + "";

        if (!isBigInteger(valueStr)) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_VALUE",
            );
            return;
        }

        const value = parseBigInteger(valueStr);

        const bytecodeStr = request.body.bytecode + "";
        let bytecode: Buffer;

        try {
            bytecode = Buffer.from(hexNoPrefix(bytecodeStr));
        } catch (ex) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_BYTECODE",
                ex.message,
            );
            return;
        }

        const abi = sanitizeAbi(request.body.abi);

        const constructorParameters = sanitizeAbiInputParameters(request.body.constructorParameters);

        let txDetails: TransactionBuildDetails;

        try {
            txDetails = getTxBuildDetailsForDeploy(bytecode, abi, constructorParameters, value);;
        } catch (ex) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_ABI",
                ex.message,
            );
            return;
        }

        // Send transaction

        await handleTransactionSending(request, response, txDetails);
    }


    /**
     * @typedef SendSmartContractTransactionBody
     * @property {string} contractAddress.required - Smart contract address
     * @property {Array.<AbiEntry>} abi.required - Smart contract ABI - eg: []
     * @property {string} method.required - Name of the contract method to invoke
     * @property {Array.<string>} parameters.required - Function parameters / inputs - eg: []
     * @property {string} value.required - The transaction value (wei) - eg: 0
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * @typedef SendSmartContractTransactionBadRequest
     * @property {string} code.required - Error Code:
     *  - INVALID_CONTRACT_ADDRESS: Invalid smart contract address
     *  - INVALID_VALUE: Invalid transaction value provided
     *  - INVALID_ABI_OR_PARAMETERS: Invalid ABI or parameters provided
     */

    /**
     * Sends smart contract transaction
     * Binding: SendSmartContractTransaction
     * @route POST /tx/contract
     * @group transaction - Transaction sending API
     * @param {SendSmartContractTransactionBody.model} request.body - Request body
     * @returns {TxResponse.model} 200 - OK
     * @returns {SendSmartContractTransactionBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async sendSmartContractTransaction(request: Express.Request, response: Express.Response) {
        // Parameters

        const contractAddress = normalizeAddress(request.body.contractAddress + "");

        if (!validateAddress(contractAddress)) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_CONTRACT_ADDRESS",
            );
            return;
        }

        const valueStr = request.body.value + "";

        if (!isBigInteger(valueStr)) {
            sendApiError(
                request,
                response,
                BAD_REQUEST,
                "INVALID_VALUE",
            );
            return;
        }

        const value = parseBigInteger(valueStr);

        const abi = sanitizeAbi(request.body.abi);

        const method = request.body.method + "";

        const parameters = sanitizeAbiInputParameters(request.body.parameters);

        let txData: string;

        try {
            const i = new Interface(abi);
            txData = i.encodeFunctionData(method, parameters)
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

        // Send transaction

        await handleTransactionSending(request, response, {
            to: contractAddress,
            data: txData,
            value,
        });
    }
}
