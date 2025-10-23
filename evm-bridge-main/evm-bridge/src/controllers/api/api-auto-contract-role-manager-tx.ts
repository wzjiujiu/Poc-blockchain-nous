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

// Smart contract synchronizer for RoleManager
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
 * Contract RoleManager (RoleManager)
 * This file contains the API for calling smart contract transaction methods
 * @group role_manager - API for smart contract: RoleManager (RoleManager)
 */
export class RoleManagerContractApiTxController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.post(prefix + "/contracts/role-manager/tx/assign-role", ensureObjectBody(this.txAssignRole.bind(this)));
        application.post(prefix + "/contracts/role-manager/tx/initialize", ensureObjectBody(this.txInitialize.bind(this)));
        application.post(prefix + "/contracts/role-manager/tx/pause", ensureObjectBody(this.txPause.bind(this)));
        application.post(prefix + "/contracts/role-manager/tx/revoke-role", ensureObjectBody(this.txRevokeRole.bind(this)));
        application.post(prefix + "/contracts/role-manager/tx/unpause", ensureObjectBody(this.txUnpause.bind(this)));
        application.post(prefix + "/contracts/role-manager/tx/upgrade-to-and-call", ensureObjectBody(this.txUpgradeToAndCall.bind(this)));
    }

    /**
     * @typedef TxParamsRoleManagerAssignRole
     * @property {string} account.required - The account address - eg: 0x0000000000000000000000000000000000000000
     * @property {string} role.required - The role to assign - eg: 0
     */

    /**
     * @typedef TxRequestRoleManagerAssignRole
     * @property {TxParamsRoleManagerAssignRole.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: assignRole
     * Smart contract: RoleManager (RoleManager)
     * Method signature: assignRole(address,uint8)
     * Binding: TxAssignRole
     * Assigns a role to an account Can only be called by accounts with the ADMIN role
     * @route POST /contracts/role-manager/tx/assign-role
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {TxRequestRoleManagerAssignRole.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txAssignRole(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "enum ROLES", "name": "role", "type": "uint8" }], "name": "assignRole", "outputs": [{ "internalType": "bool", "name": "assigned", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().roleManager;

        const txBuildData = wrapper.assignRole$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsRoleManagerInitialize
     * @property {string} upgradeControlAddress.required - The address of the upgrade control smart contract - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef TxRequestRoleManagerInitialize
     * @property {TxParamsRoleManagerInitialize.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: initialize
     * Smart contract: RoleManager (RoleManager)
     * Method signature: initialize(address)
     * Binding: TxInitialize
     * Initializes the smart contract
     * @route POST /contracts/role-manager/tx/initialize
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {TxRequestRoleManagerInitialize.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txInitialize(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "upgradeControlAddress", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().roleManager;

        const txBuildData = wrapper.initialize$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxRequestRoleManagerPause
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: pause
     * Smart contract: RoleManager (RoleManager)
     * Method signature: pause()
     * Binding: TxPause
     * Pauses the smart contract Requires ADMIN role
     * @route POST /contracts/role-manager/tx/pause
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {TxRequestRoleManagerPause.model} request.body.required - Request body
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

        const wrapper = SmartContractsConfig.getInstance().roleManager;

        const txBuildData = wrapper.pause$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsRoleManagerRevokeRole
     * @property {string} account.required - The account address - eg: 0x0000000000000000000000000000000000000000
     * @property {string} role.required - The role to revoke - eg: 0
     */

    /**
     * @typedef TxRequestRoleManagerRevokeRole
     * @property {TxParamsRoleManagerRevokeRole.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: revokeRole
     * Smart contract: RoleManager (RoleManager)
     * Method signature: revokeRole(address,uint8)
     * Binding: TxRevokeRole
     * Revokes a role from an account Can only be called by accounts with the ADMIN role
     * @route POST /contracts/role-manager/tx/revoke-role
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {TxRequestRoleManagerRevokeRole.model} request.body.required - Request body
     * @returns {TxResponse.model} 200 - Transaction result
     * @returns {TxBadRequest.model} 400 - Bad request
     * @returns {TxSigningForbiddenResponse.model} 403 - Access denied
     * @security BearerAuthorization
     */
    public async txRevokeRole(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "enum ROLES", "name": "role", "type": "uint8" }], "name": "revokeRole", "outputs": [{ "internalType": "bool", "name": "revoked", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" };

        const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().roleManager;

        const txBuildData = wrapper.revokeRole$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxRequestRoleManagerUnpause
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: unpause
     * Smart contract: RoleManager (RoleManager)
     * Method signature: unpause()
     * Binding: TxUnpause
     * Unpauses the smart contract Requires ADMIN role
     * @route POST /contracts/role-manager/tx/unpause
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {TxRequestRoleManagerUnpause.model} request.body.required - Request body
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

        const wrapper = SmartContractsConfig.getInstance().roleManager;

        const txBuildData = wrapper.unpause$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
    /**
     * @typedef TxParamsRoleManagerUpgradeToAndCall
     * @property {string} newImplementation.required - newImplementation - eg: 0x0000000000000000000000000000000000000000
     * @property {string} data.required - data - eg: 0x
     */

    /**
     * @typedef TxRequestRoleManagerUpgradeToAndCall
     * @property {TxParamsRoleManagerUpgradeToAndCall.model} parameters.required - Transaction parameters
     * @property {TxSigningOptions.model} txSign.required - Transaction signing options
     */

    /**
     * Sends transaction for method: upgradeToAndCall
     * Smart contract: RoleManager (RoleManager)
     * Method signature: upgradeToAndCall(address,bytes)
     * Binding: TxUpgradeToAndCall
     * 
     * @route POST /contracts/role-manager/tx/upgrade-to-and-call
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {TxRequestRoleManagerUpgradeToAndCall.model} request.body.required - Request body
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

        const wrapper = SmartContractsConfig.getInstance().roleManager;

        const txBuildData = wrapper.upgradeToAndCall$txBuildDetails.call(wrapper, ...txParams);

        await handleTransactionSending(request, response, txBuildData, wrapper.address);
    }
}
