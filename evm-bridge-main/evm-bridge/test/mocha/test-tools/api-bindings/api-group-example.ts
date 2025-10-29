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

// API bindings: example (Auto generated)

"use strict";

import { RequestErrorHandler, RequestParams, CommonAuthenticatedErrorHandler } from "@asanrom/request-axios";
import { getApiUrl, generateURIQuery } from "./utils";
import { SmartContractInformation, TxResponse, TxRequestExampleInitialize, TxRequestExamplePause, TxRequestExampleRegisterAsset, TxRequestExampleUnpause, TxRequestExampleUpgradeToAndCall, EventListExampleAssetRegistered, EventListExampleInitialized, EventListExamplePaused, EventListExampleUnpaused, EventListExampleUpgraded, CallResponseExampleUPGRADE_INTERFACE_VERSION, CallResponseExampleGetAsset, CallRequestExampleGetAsset, CallResponseExampleGetInitializedVersion, CallResponseExampleIsRegistered, CallRequestExampleIsRegistered, CallResponseExamplePaused, CallResponseExampleProxiableUUID } from "./definitions";

export class ApiExample {
    /**
     * Method: GET
     * Path: /contracts/example
     * Gets the information for the smart contract: Example
     * @returns The request parameters
     */
    public static GetSmartContractInformation(): RequestParams<SmartContractInformation, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example`),
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
     * Path: /contracts/example/tx/initialize
     * Sends transaction for method: initialize
     * Smart contract: Example (ExampleContract)
     * Method signature: initialize(address,address)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxInitialize(body: TxRequestExampleInitialize): RequestParams<TxResponse, TxInitializeErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/initialize`),
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
     * Path: /contracts/example/tx/pause
     * Sends transaction for method: pause
     * Smart contract: Example (ExampleContract)
     * Method signature: pause()
     * Pauses the smart contract Requires ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxPause(body: TxRequestExamplePause): RequestParams<TxResponse, TxPauseErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/pause`),
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
     * Path: /contracts/example/tx/register-asset
     * Sends transaction for method: registerAsset
     * Smart contract: Example (ExampleContract)
     * Method signature: registerAsset(string)
     * Registra un nuovo asset sulla blockchain
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxRegisterAsset(body: TxRequestExampleRegisterAsset): RequestParams<TxResponse, TxRegisterAssetErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/register-asset`),
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
     * Path: /contracts/example/tx/unpause
     * Sends transaction for method: unpause
     * Smart contract: Example (ExampleContract)
     * Method signature: unpause()
     * Unpauses the smart contract Requires ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxUnpause(body: TxRequestExampleUnpause): RequestParams<TxResponse, TxUnpauseErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/unpause`),
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
     * Path: /contracts/example/tx/upgrade-to-and-call
     * Sends transaction for method: upgradeToAndCall
     * Smart contract: Example (ExampleContract)
     * Method signature: upgradeToAndCall(address,bytes)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxUpgradeToAndCall(body: TxRequestExampleUpgradeToAndCall): RequestParams<TxResponse, TxUpgradeToAndCallErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/upgrade-to-and-call`),
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
     * Path: /contracts/example/events/asset-registered
     * Get a list of events of type AssetRegistered
     * Smart contract: Example (ExampleContract)
     * Event signature: AssetRegistered(address,string,uint256)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsAssetRegistered(queryParams: GetEventsAssetRegisteredQueryParameters): RequestParams<EventListExampleAssetRegistered, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/asset-registered` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/initialized
     * Get a list of events of type Initialized
     * Smart contract: Example (ExampleContract)
     * Event signature: Initialized(uint64)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsInitialized(queryParams: GetEventsInitializedQueryParameters): RequestParams<EventListExampleInitialized, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/initialized` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/paused
     * Get a list of events of type Paused
     * Smart contract: Example (ExampleContract)
     * Event signature: Paused(address)
     * Paused - The smart contract was paused
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsPaused(queryParams: GetEventsPausedQueryParameters): RequestParams<EventListExamplePaused, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/paused` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/unpaused
     * Get a list of events of type Unpaused
     * Smart contract: Example (ExampleContract)
     * Event signature: Unpaused(address)
     * Paused - The smart contract was paused
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsUnpaused(queryParams: GetEventsUnpausedQueryParameters): RequestParams<EventListExampleUnpaused, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/unpaused` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/upgraded
     * Get a list of events of type Upgraded
     * Smart contract: Example (ExampleContract)
     * Event signature: Upgraded(address)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsUpgraded(queryParams: GetEventsUpgradedQueryParameters): RequestParams<EventListExampleUpgraded, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/upgraded` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/call/upgrade-interface-version
     * Calls the view method: UPGRADE_INTERFACE_VERSION
     * Smart contract: Example (ExampleContract)
     * Method signature: UPGRADE_INTERFACE_VERSION()
     * @returns The request parameters
     */
    public static CallUPGRADEINTERFACEVERSION(): RequestParams<CallResponseExampleUPGRADE_INTERFACE_VERSION, CallUPGRADEINTERFACEVERSIONErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/upgrade-interface-version`),
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
     * Path: /contracts/example/call/get-asset
     * Calls the view method: getAsset
     * Smart contract: Example (ExampleContract)
     * Method signature: getAsset(string)
     * Restituisce i dettagli di un asset
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallGetAsset(body: CallRequestExampleGetAsset): RequestParams<CallResponseExampleGetAsset, CallGetAssetErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/get-asset`),
            json: body,
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
     * Path: /contracts/example/call/get-initialized-version
     * Calls the view method: getInitializedVersion
     * Smart contract: Example (ExampleContract)
     * Method signature: getInitializedVersion()
     * Gets the current initialized version Use this method to figure out the last deployed version of the contract
     * @returns The request parameters
     */
    public static CallGetInitializedVersion(): RequestParams<CallResponseExampleGetInitializedVersion, CallGetInitializedVersionErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/get-initialized-version`),
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
     * Path: /contracts/example/call/is-registered
     * Calls the view method: isRegistered
     * Smart contract: Example (ExampleContract)
     * Method signature: isRegistered(string)
     * Verifica se un asset e' gia' registrato
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallIsRegistered(body: CallRequestExampleIsRegistered): RequestParams<CallResponseExampleIsRegistered, CallIsRegisteredErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/is-registered`),
            json: body,
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
     * Path: /contracts/example/call/paused
     * Calls the view method: paused
     * Smart contract: Example (ExampleContract)
     * Method signature: paused()
     * Checks if the smart contract is paused
     * @returns The request parameters
     */
    public static CallPaused(): RequestParams<CallResponseExamplePaused, CallPausedErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/paused`),
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
     * Path: /contracts/example/call/proxiable-uuid
     * Calls the view method: proxiableUUID
     * Smart contract: Example (ExampleContract)
     * Method signature: proxiableUUID()
     * @returns The request parameters
     */
    public static CallProxiableUUID(): RequestParams<CallResponseExampleProxiableUUID, CallProxiableUUIDErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/proxiable-uuid`),
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
 * Error handler for TxRegisterAsset
 */
export type TxRegisterAssetErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Query parameters for GetEventsAssetRegistered
 */
export interface GetEventsAssetRegisteredQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'owner' equal than the one specified.
     */
    filter_eq_pOwner?: string;
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
 * Error handler for CallGetAsset
 */
export type CallGetAssetErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallIsRegistered
 */
export type CallIsRegisteredErrorHandler = CommonAuthenticatedErrorHandler & {
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

