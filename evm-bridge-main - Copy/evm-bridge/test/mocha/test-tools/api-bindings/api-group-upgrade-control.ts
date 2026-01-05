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

// API bindings: upgrade_control (Auto generated)

"use strict";

import { RequestErrorHandler, RequestParams, CommonAuthenticatedErrorHandler } from "@asanrom/request-axios";
import { getApiUrl, generateURIQuery } from "./utils";
import { SmartContractInformation, TxResponse, TxRequestUpgradeControlInitialize, TxRequestUpgradeControlPause, TxRequestUpgradeControlUnpause, TxRequestUpgradeControlUpgradeContract, TxRequestUpgradeControlUpgradeContractAndCall, TxRequestUpgradeControlUpgradeToAndCall, EventListUpgradeControlContractUpgraded, EventListUpgradeControlInitialized, EventListUpgradeControlPaused, EventListUpgradeControlUnpaused, EventListUpgradeControlUpgraded, CallResponseUpgradeControlUPGRADE_INTERFACE_VERSION, CallResponseUpgradeControlGetInitializedVersion, CallResponseUpgradeControlPaused, CallResponseUpgradeControlProxiableUUID } from "./definitions";

export class ApiUpgradeControl {
    /**
     * Method: GET
     * Path: /contracts/upgrade-control
     * Gets the information for the smart contract: UpgradeControl
     * @returns The request parameters
     */
    public static GetSmartContractInformation(): RequestParams<SmartContractInformation, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/upgrade-control`),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(401, "*", handler.unauthorized)
                    .add(500, "*", "serverError" in handler ? handler.serverError : handler.temporalError)
                    .add("*", "*", "networkError" in handler ? handler.networkError : handler.temporalError)
                    .handle(err);
            },
        };
    }

    /**
     * Method: POST
     * Path: /contracts/upgrade-control/tx/initialize
     * Sends transaction for method: initialize
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: initialize(address)
     * Initializes the smart contract
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxInitialize(body: TxRequestUpgradeControlInitialize): RequestParams<TxResponse, TxInitializeErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/upgrade-control/tx/initialize`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(403, "INVALID_PRIVATE_KEY", handler.forbiddenInvalidPrivateKey)
                    .add(403, "INVALID_WALLET_PASSWORD", handler.forbiddenInvalidWalletPassword)
                    .add(403, "WALLET_NOT_FOUND", handler.forbiddenWalletNotFound)
                    .add(403, "ACCESS_DENIED", handler.forbiddenAccessDenied)
                    .add(403, "*", handler.forbidden)
                    .add(400, "INVALID_VALUE", handler.badRequestInvalidValue)
                    .add(400, "INVALID_PARAMETERS", handler.badRequestInvalidParameters)
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
     * Path: /contracts/upgrade-control/tx/pause
     * Sends transaction for method: pause
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: pause()
     * Pauses the smart contract Requires ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxPause(body: TxRequestUpgradeControlPause): RequestParams<TxResponse, TxPauseErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/upgrade-control/tx/pause`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(403, "INVALID_PRIVATE_KEY", handler.forbiddenInvalidPrivateKey)
                    .add(403, "INVALID_WALLET_PASSWORD", handler.forbiddenInvalidWalletPassword)
                    .add(403, "WALLET_NOT_FOUND", handler.forbiddenWalletNotFound)
                    .add(403, "ACCESS_DENIED", handler.forbiddenAccessDenied)
                    .add(403, "*", handler.forbidden)
                    .add(400, "INVALID_VALUE", handler.badRequestInvalidValue)
                    .add(400, "INVALID_PARAMETERS", handler.badRequestInvalidParameters)
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
     * Path: /contracts/upgrade-control/tx/unpause
     * Sends transaction for method: unpause
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: unpause()
     * Unpauses the smart contract Requires ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxUnpause(body: TxRequestUpgradeControlUnpause): RequestParams<TxResponse, TxUnpauseErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/upgrade-control/tx/unpause`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(403, "INVALID_PRIVATE_KEY", handler.forbiddenInvalidPrivateKey)
                    .add(403, "INVALID_WALLET_PASSWORD", handler.forbiddenInvalidWalletPassword)
                    .add(403, "WALLET_NOT_FOUND", handler.forbiddenWalletNotFound)
                    .add(403, "ACCESS_DENIED", handler.forbiddenAccessDenied)
                    .add(403, "*", handler.forbidden)
                    .add(400, "INVALID_VALUE", handler.badRequestInvalidValue)
                    .add(400, "INVALID_PARAMETERS", handler.badRequestInvalidParameters)
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
     * Path: /contracts/upgrade-control/tx/upgrade-contract
     * Sends transaction for method: upgradeContract
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: upgradeContract(address,address)
     * Upgrades a smart contract Requires ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxUpgradeContract(body: TxRequestUpgradeControlUpgradeContract): RequestParams<TxResponse, TxUpgradeContractErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/upgrade-control/tx/upgrade-contract`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(403, "INVALID_PRIVATE_KEY", handler.forbiddenInvalidPrivateKey)
                    .add(403, "INVALID_WALLET_PASSWORD", handler.forbiddenInvalidWalletPassword)
                    .add(403, "WALLET_NOT_FOUND", handler.forbiddenWalletNotFound)
                    .add(403, "ACCESS_DENIED", handler.forbiddenAccessDenied)
                    .add(403, "*", handler.forbidden)
                    .add(400, "INVALID_VALUE", handler.badRequestInvalidValue)
                    .add(400, "INVALID_PARAMETERS", handler.badRequestInvalidParameters)
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
     * Path: /contracts/upgrade-control/tx/upgrade-contract-and-call
     * Sends transaction for method: upgradeContractAndCall
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: upgradeContractAndCall(address,address,bytes)
     * Upgrades a smart contract and calls a re-initializer Requires ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxUpgradeContractAndCall(body: TxRequestUpgradeControlUpgradeContractAndCall): RequestParams<TxResponse, TxUpgradeContractAndCallErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/upgrade-control/tx/upgrade-contract-and-call`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(403, "INVALID_PRIVATE_KEY", handler.forbiddenInvalidPrivateKey)
                    .add(403, "INVALID_WALLET_PASSWORD", handler.forbiddenInvalidWalletPassword)
                    .add(403, "WALLET_NOT_FOUND", handler.forbiddenWalletNotFound)
                    .add(403, "ACCESS_DENIED", handler.forbiddenAccessDenied)
                    .add(403, "*", handler.forbidden)
                    .add(400, "INVALID_VALUE", handler.badRequestInvalidValue)
                    .add(400, "INVALID_PARAMETERS", handler.badRequestInvalidParameters)
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
     * Path: /contracts/upgrade-control/tx/upgrade-to-and-call
     * Sends transaction for method: upgradeToAndCall
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: upgradeToAndCall(address,bytes)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxUpgradeToAndCall(body: TxRequestUpgradeControlUpgradeToAndCall): RequestParams<TxResponse, TxUpgradeToAndCallErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/upgrade-control/tx/upgrade-to-and-call`),
            json: body,
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(403, "INVALID_PRIVATE_KEY", handler.forbiddenInvalidPrivateKey)
                    .add(403, "INVALID_WALLET_PASSWORD", handler.forbiddenInvalidWalletPassword)
                    .add(403, "WALLET_NOT_FOUND", handler.forbiddenWalletNotFound)
                    .add(403, "ACCESS_DENIED", handler.forbiddenAccessDenied)
                    .add(403, "*", handler.forbidden)
                    .add(400, "INVALID_VALUE", handler.badRequestInvalidValue)
                    .add(400, "INVALID_PARAMETERS", handler.badRequestInvalidParameters)
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
     * Path: /contracts/upgrade-control/events/contract-upgraded
     * Get a list of events of type ContractUpgraded
     * Smart contract: UpgradeControl (UpgradeControl)
     * Event signature: ContractUpgraded(address,address,address)
     * ContractUpgraded - A smart contract was upgraded
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsContractUpgraded(queryParams: GetEventsContractUpgradedQueryParameters): RequestParams<EventListUpgradeControlContractUpgraded, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/upgrade-control/events/contract-upgraded` + generateURIQuery(queryParams)),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(401, "*", handler.unauthorized)
                    .add(500, "*", "serverError" in handler ? handler.serverError : handler.temporalError)
                    .add("*", "*", "networkError" in handler ? handler.networkError : handler.temporalError)
                    .handle(err);
            },
        };
    }

    /**
     * Method: GET
     * Path: /contracts/upgrade-control/events/initialized
     * Get a list of events of type Initialized
     * Smart contract: UpgradeControl (UpgradeControl)
     * Event signature: Initialized(uint64)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsInitialized(queryParams: GetEventsInitializedQueryParameters): RequestParams<EventListUpgradeControlInitialized, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/upgrade-control/events/initialized` + generateURIQuery(queryParams)),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(401, "*", handler.unauthorized)
                    .add(500, "*", "serverError" in handler ? handler.serverError : handler.temporalError)
                    .add("*", "*", "networkError" in handler ? handler.networkError : handler.temporalError)
                    .handle(err);
            },
        };
    }

    /**
     * Method: GET
     * Path: /contracts/upgrade-control/events/paused
     * Get a list of events of type Paused
     * Smart contract: UpgradeControl (UpgradeControl)
     * Event signature: Paused(address)
     * Paused - The smart contract was paused
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsPaused(queryParams: GetEventsPausedQueryParameters): RequestParams<EventListUpgradeControlPaused, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/upgrade-control/events/paused` + generateURIQuery(queryParams)),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(401, "*", handler.unauthorized)
                    .add(500, "*", "serverError" in handler ? handler.serverError : handler.temporalError)
                    .add("*", "*", "networkError" in handler ? handler.networkError : handler.temporalError)
                    .handle(err);
            },
        };
    }

    /**
     * Method: GET
     * Path: /contracts/upgrade-control/events/unpaused
     * Get a list of events of type Unpaused
     * Smart contract: UpgradeControl (UpgradeControl)
     * Event signature: Unpaused(address)
     * Paused - The smart contract was paused
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsUnpaused(queryParams: GetEventsUnpausedQueryParameters): RequestParams<EventListUpgradeControlUnpaused, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/upgrade-control/events/unpaused` + generateURIQuery(queryParams)),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(401, "*", handler.unauthorized)
                    .add(500, "*", "serverError" in handler ? handler.serverError : handler.temporalError)
                    .add("*", "*", "networkError" in handler ? handler.networkError : handler.temporalError)
                    .handle(err);
            },
        };
    }

    /**
     * Method: GET
     * Path: /contracts/upgrade-control/events/upgraded
     * Get a list of events of type Upgraded
     * Smart contract: UpgradeControl (UpgradeControl)
     * Event signature: Upgraded(address)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsUpgraded(queryParams: GetEventsUpgradedQueryParameters): RequestParams<EventListUpgradeControlUpgraded, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/upgrade-control/events/upgraded` + generateURIQuery(queryParams)),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(401, "*", handler.unauthorized)
                    .add(500, "*", "serverError" in handler ? handler.serverError : handler.temporalError)
                    .add("*", "*", "networkError" in handler ? handler.networkError : handler.temporalError)
                    .handle(err);
            },
        };
    }

    /**
     * Method: POST
     * Path: /contracts/upgrade-control/call/upgrade-interface-version
     * Calls the view method: UPGRADE_INTERFACE_VERSION
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: UPGRADE_INTERFACE_VERSION()
     * @returns The request parameters
     */
    public static CallUPGRADEINTERFACEVERSION(): RequestParams<CallResponseUpgradeControlUPGRADE_INTERFACE_VERSION, CallUPGRADEINTERFACEVERSIONErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/upgrade-control/call/upgrade-interface-version`),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(404, "*", handler.notFound)
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
     * Path: /contracts/upgrade-control/call/get-initialized-version
     * Calls the view method: getInitializedVersion
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: getInitializedVersion()
     * Gets the current initialized version Use this method to figure out the last deployed version of the contract
     * @returns The request parameters
     */
    public static CallGetInitializedVersion(): RequestParams<CallResponseUpgradeControlGetInitializedVersion, CallGetInitializedVersionErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/upgrade-control/call/get-initialized-version`),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(404, "*", handler.notFound)
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
     * Path: /contracts/upgrade-control/call/paused
     * Calls the view method: paused
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: paused()
     * Checks if the smart contract is paused
     * @returns The request parameters
     */
    public static CallPaused(): RequestParams<CallResponseUpgradeControlPaused, CallPausedErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/upgrade-control/call/paused`),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(404, "*", handler.notFound)
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
     * Path: /contracts/upgrade-control/call/proxiable-uuid
     * Calls the view method: proxiableUUID
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: proxiableUUID()
     * @returns The request parameters
     */
    public static CallProxiableUUID(): RequestParams<CallResponseUpgradeControlProxiableUUID, CallProxiableUUIDErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/upgrade-control/call/proxiable-uuid`),
            handleError: (err, handler) => {
                new RequestErrorHandler()
                    .add(404, "*", handler.notFound)
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
 * Error handler for TxInitialize
 */
export type TxInitializeErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid smart contract function parameters
     */
    badRequestInvalidParameters: () => void;

    /**
     * Invalid transaction value
     */
    badRequestInvalidValue: () => void;

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
 * Error handler for TxPause
 */
export type TxPauseErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid smart contract function parameters
     */
    badRequestInvalidParameters: () => void;

    /**
     * Invalid transaction value
     */
    badRequestInvalidValue: () => void;

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
 * Error handler for TxUnpause
 */
export type TxUnpauseErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid smart contract function parameters
     */
    badRequestInvalidParameters: () => void;

    /**
     * Invalid transaction value
     */
    badRequestInvalidValue: () => void;

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
 * Error handler for TxUpgradeContract
 */
export type TxUpgradeContractErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid smart contract function parameters
     */
    badRequestInvalidParameters: () => void;

    /**
     * Invalid transaction value
     */
    badRequestInvalidValue: () => void;

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
 * Error handler for TxUpgradeContractAndCall
 */
export type TxUpgradeContractAndCallErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid smart contract function parameters
     */
    badRequestInvalidParameters: () => void;

    /**
     * Invalid transaction value
     */
    badRequestInvalidValue: () => void;

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
 * Error handler for TxUpgradeToAndCall
 */
export type TxUpgradeToAndCallErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * Invalid smart contract function parameters
     */
    badRequestInvalidParameters: () => void;

    /**
     * Invalid transaction value
     */
    badRequestInvalidValue: () => void;

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
 * Query parameters for GetEventsContractUpgraded
 */
export interface GetEventsContractUpgradedQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;
}

/**
 * Query parameters for GetEventsInitialized
 */
export interface GetEventsInitializedQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;
}

/**
 * Query parameters for GetEventsPaused
 */
export interface GetEventsPausedQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;
}

/**
 * Query parameters for GetEventsUnpaused
 */
export interface GetEventsUnpausedQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;
}

/**
 * Query parameters for GetEventsUpgraded
 */
export interface GetEventsUpgradedQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'implementation' equal than the one specified.
     */
    filter_eq_pImplementation?: string;
}

/**
 * Error handler for CallUPGRADEINTERFACEVERSION
 */
export type CallUPGRADEINTERFACEVERSIONErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * General handler for status = 404
     */
    notFound: () => void;
};

/**
 * Error handler for CallGetInitializedVersion
 */
export type CallGetInitializedVersionErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * General handler for status = 404
     */
    notFound: () => void;
};

/**
 * Error handler for CallPaused
 */
export type CallPausedErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * General handler for status = 404
     */
    notFound: () => void;
};

/**
 * Error handler for CallProxiableUUID
 */
export type CallProxiableUUIDErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * General handler for status = 404
     */
    notFound: () => void;
};

