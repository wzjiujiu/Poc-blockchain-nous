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
        application.post(prefix + "/contracts/example/call/asset-exists", ensureObjectBody(this.callAssetExists.bind(this)));
        application.post(prefix + "/contracts/example/call/contratto-exists", ensureObjectBody(this.callContrattoExists.bind(this)));
        application.post(prefix + "/contracts/example/call/dataoffer-exists", ensureObjectBody(this.callDataofferExists.bind(this)));
        application.post(prefix + "/contracts/example/call/get-asset", ensureObjectBody(this.callGetAsset.bind(this)));
        application.post(prefix + "/contracts/example/call/get-contratto", ensureObjectBody(this.callGetContratto.bind(this)));
        application.post(prefix + "/contracts/example/call/get-dataoffer", ensureObjectBody(this.callGetDataoffer.bind(this)));
        application.post(prefix + "/contracts/example/call/get-initialized-version", ensureObjectBody(this.callGetInitializedVersion.bind(this)));
        application.post(prefix + "/contracts/example/call/get-policy", ensureObjectBody(this.callGetPolicy.bind(this)));
        application.post(prefix + "/contracts/example/call/get-transfer", ensureObjectBody(this.callGetTransfer.bind(this)));
        application.post(prefix + "/contracts/example/call/paused", ensureObjectBody(this.callPaused.bind(this)));
        application.post(prefix + "/contracts/example/call/policy-exists", ensureObjectBody(this.callPolicyExists.bind(this)));
        application.post(prefix + "/contracts/example/call/proxiable-uuid", ensureObjectBody(this.callProxiableUUID.bind(this)));
        application.post(prefix + "/contracts/example/call/transfer-exists", ensureObjectBody(this.callTransferExists.bind(this)));
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
     * @typedef CallRequestExampleAssetExists
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} assetId.required - assetId
     */

    /**
     * @typedef CallResponseExampleAssetExists
     * @property {boolean} _0.required - _0
     */

    /**
     * Calls the view method: assetExists
     * Smart contract: Example (ExampleContract)
     * Method signature: assetExists(bytes32,string)
     * Binding: CallAssetExists
     * 
     * @route POST /contracts/example/call/asset-exists
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {CallRequestExampleAssetExists.model} request.body.required - Request body
     * @returns {CallResponseExampleAssetExists.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callAssetExists(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "assetId", "type": "string" }], "name": "assetExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.assetExists.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallRequestExampleContrattoExists
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} contractNegotiationId.required - contractNegotiationId
     */

    /**
     * @typedef CallResponseExampleContrattoExists
     * @property {boolean} _0.required - _0
     */

    /**
     * Calls the view method: contrattoExists
     * Smart contract: Example (ExampleContract)
     * Method signature: contrattoExists(bytes32,string)
     * Binding: CallContrattoExists
     * 
     * @route POST /contracts/example/call/contratto-exists
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {CallRequestExampleContrattoExists.model} request.body.required - Request body
     * @returns {CallResponseExampleContrattoExists.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callContrattoExists(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "contractNegotiationId", "type": "string" }], "name": "contrattoExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.contrattoExists.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallRequestExampleDataofferExists
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} offerId.required - offerId
     */

    /**
     * @typedef CallResponseExampleDataofferExists
     * @property {boolean} _0.required - _0
     */

    /**
     * Calls the view method: dataofferExists
     * Smart contract: Example (ExampleContract)
     * Method signature: dataofferExists(bytes32,string)
     * Binding: CallDataofferExists
     * 
     * @route POST /contracts/example/call/dataoffer-exists
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {CallRequestExampleDataofferExists.model} request.body.required - Request body
     * @returns {CallResponseExampleDataofferExists.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callDataofferExists(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "offerId", "type": "string" }], "name": "dataofferExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.dataofferExists.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallRequestExampleGetAsset
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} assetId.required - assetId
     */

    /**
     * @typedef CallResponseExampleGetAsset
     * @property {string} id.required - id
     * @property {string} nId.required - nId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} registrar.required - registrar - eg: 0x0000000000000000000000000000000000000000
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} title.required - title
     */

    /**
     * Calls the view method: getAsset
     * Smart contract: Example (ExampleContract)
     * Method signature: getAsset(bytes32,string)
     * Binding: CallGetAsset
     * 
     * @route POST /contracts/example/call/get-asset
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {CallRequestExampleGetAsset.model} request.body.required - Request body
     * @returns {CallResponseExampleGetAsset.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callGetAsset(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "assetId", "type": "string" }], "name": "getAsset", "outputs": [{ "internalType": "string", "name": "id", "type": "string" }, { "internalType": "bytes32", "name": "nId", "type": "bytes32" }, { "internalType": "address", "name": "registrar", "type": "address" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "string", "name": "title", "type": "string" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.getAsset.call(wrapper, ...callParams);

            result = serializeOutputABIParams([
                callResult.id,
                callResult.nId,
                callResult.registrar,
                callResult.timestamp,
                callResult.title,
            ], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallRequestExampleGetContratto
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} contractNegotiationId.required - contractNegotiationId
     */

    /**
     * @typedef CallResponseExampleGetContratto
     * @property {string} id.required - id
     * @property {string} nId.required - nId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} counterpartyId.required - counterpartyId
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} createdAt.required - createdAt - eg: 0
     * @property {string} state.required - state
     */

    /**
     * Calls the view method: getContratto
     * Smart contract: Example (ExampleContract)
     * Method signature: getContratto(bytes32,string)
     * Binding: CallGetContratto
     * 
     * @route POST /contracts/example/call/get-contratto
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {CallRequestExampleGetContratto.model} request.body.required - Request body
     * @returns {CallResponseExampleGetContratto.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callGetContratto(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "contractNegotiationId", "type": "string" }], "name": "getContratto", "outputs": [{ "internalType": "string", "name": "id", "type": "string" }, { "internalType": "bytes32", "name": "nId", "type": "bytes32" }, { "internalType": "string", "name": "counterpartyId", "type": "string" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "createdAt", "type": "uint256" }, { "internalType": "string", "name": "state", "type": "string" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.getContratto.call(wrapper, ...callParams);

            result = serializeOutputABIParams([
                callResult.id,
                callResult.nId,
                callResult.counterpartyId,
                callResult.timestamp,
                callResult.createdAt,
                callResult.state,
            ], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallRequestExampleGetDataoffer
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} offerId.required - offerId
     */

    /**
     * @typedef CallResponseExampleGetDataoffer
     * @property {string} id.required - id
     * @property {string} nId.required - nId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} registrar.required - registrar - eg: 0x0000000000000000000000000000000000000000
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} accessPolicyId.required - accessPolicyId
     * @property {string} contractPolicyId.required - contractPolicyId
     * @property {string} assetSelector.required - assetSelector
     */

    /**
     * Calls the view method: getDataoffer
     * Smart contract: Example (ExampleContract)
     * Method signature: getDataoffer(bytes32,string)
     * Binding: CallGetDataoffer
     * 
     * @route POST /contracts/example/call/get-dataoffer
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {CallRequestExampleGetDataoffer.model} request.body.required - Request body
     * @returns {CallResponseExampleGetDataoffer.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callGetDataoffer(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "offerId", "type": "string" }], "name": "getDataoffer", "outputs": [{ "internalType": "string", "name": "id", "type": "string" }, { "internalType": "bytes32", "name": "nId", "type": "bytes32" }, { "internalType": "address", "name": "registrar", "type": "address" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "string", "name": "accessPolicyId", "type": "string" }, { "internalType": "string", "name": "contractPolicyId", "type": "string" }, { "internalType": "string", "name": "assetSelector", "type": "string" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.getDataoffer.call(wrapper, ...callParams);

            result = serializeOutputABIParams([
                callResult.id,
                callResult.nId,
                callResult.registrar,
                callResult.timestamp,
                callResult.accessPolicyId,
                callResult.contractPolicyId,
                callResult.assetSelector,
            ], methodAbi);
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
     * @typedef CallRequestExampleGetPolicy
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} policyId.required - policyId
     */

    /**
     * @typedef CallResponseExampleGetPolicy
     * @property {string} id.required - id
     * @property {string} nId.required - nId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} registrar.required - registrar - eg: 0x0000000000000000000000000000000000000000
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} title.required - title
     */

    /**
     * Calls the view method: getPolicy
     * Smart contract: Example (ExampleContract)
     * Method signature: getPolicy(bytes32,string)
     * Binding: CallGetPolicy
     * 
     * @route POST /contracts/example/call/get-policy
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {CallRequestExampleGetPolicy.model} request.body.required - Request body
     * @returns {CallResponseExampleGetPolicy.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callGetPolicy(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "policyId", "type": "string" }], "name": "getPolicy", "outputs": [{ "internalType": "string", "name": "id", "type": "string" }, { "internalType": "bytes32", "name": "nId", "type": "bytes32" }, { "internalType": "address", "name": "registrar", "type": "address" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "string", "name": "title", "type": "string" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.getPolicy.call(wrapper, ...callParams);

            result = serializeOutputABIParams([
                callResult.id,
                callResult.nId,
                callResult.registrar,
                callResult.timestamp,
                callResult.title,
            ], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallRequestExampleGetTransfer
     * @property {string} transferId.required - transferId
     */

    /**
     * @typedef CallResponseExampleGetTransfer
     * @property {string} id.required - id
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} contractAgreementId.required - contractAgreementId
     * @property {string} assetId.required - assetId
     * @property {string} dataHash.required - dataHash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} status.required - status - eg: 0
     * @property {string} timestamp.required - timestamp - eg: 0
     */

    /**
     * Calls the view method: getTransfer
     * Smart contract: Example (ExampleContract)
     * Method signature: getTransfer(string)
     * Binding: CallGetTransfer
     * 
     * @route POST /contracts/example/call/get-transfer
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {CallRequestExampleGetTransfer.model} request.body.required - Request body
     * @returns {CallResponseExampleGetTransfer.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callGetTransfer(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "string", "name": "transferId", "type": "string" }], "name": "getTransfer", "outputs": [{ "internalType": "string", "name": "id", "type": "string" }, { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "contractAgreementId", "type": "string" }, { "internalType": "string", "name": "assetId", "type": "string" }, { "internalType": "bytes32", "name": "dataHash", "type": "bytes32" }, { "internalType": "enum ExampleContract.TransferStatus", "name": "status", "type": "uint8" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.getTransfer.call(wrapper, ...callParams);

            result = serializeOutputABIParams([
                callResult.id,
                callResult.nodeId,
                callResult.contractAgreementId,
                callResult.assetId,
                callResult.dataHash,
                callResult.status,
                callResult.timestamp,
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
     * @typedef CallRequestExamplePolicyExists
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} policyId.required - policyId
     */

    /**
     * @typedef CallResponseExamplePolicyExists
     * @property {boolean} _0.required - _0
     */

    /**
     * Calls the view method: policyExists
     * Smart contract: Example (ExampleContract)
     * Method signature: policyExists(bytes32,string)
     * Binding: CallPolicyExists
     * 
     * @route POST /contracts/example/call/policy-exists
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {CallRequestExamplePolicyExists.model} request.body.required - Request body
     * @returns {CallResponseExamplePolicyExists.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callPolicyExists(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "policyId", "type": "string" }], "name": "policyExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.policyExists.call(wrapper, ...callParams);

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
    /**
     * @typedef CallRequestExampleTransferExists
     * @property {string} transferId.required - transferId
     */

    /**
     * @typedef CallResponseExampleTransferExists
     * @property {boolean} _0.required - _0
     */

    /**
     * Calls the view method: transferExists
     * Smart contract: Example (ExampleContract)
     * Method signature: transferExists(string)
     * Binding: CallTransferExists
     * 
     * @route POST /contracts/example/call/transfer-exists
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {CallRequestExampleTransferExists.model} request.body.required - Request body
     * @returns {CallResponseExampleTransferExists.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callTransferExists(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "string", "name": "transferId", "type": "string" }], "name": "transferExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        let result: any;
        try {
            const callResult = await wrapper.transferExists.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
}
