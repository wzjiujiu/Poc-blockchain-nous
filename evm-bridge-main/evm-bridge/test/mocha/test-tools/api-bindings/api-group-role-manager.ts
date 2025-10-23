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

// API bindings: role_manager (Auto generated)

"use strict";

import { RequestErrorHandler, RequestParams, CommonAuthenticatedErrorHandler } from "@asanrom/request-axios";
import { getApiUrl, generateURIQuery } from "./utils";
import { SmartContractInformation, TxResponse, TxRequestRoleManagerAssignRole, TxRequestRoleManagerInitialize, TxRequestRoleManagerPause, TxRequestRoleManagerRevokeRole, TxRequestRoleManagerUnpause, TxRequestRoleManagerUpgradeToAndCall, EventListRoleManagerInitialized, EventListRoleManagerPaused, EventListRoleManagerRoleAssigned, EventListRoleManagerRoleRevoked, EventListRoleManagerUnpaused, EventListRoleManagerUpgraded, CallResponseRoleManagerUPGRADE_INTERFACE_VERSION, CallResponseRoleManagerGetInitializedVersion, CallResponseRoleManagerHasRole, CallRequestRoleManagerHasRole, CallResponseRoleManagerHasRoleExplicit, CallRequestRoleManagerHasRoleExplicit, CallResponseRoleManagerIsAdmin, CallRequestRoleManagerIsAdmin, CallResponseRoleManagerPaused, CallResponseRoleManagerProxiableUUID } from "./definitions";

export class ApiRoleManager {
    /**
     * Method: GET
     * Path: /contracts/role-manager
     * Gets the information for the smart contract: RoleManager
     * @returns The request parameters
     */
    public static GetSmartContractInformation(): RequestParams<SmartContractInformation, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/role-manager`),
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
     * Path: /contracts/role-manager/tx/assign-role
     * Sends transaction for method: assignRole
     * Smart contract: RoleManager (RoleManager)
     * Method signature: assignRole(address,uint8)
     * Assigns a role to an account Can only be called by accounts with the ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxAssignRole(body: TxRequestRoleManagerAssignRole): RequestParams<TxResponse, TxAssignRoleErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/tx/assign-role`),
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
     * Path: /contracts/role-manager/tx/initialize
     * Sends transaction for method: initialize
     * Smart contract: RoleManager (RoleManager)
     * Method signature: initialize(address)
     * Initializes the smart contract
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxInitialize(body: TxRequestRoleManagerInitialize): RequestParams<TxResponse, TxInitializeErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/tx/initialize`),
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
     * Path: /contracts/role-manager/tx/pause
     * Sends transaction for method: pause
     * Smart contract: RoleManager (RoleManager)
     * Method signature: pause()
     * Pauses the smart contract Requires ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxPause(body: TxRequestRoleManagerPause): RequestParams<TxResponse, TxPauseErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/tx/pause`),
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
     * Path: /contracts/role-manager/tx/revoke-role
     * Sends transaction for method: revokeRole
     * Smart contract: RoleManager (RoleManager)
     * Method signature: revokeRole(address,uint8)
     * Revokes a role from an account Can only be called by accounts with the ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxRevokeRole(body: TxRequestRoleManagerRevokeRole): RequestParams<TxResponse, TxRevokeRoleErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/tx/revoke-role`),
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
     * Path: /contracts/role-manager/tx/unpause
     * Sends transaction for method: unpause
     * Smart contract: RoleManager (RoleManager)
     * Method signature: unpause()
     * Unpauses the smart contract Requires ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxUnpause(body: TxRequestRoleManagerUnpause): RequestParams<TxResponse, TxUnpauseErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/tx/unpause`),
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
     * Path: /contracts/role-manager/tx/upgrade-to-and-call
     * Sends transaction for method: upgradeToAndCall
     * Smart contract: RoleManager (RoleManager)
     * Method signature: upgradeToAndCall(address,bytes)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxUpgradeToAndCall(body: TxRequestRoleManagerUpgradeToAndCall): RequestParams<TxResponse, TxUpgradeToAndCallErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/tx/upgrade-to-and-call`),
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
     * Path: /contracts/role-manager/events/initialized
     * Get a list of events of type Initialized
     * Smart contract: RoleManager (RoleManager)
     * Event signature: Initialized(uint64)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsInitialized(queryParams: GetEventsInitializedQueryParameters): RequestParams<EventListRoleManagerInitialized, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/role-manager/events/initialized` + generateURIQuery(queryParams)),
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
     * Path: /contracts/role-manager/events/paused
     * Get a list of events of type Paused
     * Smart contract: RoleManager (RoleManager)
     * Event signature: Paused(address)
     * Paused - The smart contract was paused
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsPaused(queryParams: GetEventsPausedQueryParameters): RequestParams<EventListRoleManagerPaused, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/role-manager/events/paused` + generateURIQuery(queryParams)),
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
     * Path: /contracts/role-manager/events/role-assigned
     * Get a list of events of type RoleAssigned
     * Smart contract: RoleManager (RoleManager)
     * Event signature: RoleAssigned(address,uint8,address)
     * RoleAssigned - A role was assigned to an account
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsRoleAssigned(queryParams: GetEventsRoleAssignedQueryParameters): RequestParams<EventListRoleManagerRoleAssigned, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/role-manager/events/role-assigned` + generateURIQuery(queryParams)),
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
     * Path: /contracts/role-manager/events/role-revoked
     * Get a list of events of type RoleRevoked
     * Smart contract: RoleManager (RoleManager)
     * Event signature: RoleRevoked(address,uint8,address)
     * RoleRevoked - A role was revoked
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsRoleRevoked(queryParams: GetEventsRoleRevokedQueryParameters): RequestParams<EventListRoleManagerRoleRevoked, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/role-manager/events/role-revoked` + generateURIQuery(queryParams)),
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
     * Path: /contracts/role-manager/events/unpaused
     * Get a list of events of type Unpaused
     * Smart contract: RoleManager (RoleManager)
     * Event signature: Unpaused(address)
     * Paused - The smart contract was paused
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsUnpaused(queryParams: GetEventsUnpausedQueryParameters): RequestParams<EventListRoleManagerUnpaused, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/role-manager/events/unpaused` + generateURIQuery(queryParams)),
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
     * Path: /contracts/role-manager/events/upgraded
     * Get a list of events of type Upgraded
     * Smart contract: RoleManager (RoleManager)
     * Event signature: Upgraded(address)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsUpgraded(queryParams: GetEventsUpgradedQueryParameters): RequestParams<EventListRoleManagerUpgraded, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/role-manager/events/upgraded` + generateURIQuery(queryParams)),
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
     * Path: /contracts/role-manager/call/upgrade-interface-version
     * Calls the view method: UPGRADE_INTERFACE_VERSION
     * Smart contract: RoleManager (RoleManager)
     * Method signature: UPGRADE_INTERFACE_VERSION()
     * @returns The request parameters
     */
    public static CallUPGRADEINTERFACEVERSION(): RequestParams<CallResponseRoleManagerUPGRADE_INTERFACE_VERSION, CallUPGRADEINTERFACEVERSIONErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/call/upgrade-interface-version`),
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
     * Path: /contracts/role-manager/call/get-initialized-version
     * Calls the view method: getInitializedVersion
     * Smart contract: RoleManager (RoleManager)
     * Method signature: getInitializedVersion()
     * Gets the current initialized version Use this method to figure out the last deployed version of the contract
     * @returns The request parameters
     */
    public static CallGetInitializedVersion(): RequestParams<CallResponseRoleManagerGetInitializedVersion, CallGetInitializedVersionErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/call/get-initialized-version`),
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
     * Path: /contracts/role-manager/call/has-role
     * Calls the view method: hasRole
     * Smart contract: RoleManager (RoleManager)
     * Method signature: hasRole(address,uint8)
     * Checks if an account has a role (or has the role ADMIN)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallHasRole(body: CallRequestRoleManagerHasRole): RequestParams<CallResponseRoleManagerHasRole, CallHasRoleErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/call/has-role`),
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
     * Path: /contracts/role-manager/call/has-role-explicit
     * Calls the view method: hasRoleExplicit
     * Smart contract: RoleManager (RoleManager)
     * Method signature: hasRoleExplicit(address,uint8)
     * Checks if an account has a role (explicit, won't check for ADMIN role)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallHasRoleExplicit(body: CallRequestRoleManagerHasRoleExplicit): RequestParams<CallResponseRoleManagerHasRoleExplicit, CallHasRoleExplicitErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/call/has-role-explicit`),
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
     * Path: /contracts/role-manager/call/is-admin
     * Calls the view method: isAdmin
     * Smart contract: RoleManager (RoleManager)
     * Method signature: isAdmin(address)
     * Checks if an account has the ADMIN role
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallIsAdmin(body: CallRequestRoleManagerIsAdmin): RequestParams<CallResponseRoleManagerIsAdmin, CallIsAdminErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/call/is-admin`),
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
     * Path: /contracts/role-manager/call/paused
     * Calls the view method: paused
     * Smart contract: RoleManager (RoleManager)
     * Method signature: paused()
     * Checks if the smart contract is paused
     * @returns The request parameters
     */
    public static CallPaused(): RequestParams<CallResponseRoleManagerPaused, CallPausedErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/call/paused`),
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
     * Path: /contracts/role-manager/call/proxiable-uuid
     * Calls the view method: proxiableUUID
     * Smart contract: RoleManager (RoleManager)
     * Method signature: proxiableUUID()
     * @returns The request parameters
     */
    public static CallProxiableUUID(): RequestParams<CallResponseRoleManagerProxiableUUID, CallProxiableUUIDErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/role-manager/call/proxiable-uuid`),
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
 * Error handler for TxAssignRole
 */
export type TxAssignRoleErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxRevokeRole
 */
export type TxRevokeRoleErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Query parameters for GetEventsRoleAssigned
 */
export interface GetEventsRoleAssignedQueryParameters {
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
 * Query parameters for GetEventsRoleRevoked
 */
export interface GetEventsRoleRevokedQueryParameters {
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
 * Error handler for CallHasRole
 */
export type CallHasRoleErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallHasRoleExplicit
 */
export type CallHasRoleExplicitErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallIsAdmin
 */
export type CallIsAdminErrorHandler = CommonAuthenticatedErrorHandler & {
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

