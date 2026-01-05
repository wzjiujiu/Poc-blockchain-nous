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

// API bindings: transaction (Auto generated)

"use strict";

import { RequestErrorHandler, RequestParams, CommonAuthenticatedErrorHandler } from "@asanrom/request-axios";
import { getApiUrl } from "./utils";
import { AccountTransactionState, GasEstimationResponse, GasEstimationRequest, SendSignedTransactionResponse, SendSignedTransactionRequest, TxResponse, SendArbitraryTransactionBody, DeploySmartContractBody, SendSmartContractTransactionBody } from "./definitions";

export class ApiTransaction {
    /**
     * Method: GET
     * Path: /tx/account/{address}
     * Gets the account status required to send a transaction
     * @param address Address
     * @returns The request parameters
     */
    public static GetAccountTransactionState(address: string): RequestParams<AccountTransactionState, GetAccountTransactionStateErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/tx/account/${encodeURIComponent(address)}`),
            handleError: (err, handler) => {
                new RequestErrorHandler()
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
     * Path: /tx/gas/estimation
     * Estimates the transaction gas in order to set the gas limit
     * @param body Body parameters
     * @returns The request parameters
     */
    public static EstimateGas(body: GasEstimationRequest): RequestParams<GasEstimationResponse, EstimateGasErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/tx/gas/estimation`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(400, "INVALID_VALUE Invalid transaction value", handler.badRequestInvalidValue invalid transaction value)
                    .add(400, "INVALID_DATA", handler.badRequestInvalidData)
                    .add(400, "INVALID_FROM", handler.badRequestInvalidFrom)
                    .add(400, "INVALID_TO", handler.badRequestInvalidTo)
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
     * Path: /tx/signed
     * Sends a signed transaction to the blockchain
     * @param body Body parameters
     * @returns The request parameters
     */
    public static SendSignedTransaction(body: SendSignedTransactionRequest): RequestParams<SendSignedTransactionResponse, SendSignedTransactionErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/tx/signed`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(400, "INVALID_TX - Invalid transaction", handler.badRequestInvalidTx  invalid transaction)
                    .add(400, "INVALID_NONCE - Invalid nonce", handler.badRequestInvalidNonce  invalid nonce)
                    .add(400, "INVALID_ACCOUNT - Invalid account address", handler.badRequestInvalidAccount  invalid account address)
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
     * Path: /tx
     * Signs and sends a transaction to the blockchain
     * @param body Body parameters
     * @returns The request parameters
     */
    public static SendTransaction(body: SendArbitraryTransactionBody): RequestParams<TxResponse, SendTransactionErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/tx`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(403, "INVALID_PRIVATE_KEY", handler.forbiddenInvalidPrivateKey)
                    .add(403, "INVALID_WALLET_PASSWORD", handler.forbiddenInvalidWalletPassword)
                    .add(403, "WALLET_NOT_FOUND", handler.forbiddenWalletNotFound)
                    .add(403, "ACCESS_DENIED", handler.forbiddenAccessDenied)
                    .add(403, "*", handler.forbidden)
                    .add(400, "INVALID_DATA", handler.badRequestInvalidData)
                    .add(400, "INVALID_VALUE", handler.badRequestInvalidValue)
                    .add(400, "INVALID_TO", handler.badRequestInvalidTo)
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
     * Path: /tx/contract/deployment
     * Deploys a new smart contract
     * @param body Body parameters
     * @returns The request parameters
     */
    public static DeploySmartContract(body: DeploySmartContractBody): RequestParams<TxResponse, DeploySmartContractErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/tx/contract/deployment`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(403, "INVALID_PRIVATE_KEY", handler.forbiddenInvalidPrivateKey)
                    .add(403, "INVALID_WALLET_PASSWORD", handler.forbiddenInvalidWalletPassword)
                    .add(403, "WALLET_NOT_FOUND", handler.forbiddenWalletNotFound)
                    .add(403, "ACCESS_DENIED", handler.forbiddenAccessDenied)
                    .add(403, "*", handler.forbidden)
                    .add(400, "INVALID_BYTECODE", handler.badRequestInvalidBytecode)
                    .add(400, "INVALID_ABI", handler.badRequestInvalidAbi)
                    .add(400, "INVALID_VALUE", handler.badRequestInvalidValue)
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
     * Path: /tx/contract
     * Sends smart contract transaction
     * @param body Body parameters
     * @returns The request parameters
     */
    public static SendSmartContractTransaction(body: SendSmartContractTransactionBody): RequestParams<TxResponse, SendSmartContractTransactionErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/tx/contract`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(403, "INVALID_PRIVATE_KEY", handler.forbiddenInvalidPrivateKey)
                    .add(403, "INVALID_WALLET_PASSWORD", handler.forbiddenInvalidWalletPassword)
                    .add(403, "WALLET_NOT_FOUND", handler.forbiddenWalletNotFound)
                    .add(403, "ACCESS_DENIED", handler.forbiddenAccessDenied)
                    .add(403, "*", handler.forbidden)
                    .add(400, "INVALID_ABI_OR_PARAMETERS", handler.badRequestInvalidAbiOrParameters)
                    .add(400, "INVALID_VALUE", handler.badRequestInvalidValue)
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
 * Error handler for GetAccountTransactionState
 */
export type GetAccountTransactionStateErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;
};

/**
 * Error handler for EstimateGas
 */
export type EstimateGasErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid to address
     */
    badRequestInvalidTo: () => void;

    /**
     * Invalid from address
     */
    badRequestInvalidFrom: () => void;

    /**
     * Invalid transaction data
     */
    badRequestInvalidData: () => void;

};

/**
 * Error handler for SendSignedTransaction
 */
export type SendSignedTransactionErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;



};

/**
 * Error handler for SendTransaction
 */
export type SendTransactionErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid to address provided
     */
    badRequestInvalidTo: () => void;

    /**
     * Invalid transaction value provided
     */
    badRequestInvalidValue: () => void;

    /**
     * Invalid transaction data provided
     */
    badRequestInvalidData: () => void;

    /**
     * General handler for status = 403
     */
    forbidden: () => void;

    /**
     * Access denied to the API
     */
    forbiddenAccessDenied: () => void;

    /**
     * Wallet not found
     */
    forbiddenWalletNotFound: () => void;

    /**
     * Invalid wallet password
     */
    forbiddenInvalidWalletPassword: () => void;

    /**
     * Invalid private key provided
     */
    forbiddenInvalidPrivateKey: () => void;
};

/**
 * Error handler for DeploySmartContract
 */
export type DeploySmartContractErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid transaction value provided
     */
    badRequestInvalidValue: () => void;

    /**
     * Invalid ABI provided
     */
    badRequestInvalidAbi: () => void;

    /**
     * Invalid bytecode
     */
    badRequestInvalidBytecode: () => void;

    /**
     * General handler for status = 403
     */
    forbidden: () => void;

    /**
     * Access denied to the API
     */
    forbiddenAccessDenied: () => void;

    /**
     * Wallet not found
     */
    forbiddenWalletNotFound: () => void;

    /**
     * Invalid wallet password
     */
    forbiddenInvalidWalletPassword: () => void;

    /**
     * Invalid private key provided
     */
    forbiddenInvalidPrivateKey: () => void;
};

/**
 * Error handler for SendSmartContractTransaction
 */
export type SendSmartContractTransactionErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid smart contract address
     */
    badRequestInvalidContractAddress: () => void;

    /**
     * Invalid transaction value provided
     */
    badRequestInvalidValue: () => void;

    /**
     * Invalid ABI or parameters provided
     */
    badRequestInvalidAbiOrParameters: () => void;

    /**
     * General handler for status = 403
     */
    forbidden: () => void;

    /**
     * Access denied to the API
     */
    forbiddenAccessDenied: () => void;

    /**
     * Wallet not found
     */
    forbiddenWalletNotFound: () => void;

    /**
     * Invalid wallet password
     */
    forbiddenInvalidWalletPassword: () => void;

    /**
     * Invalid private key provided
     */
    forbiddenInvalidPrivateKey: () => void;
};

