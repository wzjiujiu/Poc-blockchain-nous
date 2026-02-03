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
import { SmartContractInformation, TxResponse, TxRequestExampleCompleteDataTransfer, TxRequestExampleInitialize, TxRequestExampleModifyAsset, TxRequestExampleModifyAssetminio, TxRequestExampleModifyDataoffer, TxRequestExampleModifyPolicy, TxRequestExamplePause, TxRequestExampleRegisterAsset, TxRequestExampleRegisterAssetminio, TxRequestExampleRegisterContratto, TxRequestExampleRegisterDataoffer, TxRequestExampleRegisterPolicy, TxRequestExampleRequestDataTransfer, TxRequestExampleUnpause, TxRequestExampleUpdateContrattoState, TxRequestExampleUpgradeToAndCall, EventListExampleAssetModified, EventListExampleAssetModifiedminio, EventListExampleAssetRegistered, EventListExampleAssetRegisteredminio, EventListExampleContrattoRegistered, EventListExampleContrattoStateUpdated, EventListExampleDataTransferCompleted, EventListExampleDataTransferRequested, EventListExampleDataofferModified, EventListExampleDataofferRegistered, EventListExampleInitialized, EventListExamplePaused, EventListExamplePolicyModified, EventListExamplePolicyRegistered, EventListExampleUnpaused, EventListExampleUpgraded, CallResponseExampleUPGRADE_INTERFACE_VERSION, CallResponseExampleAssetExists, CallRequestExampleAssetExists, CallResponseExampleAssetExistsminio, CallRequestExampleAssetExistsminio, CallResponseExampleContrattoExists, CallRequestExampleContrattoExists, CallResponseExampleDataofferExists, CallRequestExampleDataofferExists, CallResponseExampleGetAsset, CallRequestExampleGetAsset, CallResponseExampleGetAssetminio, CallRequestExampleGetAssetminio, CallResponseExampleGetContratto, CallRequestExampleGetContratto, CallResponseExampleGetDataoffer, CallRequestExampleGetDataoffer, CallResponseExampleGetInitializedVersion, CallResponseExampleGetPolicy, CallRequestExampleGetPolicy, CallResponseExampleGetTransfer, CallRequestExampleGetTransfer, CallResponseExamplePaused, CallResponseExamplePolicyExists, CallRequestExamplePolicyExists, CallResponseExampleProxiableUUID, CallResponseExampleTransferExists, CallRequestExampleTransferExists } from "./definitions";

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
     * Path: /contracts/example/tx/complete-data-transfer
     * Sends transaction for method: completeDataTransfer
     * Smart contract: Example (ExampleContract)
     * Method signature: completeDataTransfer(string,bytes32)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxCompleteDataTransfer(body: TxRequestExampleCompleteDataTransfer): RequestParams<TxResponse, TxCompleteDataTransferErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/complete-data-transfer`),
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
     * Path: /contracts/example/tx/modify-asset
     * Sends transaction for method: modifyAsset
     * Smart contract: Example (ExampleContract)
     * Method signature: modifyAsset(bytes32,string,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxModifyAsset(body: TxRequestExampleModifyAsset): RequestParams<TxResponse, TxModifyAssetErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/modify-asset`),
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
     * Path: /contracts/example/tx/modify-assetminio
     * Sends transaction for method: modifyAssetminio
     * Smart contract: Example (ExampleContract)
     * Method signature: modifyAssetminio(bytes32,string,string,bytes32)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxModifyAssetminio(body: TxRequestExampleModifyAssetminio): RequestParams<TxResponse, TxModifyAssetminioErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/modify-assetminio`),
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
     * Path: /contracts/example/tx/modify-dataoffer
     * Sends transaction for method: modifyDataoffer
     * Smart contract: Example (ExampleContract)
     * Method signature: modifyDataoffer(bytes32,string,string,string,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxModifyDataoffer(body: TxRequestExampleModifyDataoffer): RequestParams<TxResponse, TxModifyDataofferErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/modify-dataoffer`),
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
     * Path: /contracts/example/tx/modify-policy
     * Sends transaction for method: modifyPolicy
     * Smart contract: Example (ExampleContract)
     * Method signature: modifyPolicy(bytes32,string,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxModifyPolicy(body: TxRequestExampleModifyPolicy): RequestParams<TxResponse, TxModifyPolicyErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/modify-policy`),
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
     * Method signature: registerAsset(bytes32,string,string)
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
     * Path: /contracts/example/tx/register-assetminio
     * Sends transaction for method: registerAssetminio
     * Smart contract: Example (ExampleContract)
     * Method signature: registerAssetminio(bytes32,string,string,bytes32)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxRegisterAssetminio(body: TxRequestExampleRegisterAssetminio): RequestParams<TxResponse, TxRegisterAssetminioErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/register-assetminio`),
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
     * Path: /contracts/example/tx/register-contratto
     * Sends transaction for method: registerContratto
     * Smart contract: Example (ExampleContract)
     * Method signature: registerContratto(bytes32,string,string,uint256,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxRegisterContratto(body: TxRequestExampleRegisterContratto): RequestParams<TxResponse, TxRegisterContrattoErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/register-contratto`),
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
     * Path: /contracts/example/tx/register-dataoffer
     * Sends transaction for method: registerDataoffer
     * Smart contract: Example (ExampleContract)
     * Method signature: registerDataoffer(bytes32,string,string,string,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxRegisterDataoffer(body: TxRequestExampleRegisterDataoffer): RequestParams<TxResponse, TxRegisterDataofferErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/register-dataoffer`),
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
     * Path: /contracts/example/tx/register-policy
     * Sends transaction for method: registerPolicy
     * Smart contract: Example (ExampleContract)
     * Method signature: registerPolicy(bytes32,string,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxRegisterPolicy(body: TxRequestExampleRegisterPolicy): RequestParams<TxResponse, TxRegisterPolicyErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/register-policy`),
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
     * Path: /contracts/example/tx/request-data-transfer
     * Sends transaction for method: requestDataTransfer
     * Smart contract: Example (ExampleContract)
     * Method signature: requestDataTransfer(string,bytes32,string,string,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxRequestDataTransfer(body: TxRequestExampleRequestDataTransfer): RequestParams<TxResponse, TxRequestDataTransferErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/request-data-transfer`),
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
     * Path: /contracts/example/tx/update-contratto-state
     * Sends transaction for method: updateContrattoState
     * Smart contract: Example (ExampleContract)
     * Method signature: updateContrattoState(bytes32,string,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static TxUpdateContrattoState(body: TxRequestExampleUpdateContrattoState): RequestParams<TxResponse, TxUpdateContrattoStateErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/tx/update-contratto-state`),
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
     * Path: /contracts/example/events/asset-modified
     * Get a list of events of type AssetModified
     * Smart contract: Example (ExampleContract)
     * Event signature: AssetModified(bytes32,string,uint256,string)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsAssetModified(queryParams: GetEventsAssetModifiedQueryParameters): RequestParams<EventListExampleAssetModified, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/asset-modified` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/asset-modifiedminio
     * Get a list of events of type AssetModifiedminio
     * Smart contract: Example (ExampleContract)
     * Event signature: AssetModifiedminio(bytes32,string,bytes32,uint256,string)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsAssetModifiedminio(queryParams: GetEventsAssetModifiedminioQueryParameters): RequestParams<EventListExampleAssetModifiedminio, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/asset-modifiedminio` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/asset-registered
     * Get a list of events of type AssetRegistered
     * Smart contract: Example (ExampleContract)
     * Event signature: AssetRegistered(address,bytes32,string,uint256,string)
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
     * Path: /contracts/example/events/asset-registeredminio
     * Get a list of events of type AssetRegisteredminio
     * Smart contract: Example (ExampleContract)
     * Event signature: AssetRegisteredminio(address,bytes32,string,bytes32,uint256,string)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsAssetRegisteredminio(queryParams: GetEventsAssetRegisteredminioQueryParameters): RequestParams<EventListExampleAssetRegisteredminio, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/asset-registeredminio` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/contratto-registered
     * Get a list of events of type ContrattoRegistered
     * Smart contract: Example (ExampleContract)
     * Event signature: ContrattoRegistered(address,bytes32,string,string,uint256,string)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsContrattoRegistered(queryParams: GetEventsContrattoRegisteredQueryParameters): RequestParams<EventListExampleContrattoRegistered, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/contratto-registered` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/contratto-state-updated
     * Get a list of events of type ContrattoStateUpdated
     * Smart contract: Example (ExampleContract)
     * Event signature: ContrattoStateUpdated(bytes32,string,uint256,string)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsContrattoStateUpdated(queryParams: GetEventsContrattoStateUpdatedQueryParameters): RequestParams<EventListExampleContrattoStateUpdated, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/contratto-state-updated` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/data-transfer-completed
     * Get a list of events of type DataTransferCompleted
     * Smart contract: Example (ExampleContract)
     * Event signature: DataTransferCompleted(string,bytes32,uint256)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsDataTransferCompleted(queryParams: GetEventsDataTransferCompletedQueryParameters): RequestParams<EventListExampleDataTransferCompleted, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/data-transfer-completed` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/data-transfer-requested
     * Get a list of events of type DataTransferRequested
     * Smart contract: Example (ExampleContract)
     * Event signature: DataTransferRequested(string,string,address,uint256,uint8)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsDataTransferRequested(queryParams: GetEventsDataTransferRequestedQueryParameters): RequestParams<EventListExampleDataTransferRequested, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/data-transfer-requested` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/dataoffer-modified
     * Get a list of events of type DataofferModified
     * Smart contract: Example (ExampleContract)
     * Event signature: DataofferModified(bytes32,string,uint256,string,string,string)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsDataofferModified(queryParams: GetEventsDataofferModifiedQueryParameters): RequestParams<EventListExampleDataofferModified, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/dataoffer-modified` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/dataoffer-registered
     * Get a list of events of type DataofferRegistered
     * Smart contract: Example (ExampleContract)
     * Event signature: DataofferRegistered(address,bytes32,string,uint256,string,string,string)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsDataofferRegistered(queryParams: GetEventsDataofferRegisteredQueryParameters): RequestParams<EventListExampleDataofferRegistered, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/dataoffer-registered` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/policy-modified
     * Get a list of events of type PolicyModified
     * Smart contract: Example (ExampleContract)
     * Event signature: PolicyModified(bytes32,string,uint256,string)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsPolicyModified(queryParams: GetEventsPolicyModifiedQueryParameters): RequestParams<EventListExamplePolicyModified, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/policy-modified` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/events/policy-registered
     * Get a list of events of type PolicyRegistered
     * Smart contract: Example (ExampleContract)
     * Event signature: PolicyRegistered(address,bytes32,string,uint256,string)
     * @param queryParams Query parameters
     * @returns The request parameters
     */
    public static GetEventsPolicyRegistered(queryParams: GetEventsPolicyRegisteredQueryParameters): RequestParams<EventListExamplePolicyRegistered, CommonAuthenticatedErrorHandler> {
        return {
            method: "GET",
            url: getApiUrl(`/contracts/example/events/policy-registered` + generateURIQuery(queryParams)),
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
     * Path: /contracts/example/call/asset-exists
     * Calls the view method: assetExists
     * Smart contract: Example (ExampleContract)
     * Method signature: assetExists(bytes32,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallAssetExists(body: CallRequestExampleAssetExists): RequestParams<CallResponseExampleAssetExists, CallAssetExistsErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/asset-exists`),
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
     * Path: /contracts/example/call/asset-existsminio
     * Calls the view method: assetExistsminio
     * Smart contract: Example (ExampleContract)
     * Method signature: assetExistsminio(bytes32,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallAssetExistsminio(body: CallRequestExampleAssetExistsminio): RequestParams<CallResponseExampleAssetExistsminio, CallAssetExistsminioErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/asset-existsminio`),
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
     * Path: /contracts/example/call/contratto-exists
     * Calls the view method: contrattoExists
     * Smart contract: Example (ExampleContract)
     * Method signature: contrattoExists(bytes32,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallContrattoExists(body: CallRequestExampleContrattoExists): RequestParams<CallResponseExampleContrattoExists, CallContrattoExistsErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/contratto-exists`),
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
     * Path: /contracts/example/call/dataoffer-exists
     * Calls the view method: dataofferExists
     * Smart contract: Example (ExampleContract)
     * Method signature: dataofferExists(bytes32,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallDataofferExists(body: CallRequestExampleDataofferExists): RequestParams<CallResponseExampleDataofferExists, CallDataofferExistsErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/dataoffer-exists`),
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
     * Path: /contracts/example/call/get-asset
     * Calls the view method: getAsset
     * Smart contract: Example (ExampleContract)
     * Method signature: getAsset(bytes32,string)
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
     * Path: /contracts/example/call/get-assetminio
     * Calls the view method: getAssetminio
     * Smart contract: Example (ExampleContract)
     * Method signature: getAssetminio(bytes32,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallGetAssetminio(body: CallRequestExampleGetAssetminio): RequestParams<CallResponseExampleGetAssetminio, CallGetAssetminioErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/get-assetminio`),
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
     * Path: /contracts/example/call/get-contratto
     * Calls the view method: getContratto
     * Smart contract: Example (ExampleContract)
     * Method signature: getContratto(bytes32,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallGetContratto(body: CallRequestExampleGetContratto): RequestParams<CallResponseExampleGetContratto, CallGetContrattoErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/get-contratto`),
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
     * Path: /contracts/example/call/get-dataoffer
     * Calls the view method: getDataoffer
     * Smart contract: Example (ExampleContract)
     * Method signature: getDataoffer(bytes32,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallGetDataoffer(body: CallRequestExampleGetDataoffer): RequestParams<CallResponseExampleGetDataoffer, CallGetDataofferErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/get-dataoffer`),
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
     * Path: /contracts/example/call/get-policy
     * Calls the view method: getPolicy
     * Smart contract: Example (ExampleContract)
     * Method signature: getPolicy(bytes32,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallGetPolicy(body: CallRequestExampleGetPolicy): RequestParams<CallResponseExampleGetPolicy, CallGetPolicyErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/get-policy`),
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
     * Path: /contracts/example/call/get-transfer
     * Calls the view method: getTransfer
     * Smart contract: Example (ExampleContract)
     * Method signature: getTransfer(string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallGetTransfer(body: CallRequestExampleGetTransfer): RequestParams<CallResponseExampleGetTransfer, CallGetTransferErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/get-transfer`),
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
     * Path: /contracts/example/call/policy-exists
     * Calls the view method: policyExists
     * Smart contract: Example (ExampleContract)
     * Method signature: policyExists(bytes32,string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallPolicyExists(body: CallRequestExamplePolicyExists): RequestParams<CallResponseExamplePolicyExists, CallPolicyExistsErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/policy-exists`),
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

    /**
     * Method: POST
     * Path: /contracts/example/call/transfer-exists
     * Calls the view method: transferExists
     * Smart contract: Example (ExampleContract)
     * Method signature: transferExists(string)
     * @param body Body parameters
     * @returns The request parameters
     */
    public static CallTransferExists(body: CallRequestExampleTransferExists): RequestParams<CallResponseExampleTransferExists, CallTransferExistsErrorHandler> {
        return {
            method: "POST",
            url: getApiUrl(`/contracts/example/call/transfer-exists`),
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
}

/**
 * Error handler for TxCompleteDataTransfer
 */
export type TxCompleteDataTransferErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxModifyAsset
 */
export type TxModifyAssetErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxModifyAssetminio
 */
export type TxModifyAssetminioErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxModifyDataoffer
 */
export type TxModifyDataofferErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxModifyPolicy
 */
export type TxModifyPolicyErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxRegisterAssetminio
 */
export type TxRegisterAssetminioErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxRegisterContratto
 */
export type TxRegisterContrattoErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxRegisterDataoffer
 */
export type TxRegisterDataofferErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxRegisterPolicy
 */
export type TxRegisterPolicyErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxRequestDataTransfer
 */
export type TxRequestDataTransferErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for TxUpdateContrattoState
 */
export type TxUpdateContrattoStateErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Query parameters for GetEventsAssetModified
 */
export interface GetEventsAssetModifiedQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'nodeId' equal than the one specified.
     */
    filter_eq_pNodeId?: string;
}

/**
 * Query parameters for GetEventsAssetModifiedminio
 */
export interface GetEventsAssetModifiedminioQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'nodeId' equal than the one specified.
     */
    filter_eq_pNodeId?: string;
}

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
     * Filter event with a value for the parameter 'registrar' equal than the one specified.
     */
    filter_eq_pRegistrar?: string;

    /**
     * Filter event with a value for the parameter 'nodeId' equal than the one specified.
     */
    filter_eq_pNodeId?: string;
}

/**
 * Query parameters for GetEventsAssetRegisteredminio
 */
export interface GetEventsAssetRegisteredminioQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'registrar' equal than the one specified.
     */
    filter_eq_pRegistrar?: string;

    /**
     * Filter event with a value for the parameter 'nodeId' equal than the one specified.
     */
    filter_eq_pNodeId?: string;
}

/**
 * Query parameters for GetEventsContrattoRegistered
 */
export interface GetEventsContrattoRegisteredQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'registrar' equal than the one specified.
     */
    filter_eq_pRegistrar?: string;

    /**
     * Filter event with a value for the parameter 'nodeId' equal than the one specified.
     */
    filter_eq_pNodeId?: string;
}

/**
 * Query parameters for GetEventsContrattoStateUpdated
 */
export interface GetEventsContrattoStateUpdatedQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'nodeId' equal than the one specified.
     */
    filter_eq_pNodeId?: string;
}

/**
 * Query parameters for GetEventsDataTransferCompleted
 */
export interface GetEventsDataTransferCompletedQueryParameters {
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
 * Query parameters for GetEventsDataTransferRequested
 */
export interface GetEventsDataTransferRequestedQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'consumer' equal than the one specified.
     */
    filter_eq_pConsumer?: string;
}

/**
 * Query parameters for GetEventsDataofferModified
 */
export interface GetEventsDataofferModifiedQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'nodeId' equal than the one specified.
     */
    filter_eq_pNodeId?: string;
}

/**
 * Query parameters for GetEventsDataofferRegistered
 */
export interface GetEventsDataofferRegisteredQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'registrar' equal than the one specified.
     */
    filter_eq_pRegistrar?: string;

    /**
     * Filter event with a value for the parameter 'nodeId' equal than the one specified.
     */
    filter_eq_pNodeId?: string;
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
 * Query parameters for GetEventsPolicyModified
 */
export interface GetEventsPolicyModifiedQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'nodeId' equal than the one specified.
     */
    filter_eq_pNodeId?: string;
}

/**
 * Query parameters for GetEventsPolicyRegistered
 */
export interface GetEventsPolicyRegisteredQueryParameters {
    /**
     * Continuation token
     */
    continuationToken?: string;

    /**
     * Max number of items to get. Default: 25, Max: 256
     */
    limit?: string;

    /**
     * Filter event with a value for the parameter 'registrar' equal than the one specified.
     */
    filter_eq_pRegistrar?: string;

    /**
     * Filter event with a value for the parameter 'nodeId' equal than the one specified.
     */
    filter_eq_pNodeId?: string;
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
 * Error handler for CallAssetExists
 */
export type CallAssetExistsErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallAssetExistsminio
 */
export type CallAssetExistsminioErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallContrattoExists
 */
export type CallContrattoExistsErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallDataofferExists
 */
export type CallDataofferExistsErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallGetAssetminio
 */
export type CallGetAssetminioErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallGetContratto
 */
export type CallGetContrattoErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallGetDataoffer
 */
export type CallGetDataofferErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallGetPolicy
 */
export type CallGetPolicyErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallGetTransfer
 */
export type CallGetTransferErrorHandler = CommonAuthenticatedErrorHandler & {
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
 * Error handler for CallPolicyExists
 */
export type CallPolicyExistsErrorHandler = CommonAuthenticatedErrorHandler & {
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

/**
 * Error handler for CallTransferExists
 */
export type CallTransferExistsErrorHandler = CommonAuthenticatedErrorHandler & {
    /**
     * General handler for status = 400
     */
    badRequest: () => void;

    /**
     * General handler for status = 404
     */
    notFound: () => void;
};

