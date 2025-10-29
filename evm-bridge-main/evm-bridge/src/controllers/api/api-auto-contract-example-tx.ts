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

// Smart contract synchronizer for Example
// WARNING: THIS FILE IS AUTO-GENERATED. DO NOT ADD ANY CHANGES OR THEY MAY BE LOST THE NEXT TIME YOU GENERATE THE CODE

"use strict";

import Express from "express";
import { Controller } from "../controller";
import { BAD_REQUEST, ensureObjectBody, sendApiError } from "../../utils/http-utils";
import { SmartContractsConfig } from "../../config/config-smart-contracts";
import { normalizeAndValidateInputParameters } from "../../utils/blockchain";
import { handleTransactionSending } from "../../utils/tx-sending";

/**
 * Auto generated smart contract API
 * Contract Example (ExampleContract)
 * This file contains the API for calling smart contract transaction methods
 * @group example - API for smart contract: Example (ExampleContract)
 */
export class ExampleContractApiTxController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.post(prefix + "/contracts/example/tx/initialize", ensureObjectBody(this.txInitialize.bind(this)));
        application.post(prefix + "/contracts/example/tx/pause", ensureObjectBody(this.txPause.bind(this)));
        application.post(prefix + "/contracts/example/tx/register-asset", ensureObjectBody(this.txRegisterAsset.bind(this)));
        application.post(prefix + "/contracts/example/tx/unpause", ensureObjectBody(this.txUnpause.bind(this)));
        application.post(prefix + "/contracts/example/tx/upgrade-to-and-call", ensureObjectBody(this.txUpgradeToAndCall.bind(this)));
    }

    /**
     * @typedef TxParamsExampleInitialize
     * @property {string} roleManagerAddress.required - roleManagerAddress - eg: 0x0000000000000000000000000000000000000000
     * @property {string} upgradeControlAddress.required - upgradeControlAddress - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef TxRequestExampleInitialize
     * @property {TxParamsExampleInitialize.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: initialize
     * Smart contract: Example (ExampleContract)
     * Method signature: initialize(address,address)
     * Binding: TxInitialize
     * 
     * @route POST /contracts/example/tx/initialize
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleInitialize.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txInitialize(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "roleManagerAddress", "type": "address" }, { "internalType": "address", "name": "upgradeControlAddress", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.initialize$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxRequestExamplePause
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: pause
     * Smart contract: Example (ExampleContract)
     * Method signature: pause()
     * Binding: TxPause
     * Pauses the smart contract Requires ADMIN role
     * @route POST /contracts/example/tx/pause
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExamplePause.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txPause(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.pause$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsExampleRegisterAsset
     * @property {string} assetId.required - L'identificatore univoco dell'asset (stringa)
     */

    /**
     * @typedef TxRequestExampleRegisterAsset
     * @property {TxParamsExampleRegisterAsset.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: registerAsset
     * Smart contract: Example (ExampleContract)
     * Method signature: registerAsset(string)
     * Binding: TxRegisterAsset
     * Registra un nuovo asset sulla blockchain
     * @route POST /contracts/example/tx/register-asset
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleRegisterAsset.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txRegisterAsset(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "string", "name": "assetId", "type": "string" }], "name": "registerAsset", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.registerAsset$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxRequestExampleUnpause
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: unpause
     * Smart contract: Example (ExampleContract)
     * Method signature: unpause()
     * Binding: TxUnpause
     * Unpauses the smart contract Requires ADMIN role
     * @route POST /contracts/example/tx/unpause
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleUnpause.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txUnpause(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.unpause$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsExampleUpgradeToAndCall
     * @property {string} newImplementation.required - newImplementation - eg: 0x0000000000000000000000000000000000000000
     * @property {string} data.required - data - eg: 0x
     */

    /**
     * @typedef TxRequestExampleUpgradeToAndCall
     * @property {TxParamsExampleUpgradeToAndCall.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: upgradeToAndCall
     * Smart contract: Example (ExampleContract)
     * Method signature: upgradeToAndCall(address,bytes)
     * Binding: TxUpgradeToAndCall
     * 
     * @route POST /contracts/example/tx/upgrade-to-and-call
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleUpgradeToAndCall.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txUpgradeToAndCall(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "newImplementation", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "upgradeToAndCall", "outputs": [], "stateMutability": "payable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.upgradeToAndCall$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
}
