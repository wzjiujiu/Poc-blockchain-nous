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

// API bindings: blockchain (Auto generated)

"use strict";

import { RequestErrorHandler, RequestParams, CommonAuthenticatedErrorHandler } from "@asanrom/request-axios";
import { getApiUrl } from "./utils";
import { BlockInformation, AccountInformation, TransactionInformation, CallSmartContractResponse, CallSmartContractBody } from "./definitions";

export class ApiBlockchain {
    /**
     * Method: GET
     * Path: /blockchain/blocks/{block}
     * Gets block information
     * @param block Block number or hash - eg: latest
     * @returns The request parameters
     */
    public static GetBlock(block: string): RequestParams<BlockInformation, GetBlockErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/blockchain/blocks/${encodeURIComponent(block)}`),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(404, "BLOCK_NOT_FOUND", handler.notFoundBlockNotFound)
                    .add(404, "*", handler.notFound)
                    .add(400, "INVALID_BLOCK", handler.badRequestInvalidBlock)
                    .add(400, "INVALID_BLOCK_HASH", handler.badRequestInvalidBlockHash)
                    .add(400, "*", handler.badRequest)
                    .add(401, "*", handler.unauthorized)
                    .add(500, "*", "serverError" in handler ? handler.serverError : handler.temporalError)
                    .add("*", "*", "networkError" in handler ? handler.networkError : handler.temporalError)
                    .handle(err);
            },
        };
    }

    /**
     * Method: GET
     * Path: /blockchain/account/{address}
     * Gets account information
     * @param address Account address
     * @returns The request parameters
     */
    public static GetAccount(address: string): RequestParams<AccountInformation, GetAccountErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/blockchain/account/${encodeURIComponent(address)}`),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(400, "INVALID_WALLET_ADDRESS", handler.badRequestInvalidWalletAddress)
                    .add(400, "*", handler.badRequest)
                    .add(401, "*", handler.unauthorized)
                    .add(500, "*", "serverError" in handler ? handler.serverError : handler.temporalError)
                    .add("*", "*", "networkError" in handler ? handler.networkError : handler.temporalError)
                    .handle(err);
            },
        };
    }

    /**
     * Method: GET
     * Path: /blockchain/transactions/{tx}
     * Gets transaction information
     * @param tx Transaction hash
     * @returns The request parameters
     */
    public static GetTransaction(tx: string): RequestParams<TransactionInformation, GetTransactionErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/blockchain/transactions/${encodeURIComponent(tx)}`),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(404, "TRANSACTION_NOT_FOUND", handler.notFoundTransactionNotFound)
                    .add(404, "*", handler.notFound)
                    .add(400, "INVALID_TRANSACTION", handler.badRequestInvalidTransaction)
                    .add(400, "*", handler.badRequest)
                    .add(401, "*", handler.unauthorized)
                    .add(500, "*", "serverError" in handler ? handler.serverError : handler.temporalError)
                    .add("*", "*", "networkError" in handler ? handler.networkError : handler.temporalError)
                    .handle(err);
            },
        };
    }

    /**
     * Method: POST
     * Path: /blockchain/contracts/{address}/call
     * Calls a View / Pure method of a smart contract
     * In order to obtain information from the blockchain
     * related to the status of the smart contract
     * @param address Smart contract address
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallContract(address: string, body: CallSmartContractBody): RequestParams<CallSmartContractResponse, CallContractErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/blockchain/contracts/${encodeURIComponent(address)}/call`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(400, "INVALID_ABI_RESULT", handler.badRequestInvalidAbiResult)
                    .add(400, "INVALID_ABI_OR_PARAMETERS", handler.badRequestInvalidAbiOrParameters)
                    .add(400, "INVALID_CONTRACT_ADDRESS", handler.badRequestInvalidContractAddress)
                    .add(400, "*", handler.badRequest)
                    .add(401, "*", handler.unauthorized)
                    .add(500, "*", "serverError" in handler ? handler.serverError : handler.temporalError)
                    .add("*", "*", "networkError" in handler ? handler.networkError : handler.temporalError)
                    .handle(err);
            },
        };
    }
}

/**
 * Error handler for GetBlock
 */
export type GetBlockErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Handler for status = 400 and code = INVALID_BLOCK_HASH
     */
    badRequestInvalidBlockHash: () => void;

    /**
     * Handler for status = 400 and code = INVALID_BLOCK
     */
    badRequestInvalidBlock: () => void;

    /**
     * General handler for status = 404
     */
    notFound: () => void;

    /**
     * Handler for status = 404 and code = BLOCK_NOT_FOUND
     */
    notFoundBlockNotFound: () => void;
};

/**
 * Error handler for GetAccount
 */
export type GetAccountErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Handler for status = 400 and code = INVALID_WALLET_ADDRESS
     */
    badRequestInvalidWalletAddress: () => void;
};

/**
 * Error handler for GetTransaction
 */
export type GetTransactionErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Handler for status = 400 and code = INVALID_TRANSACTION
     */
    badRequestInvalidTransaction: () => void;

    /**
     * General handler for status = 404
     */
    notFound: () => void;

    /**
     * Handler for status = 404 and code = TRANSACTION_NOT_FOUND
     */
    notFoundTransactionNotFound: () => void;
};

/**
 * Error handler for CallContract
 */
export type CallContractErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid smart contract address
     */
    badRequestInvalidContractAddress: () => void;

    /**
     * Invalid ABI or parameters provided
     */
    badRequestInvalidAbiOrParameters: () => void;

    /**
     * INvalid ABI. Cannot parse the call result using it.
     */
    badRequestInvalidAbiResult: () => void;
};

