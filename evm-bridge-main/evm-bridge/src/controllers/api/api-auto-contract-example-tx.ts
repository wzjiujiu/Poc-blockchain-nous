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
        application.post(prefix + "/contracts/example/tx/complete-data-transfer", ensureObjectBody(this.txCompleteDataTransfer.bind(this)));
        application.post(prefix + "/contracts/example/tx/initialize", ensureObjectBody(this.txInitialize.bind(this)));
        application.post(prefix + "/contracts/example/tx/modify-asset", ensureObjectBody(this.txModifyAsset.bind(this)));
        application.post(prefix + "/contracts/example/tx/modify-assetminio", ensureObjectBody(this.txModifyAssetminio.bind(this)));
        application.post(prefix + "/contracts/example/tx/modify-dataoffer", ensureObjectBody(this.txModifyDataoffer.bind(this)));
        application.post(prefix + "/contracts/example/tx/modify-policy", ensureObjectBody(this.txModifyPolicy.bind(this)));
        application.post(prefix + "/contracts/example/tx/pause", ensureObjectBody(this.txPause.bind(this)));
        application.post(prefix + "/contracts/example/tx/register-asset", ensureObjectBody(this.txRegisterAsset.bind(this)));
        application.post(prefix + "/contracts/example/tx/register-assetminio", ensureObjectBody(this.txRegisterAssetminio.bind(this)));
        application.post(prefix + "/contracts/example/tx/register-contratto", ensureObjectBody(this.txRegisterContratto.bind(this)));
        application.post(prefix + "/contracts/example/tx/register-dataoffer", ensureObjectBody(this.txRegisterDataoffer.bind(this)));
        application.post(prefix + "/contracts/example/tx/register-policy", ensureObjectBody(this.txRegisterPolicy.bind(this)));
        application.post(prefix + "/contracts/example/tx/request-data-transfer", ensureObjectBody(this.txRequestDataTransfer.bind(this)));
        application.post(prefix + "/contracts/example/tx/unpause", ensureObjectBody(this.txUnpause.bind(this)));
        application.post(prefix + "/contracts/example/tx/update-contratto-state", ensureObjectBody(this.txUpdateContrattoState.bind(this)));
        application.post(prefix + "/contracts/example/tx/upgrade-to-and-call", ensureObjectBody(this.txUpgradeToAndCall.bind(this)));
    }

    /**
     * @typedef TxParamsExampleCompleteDataTransfer
     * @property {string} transferId.required - transferId
     * @property {string} dataHash.required - dataHash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     */

    /**
     * @typedef TxRequestExampleCompleteDataTransfer
     * @property {TxParamsExampleCompleteDataTransfer.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: completeDataTransfer
     * Smart contract: Example (ExampleContract)
     * Method signature: completeDataTransfer(string,bytes32)
     * Binding: TxCompleteDataTransfer
     * 
     * @route POST /contracts/example/tx/complete-data-transfer
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleCompleteDataTransfer.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txCompleteDataTransfer(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "string", "name": "transferId", "type": "string" }, { "internalType": "bytes32", "name": "dataHash", "type": "bytes32" }], "name": "completeDataTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.completeDataTransfer$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
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
     * @typedef TxParamsExampleModifyAsset
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} assetId.required - assetId
     * @property {string} newTitle.required - newTitle
     */

    /**
     * @typedef TxRequestExampleModifyAsset
     * @property {TxParamsExampleModifyAsset.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: modifyAsset
     * Smart contract: Example (ExampleContract)
     * Method signature: modifyAsset(bytes32,string,string)
     * Binding: TxModifyAsset
     * 
     * @route POST /contracts/example/tx/modify-asset
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleModifyAsset.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txModifyAsset(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "assetId", "type": "string" }, { "internalType": "string", "name": "newTitle", "type": "string" }], "name": "modifyAsset", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.modifyAsset$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsExampleModifyAssetminio
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} assetId.required - assetId
     * @property {string} newTitle.required - newTitle
     * @property {string} dataHash.required - dataHash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     */

    /**
     * @typedef TxRequestExampleModifyAssetminio
     * @property {TxParamsExampleModifyAssetminio.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: modifyAssetminio
     * Smart contract: Example (ExampleContract)
     * Method signature: modifyAssetminio(bytes32,string,string,bytes32)
     * Binding: TxModifyAssetminio
     * 
     * @route POST /contracts/example/tx/modify-assetminio
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleModifyAssetminio.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txModifyAssetminio(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "assetId", "type": "string" }, { "internalType": "string", "name": "newTitle", "type": "string" }, { "internalType": "bytes32", "name": "dataHash", "type": "bytes32" }], "name": "modifyAssetminio", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.modifyAssetminio$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsExampleModifyDataoffer
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} offerId.required - offerId
     * @property {string} newAccessPolicyId.required - newAccessPolicyId
     * @property {string} newContractPolicyId.required - newContractPolicyId
     * @property {string} newAssetSelector.required - newAssetSelector
     */

    /**
     * @typedef TxRequestExampleModifyDataoffer
     * @property {TxParamsExampleModifyDataoffer.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: modifyDataoffer
     * Smart contract: Example (ExampleContract)
     * Method signature: modifyDataoffer(bytes32,string,string,string,string)
     * Binding: TxModifyDataoffer
     * 
     * @route POST /contracts/example/tx/modify-dataoffer
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleModifyDataoffer.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txModifyDataoffer(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "offerId", "type": "string" }, { "internalType": "string", "name": "newAccessPolicyId", "type": "string" }, { "internalType": "string", "name": "newContractPolicyId", "type": "string" }, { "internalType": "string", "name": "newAssetSelector", "type": "string" }], "name": "modifyDataoffer", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.modifyDataoffer$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsExampleModifyPolicy
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} policyId.required - policyId
     * @property {string} newTitle.required - newTitle
     */

    /**
     * @typedef TxRequestExampleModifyPolicy
     * @property {TxParamsExampleModifyPolicy.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: modifyPolicy
     * Smart contract: Example (ExampleContract)
     * Method signature: modifyPolicy(bytes32,string,string)
     * Binding: TxModifyPolicy
     * 
     * @route POST /contracts/example/tx/modify-policy
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleModifyPolicy.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txModifyPolicy(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "policyId", "type": "string" }, { "internalType": "string", "name": "newTitle", "type": "string" }], "name": "modifyPolicy", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.modifyPolicy$txBuildDetails.call(wrapper, ...txParams);

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
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} assetId.required - assetId
     * @property {string} assetTitle.required - assetTitle
     */

    /**
     * @typedef TxRequestExampleRegisterAsset
     * @property {TxParamsExampleRegisterAsset.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: registerAsset
     * Smart contract: Example (ExampleContract)
     * Method signature: registerAsset(bytes32,string,string)
     * Binding: TxRegisterAsset
     * 
     * @route POST /contracts/example/tx/register-asset
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleRegisterAsset.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txRegisterAsset(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "assetId", "type": "string" }, { "internalType": "string", "name": "assetTitle", "type": "string" }], "name": "registerAsset", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

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
     * @typedef TxParamsExampleRegisterAssetminio
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} assetId.required - assetId
     * @property {string} assetTitle.required - assetTitle
     * @property {string} dataHash.required - dataHash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     */

    /**
     * @typedef TxRequestExampleRegisterAssetminio
     * @property {TxParamsExampleRegisterAssetminio.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: registerAssetminio
     * Smart contract: Example (ExampleContract)
     * Method signature: registerAssetminio(bytes32,string,string,bytes32)
     * Binding: TxRegisterAssetminio
     * 
     * @route POST /contracts/example/tx/register-assetminio
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleRegisterAssetminio.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txRegisterAssetminio(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "assetId", "type": "string" }, { "internalType": "string", "name": "assetTitle", "type": "string" }, { "internalType": "bytes32", "name": "dataHash", "type": "bytes32" }], "name": "registerAssetminio", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.registerAssetminio$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsExampleRegisterContratto
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} contractNegotiationId.required - contractNegotiationId
     * @property {string} counterpartyId.required - counterpartyId
     * @property {string} createdAt.required - createdAt - eg: 0
     * @property {string} state.required - state
     */

    /**
     * @typedef TxRequestExampleRegisterContratto
     * @property {TxParamsExampleRegisterContratto.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: registerContratto
     * Smart contract: Example (ExampleContract)
     * Method signature: registerContratto(bytes32,string,string,uint256,string)
     * Binding: TxRegisterContratto
     * 
     * @route POST /contracts/example/tx/register-contratto
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleRegisterContratto.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txRegisterContratto(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "contractNegotiationId", "type": "string" }, { "internalType": "string", "name": "counterpartyId", "type": "string" }, { "internalType": "uint256", "name": "createdAt", "type": "uint256" }, { "internalType": "string", "name": "state", "type": "string" }], "name": "registerContratto", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.registerContratto$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsExampleRegisterDataoffer
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} offerId.required - offerId
     * @property {string} offerAccessPolicyId.required - offerAccessPolicyId
     * @property {string} offerContractPolicyId.required - offerContractPolicyId
     * @property {string} offerAssetSelector.required - offerAssetSelector
     */

    /**
     * @typedef TxRequestExampleRegisterDataoffer
     * @property {TxParamsExampleRegisterDataoffer.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: registerDataoffer
     * Smart contract: Example (ExampleContract)
     * Method signature: registerDataoffer(bytes32,string,string,string,string)
     * Binding: TxRegisterDataoffer
     * 
     * @route POST /contracts/example/tx/register-dataoffer
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleRegisterDataoffer.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txRegisterDataoffer(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "offerId", "type": "string" }, { "internalType": "string", "name": "offerAccessPolicyId", "type": "string" }, { "internalType": "string", "name": "offerContractPolicyId", "type": "string" }, { "internalType": "string", "name": "offerAssetSelector", "type": "string" }], "name": "registerDataoffer", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.registerDataoffer$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsExampleRegisterPolicy
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} policyId.required - policyId
     * @property {string} policyTitle.required - policyTitle
     */

    /**
     * @typedef TxRequestExampleRegisterPolicy
     * @property {TxParamsExampleRegisterPolicy.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: registerPolicy
     * Smart contract: Example (ExampleContract)
     * Method signature: registerPolicy(bytes32,string,string)
     * Binding: TxRegisterPolicy
     * 
     * @route POST /contracts/example/tx/register-policy
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleRegisterPolicy.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txRegisterPolicy(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "policyId", "type": "string" }, { "internalType": "string", "name": "policyTitle", "type": "string" }], "name": "registerPolicy", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.registerPolicy$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsExampleRequestDataTransfer
     * @property {string} transferId.required - transferId
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} contractAgreementId.required - contractAgreementId
     * @property {string} statusout.required - statusout
     * @property {string} assetId.required - assetId
     */

    /**
     * @typedef TxRequestExampleRequestDataTransfer
     * @property {TxParamsExampleRequestDataTransfer.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: requestDataTransfer
     * Smart contract: Example (ExampleContract)
     * Method signature: requestDataTransfer(string,bytes32,string,string,string)
     * Binding: TxRequestDataTransfer
     * 
     * @route POST /contracts/example/tx/request-data-transfer
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleRequestDataTransfer.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txRequestDataTransfer(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "string", "name": "transferId", "type": "string" }, { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "contractAgreementId", "type": "string" }, { "internalType": "string", "name": "statusout", "type": "string" }, { "internalType": "string", "name": "assetId", "type": "string" }], "name": "requestDataTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.requestDataTransfer$txBuildDetails.call(wrapper, ...txParams);

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
     * @typedef TxParamsExampleUpdateContrattoState
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} contractNegotiationId.required - contractNegotiationId
     * @property {string} newState.required - newState
     */

    /**
     * @typedef TxRequestExampleUpdateContrattoState
     * @property {TxParamsExampleUpdateContrattoState.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: updateContrattoState
     * Smart contract: Example (ExampleContract)
     * Method signature: updateContrattoState(bytes32,string,string)
     * Binding: TxUpdateContrattoState
     * 
     * @route POST /contracts/example/tx/update-contratto-state
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {TxRequestExampleUpdateContrattoState.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txUpdateContrattoState(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "internalType": "string", "name": "contractNegotiationId", "type": "string" }, { "internalType": "string", "name": "newState", "type": "string" }], "name": "updateContrattoState", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().example;

        const txBuildData = wrapper.updateContrattoState$txBuildDetails.call(wrapper, ...txParams);

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
