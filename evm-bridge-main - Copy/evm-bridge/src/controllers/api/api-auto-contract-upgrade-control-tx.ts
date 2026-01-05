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

// Smart contract synchronizer for UpgradeControl
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
 * Contract UpgradeControl (UpgradeControl)
 * This file contains the API for calling smart contract transaction methods
 * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
 */
export class UpgradeControlContractApiTxController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.post(prefix + "/contracts/upgrade-control/tx/initialize", ensureObjectBody(this.txInitialize.bind(this)));
        application.post(prefix + "/contracts/upgrade-control/tx/pause", ensureObjectBody(this.txPause.bind(this)));
        application.post(prefix + "/contracts/upgrade-control/tx/unpause", ensureObjectBody(this.txUnpause.bind(this)));
        application.post(prefix + "/contracts/upgrade-control/tx/upgrade-contract", ensureObjectBody(this.txUpgradeContract.bind(this)));
        application.post(prefix + "/contracts/upgrade-control/tx/upgrade-contract-and-call", ensureObjectBody(this.txUpgradeContractAndCall.bind(this)));
        application.post(prefix + "/contracts/upgrade-control/tx/upgrade-to-and-call", ensureObjectBody(this.txUpgradeToAndCall.bind(this)));
    }

    /**
     * @typedef TxParamsUpgradeControlInitialize
     * @property {string} roleManagerAddress.required - The address of the role manager smart contract - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef TxRequestUpgradeControlInitialize
     * @property {TxParamsUpgradeControlInitialize.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: initialize
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: initialize(address)
     * Binding: TxInitialize
     * Initializes the smart contract
     * @route POST /contracts/upgrade-control/tx/initialize
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {TxRequestUpgradeControlInitialize.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txInitialize(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "roleManagerAddress", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().upgradeControl;

        const txBuildData = wrapper.initialize$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxRequestUpgradeControlPause
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: pause
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: pause()
     * Binding: TxPause
     * Pauses the smart contract Requires ADMIN role
     * @route POST /contracts/upgrade-control/tx/pause
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {TxRequestUpgradeControlPause.model} request.body.required - Request body
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

        const wrapper = SmartContractsConfig.getInstance().upgradeControl;

        const txBuildData = wrapper.pause$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxRequestUpgradeControlUnpause
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: unpause
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: unpause()
     * Binding: TxUnpause
     * Unpauses the smart contract Requires ADMIN role
     * @route POST /contracts/upgrade-control/tx/unpause
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {TxRequestUpgradeControlUnpause.model} request.body.required - Request body
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

        const wrapper = SmartContractsConfig.getInstance().upgradeControl;

        const txBuildData = wrapper.unpause$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsUpgradeControlUpgradeContract
     * @property {string} proxy.required - The address of the proxy contract - eg: 0x0000000000000000000000000000000000000000
     * @property {string} implementation.required - The address of the implementation contract - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef TxRequestUpgradeControlUpgradeContract
     * @property {TxParamsUpgradeControlUpgradeContract.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: upgradeContract
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: upgradeContract(address,address)
     * Binding: TxUpgradeContract
     * Upgrades a smart contract Requires ADMIN role
     * @route POST /contracts/upgrade-control/tx/upgrade-contract
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {TxRequestUpgradeControlUpgradeContract.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txUpgradeContract(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "proxy", "type": "address" }, { "internalType": "address", "name": "implementation", "type": "address" }], "name": "upgradeContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().upgradeControl;

        const txBuildData = wrapper.upgradeContract$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsUpgradeControlUpgradeContractAndCall
     * @property {string} proxy.required - The address of the proxy contract - eg: 0x0000000000000000000000000000000000000000
     * @property {string} implementation.required - The address of the implementation contract - eg: 0x0000000000000000000000000000000000000000
     * @property {string} callData.required - The callData of the re-initializer - eg: 0x
     */

    /**
     * @typedef TxRequestUpgradeControlUpgradeContractAndCall
     * @property {TxParamsUpgradeControlUpgradeContractAndCall.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: upgradeContractAndCall
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: upgradeContractAndCall(address,address,bytes)
     * Binding: TxUpgradeContractAndCall
     * Upgrades a smart contract and calls a re-initializer Requires ADMIN role
     * @route POST /contracts/upgrade-control/tx/upgrade-contract-and-call
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {TxRequestUpgradeControlUpgradeContractAndCall.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txUpgradeContractAndCall(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "proxy", "type": "address" }, { "internalType": "address", "name": "implementation", "type": "address" }, { "internalType": "bytes", "name": "callData", "type": "bytes" }], "name": "upgradeContractAndCall", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().upgradeControl;

        const txBuildData = wrapper.upgradeContractAndCall$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsUpgradeControlUpgradeToAndCall
     * @property {string} newImplementation.required - newImplementation - eg: 0x0000000000000000000000000000000000000000
     * @property {string} data.required - data - eg: 0x
     */

    /**
     * @typedef TxRequestUpgradeControlUpgradeToAndCall
     * @property {TxParamsUpgradeControlUpgradeToAndCall.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: upgradeToAndCall
     * Smart contract: UpgradeControl (UpgradeControl)
     * Method signature: upgradeToAndCall(address,bytes)
     * Binding: TxUpgradeToAndCall
     * 
     * @route POST /contracts/upgrade-control/tx/upgrade-to-and-call
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {TxRequestUpgradeControlUpgradeToAndCall.model} request.body.required - Request body
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

        const wrapper = SmartContractsConfig.getInstance().upgradeControl;

        const txBuildData = wrapper.upgradeToAndCall$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
}
