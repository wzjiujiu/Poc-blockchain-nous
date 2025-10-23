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
import { Monitor } from "../../monitor";
import { BAD_REQUEST, NOT_FOUND, ensureObjectBody, sendApiError, sendApiResult } from "../../utils/http-utils";
import { SmartContractsConfig } from "../../config/config-smart-contracts";
import { normalizeAndValidateInputParameters, serializeOutputABIParams } from "../../utils/blockchain";

/**
 * Auto generated smart contract API
 * Contract Example (ExampleContract)
 * This file contains the API for calling smart contract view / pure methods
 * @group example - API for smart contract: Example (ExampleContract)
 */
export class ExampleContractApiCallController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.post(prefix + "/contracts/example/call/upgrade-interface-version", ensureObjectBody(this.callUPGRADE_INTERFACE_VERSION.bind(this)));
        application.post(prefix + "/contracts/example/call/get-initialized-version", ensureObjectBody(this.callGetInitializedVersion.bind(this)));
        application.post(prefix + "/contracts/example/call/get-test-values", ensureObjectBody(this.callGetTestValues.bind(this)));
        application.post(prefix + "/contracts/example/call/paused", ensureObjectBody(this.callPaused.bind(this)));
        application.post(prefix + "/contracts/example/call/proxiable-uuid", ensureObjectBody(this.callProxiableUUID.bind(this)));
    }

    /**
     * @typedef CallResponseExampleUPGRADE_INTERFACE_VERSION
     * @property {string} _0.required - _0
     */

    /**
     * Calls the view method: UPGRADE_INTERFACE_VERSION
     * Smart contract: Example (ExampleContract)
     * Method signature: UPGRADE_INTERFACE_VERSION()
     * Binding: CallUPGRADE_INTERFACE_VERSION
     * 
     * @route POST /contracts/example/call/upgrade-interface-version
     * @group example - API for smart contract: Example (ExampleContract)
     * @returns {CallResponseExampleUPGRADE_INTERFACE_VERSION.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callUPGRADE_INTERFACE_VERSION(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [], "name": "UPGRADE_INTERFACE_VERSION", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.UPGRADE_INTERFACE_VERSION.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallResponseExampleGetInitializedVersion
     * @property {string} v.required - The current initialized version - eg: 0
     */

    /**
     * Calls the view method: getInitializedVersion
     * Smart contract: Example (ExampleContract)
     * Method signature: getInitializedVersion()
     * Binding: CallGetInitializedVersion
     * Gets the current initialized version Use this method to figure out the last deployed version of the contract
     * @route POST /contracts/example/call/get-initialized-version
     * @group example - API for smart contract: Example (ExampleContract)
     * @returns {CallResponseExampleGetInitializedVersion.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callGetInitializedVersion(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [], "name": "getInitializedVersion", "outputs": [{ "internalType": "uint64", "name": "v", "type": "uint64" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.getInitializedVersion.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallResponseExampleGetTestValues
     * @property {string} exampleValue1.required - Example value 1 - eg: 0
     * @property {string} exampleValue2.required - Example value 2
     * @property {string} exampleValue3.required - Example value 3 - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * Calls the view method: getTestValues
     * Smart contract: Example (ExampleContract)
     * Method signature: getTestValues()
     * Binding: CallGetTestValues
     * Gets the current test values
     * @route POST /contracts/example/call/get-test-values
     * @group example - API for smart contract: Example (ExampleContract)
     * @returns {CallResponseExampleGetTestValues.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callGetTestValues(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [], "name": "getTestValues", "outputs": [{ "internalType": "uint256", "name": "exampleValue1", "type": "uint256" }, { "internalType": "string", "name": "exampleValue2", "type": "string" }, { "internalType": "address", "name": "exampleValue3", "type": "address" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.getTestValues.call(wrapper, ...callParams);

            result = serializeOutputABIParams([
                callResult.exampleValue1,
                callResult.exampleValue2,
                callResult.exampleValue3,
            ], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallResponseExamplePaused
     * @property {boolean} _0.required - bool True if paused, false otherwise
     */

    /**
     * Calls the view method: paused
     * Smart contract: Example (ExampleContract)
     * Method signature: paused()
     * Binding: CallPaused
     * Checks if the smart contract is paused
     * @route POST /contracts/example/call/paused
     * @group example - API for smart contract: Example (ExampleContract)
     * @returns {CallResponseExamplePaused.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callPaused(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.paused.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallResponseExampleProxiableUUID
     * @property {string} _0.required - _0 - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     */

    /**
     * Calls the view method: proxiableUUID
     * Smart contract: Example (ExampleContract)
     * Method signature: proxiableUUID()
     * Binding: CallProxiableUUID
     * 
     * @route POST /contracts/example/call/proxiable-uuid
     * @group example - API for smart contract: Example (ExampleContract)
     * @returns {CallResponseExampleProxiableUUID.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callProxiableUUID(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [], "name": "proxiableUUID", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.proxiableUUID.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
}
