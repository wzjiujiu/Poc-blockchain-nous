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
import { noCache, sendApiError, sendApiResult, sendApiSuccess } from "../../utils/http-utils";
import { parsePaginationParameters } from "../../utils/pagination";
import { DataFilter } from "tsbean-orm";
import { EventRoleManagerInitialized } from "../../models/event-sync/role-manager/initialized";
import { EventRoleManagerPaused } from "../../models/event-sync/role-manager/paused";
import { EventRoleManagerRoleAssigned } from "../../models/event-sync/role-manager/role-assigned";
import { EventRoleManagerRoleRevoked } from "../../models/event-sync/role-manager/role-revoked";
import { EventRoleManagerUnpaused } from "../../models/event-sync/role-manager/unpaused";
import { EventRoleManagerUpgraded } from "../../models/event-sync/role-manager/upgraded";
import { serializeEventABIParams, normalizeAddress } from "../../utils/blockchain";

/**
 * Auto generated smart contract API
 * Contract RoleManager (RoleManager)
 * This file contains the API for fetching events
 * @group role_manager - API for smart contract: RoleManager (RoleManager)
 */
export class RoleManagerContractApiEventsController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.get(prefix + "/contracts/role-manager/events/initialized", noCache(this.getEventsInitialized.bind(this)));
        application.get(prefix + "/contracts/role-manager/events/paused", noCache(this.getEventsPaused.bind(this)));
        application.get(prefix + "/contracts/role-manager/events/role-assigned", noCache(this.getEventsRoleAssigned.bind(this)));
        application.get(prefix + "/contracts/role-manager/events/role-revoked", noCache(this.getEventsRoleRevoked.bind(this)));
        application.get(prefix + "/contracts/role-manager/events/unpaused", noCache(this.getEventsUnpaused.bind(this)));
        application.get(prefix + "/contracts/role-manager/events/upgraded", noCache(this.getEventsUpgraded.bind(this)));
    }

    /**
     * @typedef EventParamsRoleManagerInitialized
     * @property {string} version.required - version - eg: 0
     */

    /**
     * @typedef EventItemRoleManagerInitialized
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsRoleManagerInitialized.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListRoleManagerInitialized
     * @property {Array.<EventItemRoleManagerInitialized>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Initialized
     * Smart contract: RoleManager (RoleManager)
     * Event signature: Initialized(uint64)
     * Binding: GetEventsInitialized
     * @route GET /contracts/role-manager/events/initialized
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListRoleManagerInitialized.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsInitialized(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint64", "name": "version", "type": "uint64" }], "name": "Initialized", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventRoleManagerInitialized>[] = [];

        const [events, nextContinuationToken] = await EventRoleManagerInitialized.findPaginated(filters, limit, continuationToken);

        sendApiResult(request, response, {
            events: events.map(e => {
                return {
                    id: e.id,
                    block: e.block,
                    timestamp: e.timestamp,
                    eventIndex: e.eventIndex,
                    tx: e.tx,
                    parameters: serializeEventABIParams(e.getParametersArray(), eventAbi),
                };
            }),
            continuationToken: nextContinuationToken,
        });
    }
    /**
     * @typedef EventParamsRoleManagerPaused
     * @property {string} by.required - The administrator who paused the smart contract - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemRoleManagerPaused
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsRoleManagerPaused.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListRoleManagerPaused
     * @property {Array.<EventItemRoleManagerPaused>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Paused
     * Smart contract: RoleManager (RoleManager)
     * Event signature: Paused(address)
     * Binding: GetEventsPaused
     * Paused - The smart contract was paused
     * @route GET /contracts/role-manager/events/paused
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListRoleManagerPaused.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsPaused(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "by", "type": "address" }], "name": "Paused", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventRoleManagerPaused>[] = [];

        const [events, nextContinuationToken] = await EventRoleManagerPaused.findPaginated(filters, limit, continuationToken);

        sendApiResult(request, response, {
            events: events.map(e => {
                return {
                    id: e.id,
                    block: e.block,
                    timestamp: e.timestamp,
                    eventIndex: e.eventIndex,
                    tx: e.tx,
                    parameters: serializeEventABIParams(e.getParametersArray(), eventAbi),
                };
            }),
            continuationToken: nextContinuationToken,
        });
    }
    /**
     * @typedef EventParamsRoleManagerRoleAssigned
     * @property {string} account.required - - The account - eg: 0x0000000000000000000000000000000000000000
     * @property {string} role.required - - The role - eg: 0
     * @property {string} by.required - - The address of the administrator who set the role - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemRoleManagerRoleAssigned
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsRoleManagerRoleAssigned.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListRoleManagerRoleAssigned
     * @property {Array.<EventItemRoleManagerRoleAssigned>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type RoleAssigned
     * Smart contract: RoleManager (RoleManager)
     * Event signature: RoleAssigned(address,uint8,address)
     * Binding: GetEventsRoleAssigned
     * RoleAssigned - A role was assigned to an account
     * @route GET /contracts/role-manager/events/role-assigned
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListRoleManagerRoleAssigned.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsRoleAssigned(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "enum ROLES", "name": "role", "type": "uint8" }, { "indexed": false, "internalType": "address", "name": "by", "type": "address" }], "name": "RoleAssigned", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventRoleManagerRoleAssigned>[] = [];

        const [events, nextContinuationToken] = await EventRoleManagerRoleAssigned.findPaginated(filters, limit, continuationToken);

        sendApiResult(request, response, {
            events: events.map(e => {
                return {
                    id: e.id,
                    block: e.block,
                    timestamp: e.timestamp,
                    eventIndex: e.eventIndex,
                    tx: e.tx,
                    parameters: serializeEventABIParams(e.getParametersArray(), eventAbi),
                };
            }),
            continuationToken: nextContinuationToken,
        });
    }
    /**
     * @typedef EventParamsRoleManagerRoleRevoked
     * @property {string} account.required - The account - eg: 0x0000000000000000000000000000000000000000
     * @property {string} role.required - The role - eg: 0
     * @property {string} by.required - The address of the administrator who revoked the role - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemRoleManagerRoleRevoked
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsRoleManagerRoleRevoked.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListRoleManagerRoleRevoked
     * @property {Array.<EventItemRoleManagerRoleRevoked>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type RoleRevoked
     * Smart contract: RoleManager (RoleManager)
     * Event signature: RoleRevoked(address,uint8,address)
     * Binding: GetEventsRoleRevoked
     * RoleRevoked - A role was revoked
     * @route GET /contracts/role-manager/events/role-revoked
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListRoleManagerRoleRevoked.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsRoleRevoked(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "enum ROLES", "name": "role", "type": "uint8" }, { "indexed": false, "internalType": "address", "name": "by", "type": "address" }], "name": "RoleRevoked", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventRoleManagerRoleRevoked>[] = [];

        const [events, nextContinuationToken] = await EventRoleManagerRoleRevoked.findPaginated(filters, limit, continuationToken);

        sendApiResult(request, response, {
            events: events.map(e => {
                return {
                    id: e.id,
                    block: e.block,
                    timestamp: e.timestamp,
                    eventIndex: e.eventIndex,
                    tx: e.tx,
                    parameters: serializeEventABIParams(e.getParametersArray(), eventAbi),
                };
            }),
            continuationToken: nextContinuationToken,
        });
    }
    /**
     * @typedef EventParamsRoleManagerUnpaused
     * @property {string} by.required - The administrator who paused the smart contract - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemRoleManagerUnpaused
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsRoleManagerUnpaused.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListRoleManagerUnpaused
     * @property {Array.<EventItemRoleManagerUnpaused>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Unpaused
     * Smart contract: RoleManager (RoleManager)
     * Event signature: Unpaused(address)
     * Binding: GetEventsUnpaused
     * Paused - The smart contract was paused
     * @route GET /contracts/role-manager/events/unpaused
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListRoleManagerUnpaused.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsUnpaused(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "by", "type": "address" }], "name": "Unpaused", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventRoleManagerUnpaused>[] = [];

        const [events, nextContinuationToken] = await EventRoleManagerUnpaused.findPaginated(filters, limit, continuationToken);

        sendApiResult(request, response, {
            events: events.map(e => {
                return {
                    id: e.id,
                    block: e.block,
                    timestamp: e.timestamp,
                    eventIndex: e.eventIndex,
                    tx: e.tx,
                    parameters: serializeEventABIParams(e.getParametersArray(), eventAbi),
                };
            }),
            continuationToken: nextContinuationToken,
        });
    }
    /**
     * @typedef EventParamsRoleManagerUpgraded
     * @property {string} implementation.required - implementation - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemRoleManagerUpgraded
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsRoleManagerUpgraded.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListRoleManagerUpgraded
     * @property {Array.<EventItemRoleManagerUpgraded>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Upgraded
     * Smart contract: RoleManager (RoleManager)
     * Event signature: Upgraded(address)
     * Binding: GetEventsUpgraded
     * @route GET /contracts/role-manager/events/upgraded
     * @group role_manager - API for smart contract: RoleManager (RoleManager)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pImplementation.query - Filter event with a value for the parameter 'implementation' equal than the one specified.
     * @returns {EventListRoleManagerUpgraded.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsUpgraded(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "Upgraded", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventRoleManagerUpgraded>[] = [];

        if (request.query.filter_eq_pImplementation !== undefined && request.query.filter_eq_pImplementation !== null) {
            filters.push(DataFilter.equals("pImplementation", normalizeAddress(request.query.filter_eq_pImplementation + "")));
        }

        const [events, nextContinuationToken] = await EventRoleManagerUpgraded.findPaginated(filters, limit, continuationToken);

        sendApiResult(request, response, {
            events: events.map(e => {
                return {
                    id: e.id,
                    block: e.block,
                    timestamp: e.timestamp,
                    eventIndex: e.eventIndex,
                    tx: e.tx,
                    parameters: serializeEventABIParams(e.getParametersArray(), eventAbi),
                };
            }),
            continuationToken: nextContinuationToken,
        });
    }
}
