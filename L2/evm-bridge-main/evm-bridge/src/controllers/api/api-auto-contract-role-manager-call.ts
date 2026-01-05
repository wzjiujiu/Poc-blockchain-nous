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
import { Monitor } from "../../monitor";
import { BAD_REQUEST, NOT_FOUND, ensureObjectBody, sendApiError, sendApiResult } from "../../utils/http-utils";
import { SmartContractsConfig } from "../../config/config-smart-contracts";
import { normalizeAndValidateInputParameters, serializeOutputABIParams } from "../../utils/blockchain";

/**
 * Auto generated smart contract API
 * Contract RoleManager (RoleManager)
 * This file contains the API for calling smart contract view / pure methods
 * @group role_manager - API for smart contract: RoleManager (RoleManager)
 */
export class RoleManagerContractApiCallController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.post(prefix + "/contracts/role-manager/call/upgrade-interface-version", ensureObjectBody(this.callUPGRADE_INTERFACE_VERSION.bind(this)));
        application.post(prefix + "/contracts/role-manager/call/get-initialized-version", ensureObjectBody(this.callGetInitializedVersion.bind(this)));
        application.post(prefix + "/contracts/role-manager/call/has-role", ensureObjectBody(this.callHasRole.bind(this)));
        application.post(prefix + "/contracts/role-manager/call/has-role-explicit", ensureObjectBody(this.callHasRoleExplicit.bind(this)));
        application.post(prefix + "/contracts/role-manager/call/is-admin", ensureObjectBody(this.callIsAdmin.bind(this)));
        application.post(prefix + "/contracts/role-manager/call/paused", ensureObjectBody(this.callPaused.bind(this)));
        application.post(prefix + "/contracts/role-manager/call/proxiable-uuid", ensureObjectBody(this.callProxiableUUID.bind(this)));
    }

    /**
     * @typedef CallResponseRoleManagerUPGRADE_INTERFACE_VERSION
     * @property {string} _0.required - _0
     */

    /**
     * Calls the view method: UPGRADE_INTERFACE_VERSION
     * Smart contract: RoleManager (RoleManager)
     * Method signature: UPGRADE_INTERFACE_VERSION()
     * Binding: CallUPGRADE_INTERFACE_VERSION
     * 
     * @route POST /contracts/role-manager/call/upgrade-interface-version
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @returns {CallResponseRoleManagerUPGRADE_INTERFACE_VERSION.model} 200 - OK
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

        const wrapper = SmartContractsConfig.getInstance().roleManager;

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
     * @typedef CallResponseRoleManagerGetInitializedVersion
     * @property {string} v.required - The current initialized version - eg: 0
     */

    /**
     * Calls the view method: getInitializedVersion
     * Smart contract: RoleManager (RoleManager)
     * Method signature: getInitializedVersion()
     * Binding: CallGetInitializedVersion
     * Gets the current initialized version Use this method to figure out the last deployed version of the contract
     * @route POST /contracts/role-manager/call/get-initialized-version
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @returns {CallResponseRoleManagerGetInitializedVersion.model} 200 - OK
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

        const wrapper = SmartContractsConfig.getInstance().roleManager;

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
     * @typedef CallRequestRoleManagerHasRole
     * @property {string} account.required - The account address - eg: 0x0000000000000000000000000000000000000000
     * @property {string} role.required - The role to assign - eg: 0
     */

    /**
     * @typedef CallResponseRoleManagerHasRole
     * @property {boolean} assigned.required - True in case the role is assigned, false if the role is not assigned to the account
     */

    /**
     * Calls the view method: hasRole
     * Smart contract: RoleManager (RoleManager)
     * Method signature: hasRole(address,uint8)
     * Binding: CallHasRole
     * Checks if an account has a role (or has the role ADMIN)
     * @route POST /contracts/role-manager/call/has-role
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {CallRequestRoleManagerHasRole.model} request.body.required - Request body
     * @returns {CallResponseRoleManagerHasRole.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callHasRole(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "enum ROLES", "name": "role", "type": "uint8" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "assigned", "type": "bool" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().roleManager;

        let result: any;
        try {
            const callResult = await wrapper.hasRole.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallRequestRoleManagerHasRoleExplicit
     * @property {string} account.required - The account address - eg: 0x0000000000000000000000000000000000000000
     * @property {string} role.required - The role to assign - eg: 0
     */

    /**
     * @typedef CallResponseRoleManagerHasRoleExplicit
     * @property {boolean} assigned.required - True in case the role is assigned, false if the role is not assigned to the account
     */

    /**
     * Calls the view method: hasRoleExplicit
     * Smart contract: RoleManager (RoleManager)
     * Method signature: hasRoleExplicit(address,uint8)
     * Binding: CallHasRoleExplicit
     * Checks if an account has a role (explicit, won't check for ADMIN role)
     * @route POST /contracts/role-manager/call/has-role-explicit
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {CallRequestRoleManagerHasRoleExplicit.model} request.body.required - Request body
     * @returns {CallResponseRoleManagerHasRoleExplicit.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callHasRoleExplicit(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "enum ROLES", "name": "role", "type": "uint8" }], "name": "hasRoleExplicit", "outputs": [{ "internalType": "bool", "name": "assigned", "type": "bool" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().roleManager;

        let result: any;
        try {
            const callResult = await wrapper.hasRoleExplicit.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallRequestRoleManagerIsAdmin
     * @property {string} account.required - The account address - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef CallResponseRoleManagerIsAdmin
     * @property {boolean} admin.required - True is the account has the ADMIN role
     */

    /**
     * Calls the view method: isAdmin
     * Smart contract: RoleManager (RoleManager)
     * Method signature: isAdmin(address)
     * Binding: CallIsAdmin
     * Checks if an account has the ADMIN role
     * @route POST /contracts/role-manager/call/is-admin
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {CallRequestRoleManagerIsAdmin.model} request.body.required - Request body
     * @returns {CallResponseRoleManagerIsAdmin.model} 200 - OK
     * @returns {void} 400 - Invalid parameters
     * @returns {void} 404 - Error calling the method
     * @security BearerAuthorization
     */
    public async callIsAdmin(request: Express.Request, response: Express.Response) {
        const methodAbi = { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isAdmin", "outputs": [{ "internalType": "bool", "name": "admin", "type": "bool" }], "stateMutability": "view", "type": "function" };

        const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);

        if (!validParams) {
            sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);
            return;
        }

        const wrapper = SmartContractsConfig.getInstance().roleManager;

        let result: any;
        try {
            const callResult = await wrapper.isAdmin.call(wrapper, ...callParams);

            result = serializeOutputABIParams([callResult], methodAbi);
        } catch (ex) {
            Monitor.debugException(ex)
            sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);
            return;
        }

        sendApiResult(request, response, result);
    }
    /**
     * @typedef CallResponseRoleManagerPaused
     * @property {boolean} _0.required - bool True if paused, false otherwise
     */

    /**
     * Calls the view method: paused
     * Smart contract: RoleManager (RoleManager)
     * Method signature: paused()
     * Binding: CallPaused
     * Checks if the smart contract is paused
     * @route POST /contracts/role-manager/call/paused
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @returns {CallResponseRoleManagerPaused.model} 200 - OK
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

        const wrapper = SmartContractsConfig.getInstance().roleManager;

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
     * @typedef CallResponseRoleManagerProxiableUUID
     * @property {string} _0.required - _0 - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     */

    /**
     * Calls the view method: proxiableUUID
     * Smart contract: RoleManager (RoleManager)
     * Method signature: proxiableUUID()
     * Binding: CallProxiableUUID
     * 
     * @route POST /contracts/role-manager/call/proxiable-uuid
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @returns {CallResponseRoleManagerProxiableUUID.model} 200 - OK
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

        const wrapper = SmartContractsConfig.getInstance().roleManager;

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
