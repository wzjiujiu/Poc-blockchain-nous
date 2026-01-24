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
import { noCache, sendApiError, sendApiResult, sendApiSuccess } from "../../utils/http-utils";
import { parsePaginationParameters } from "../../utils/pagination";
import { DataFilter } from "tsbean-orm";
import { EventUpgradeControlContractUpgraded } from "../../models/event-sync/upgrade-control/contract-upgraded";
import { EventUpgradeControlInitialized } from "../../models/event-sync/upgrade-control/initialized";
import { EventUpgradeControlPaused } from "../../models/event-sync/upgrade-control/paused";
import { EventUpgradeControlUnpaused } from "../../models/event-sync/upgrade-control/unpaused";
import { EventUpgradeControlUpgraded } from "../../models/event-sync/upgrade-control/upgraded";
import { serializeEventABIParams, normalizeAddress } from "../../utils/blockchain";

/**
 * Auto generated smart contract API
 * Contract UpgradeControl (UpgradeControl)
 * This file contains the API for fetching events
 * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
 */
export class UpgradeControlContractApiEventsController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.get(prefix + "/contracts/upgrade-control/events/contract-upgraded", noCache(this.getEventsContractUpgraded.bind(this)));
        application.get(prefix + "/contracts/upgrade-control/events/initialized", noCache(this.getEventsInitialized.bind(this)));
        application.get(prefix + "/contracts/upgrade-control/events/paused", noCache(this.getEventsPaused.bind(this)));
        application.get(prefix + "/contracts/upgrade-control/events/unpaused", noCache(this.getEventsUnpaused.bind(this)));
        application.get(prefix + "/contracts/upgrade-control/events/upgraded", noCache(this.getEventsUpgraded.bind(this)));
    }

    /**
     * @typedef EventParamsUpgradeControlContractUpgraded
     * @property {string} proxy.required - The address of the proxy contract - eg: 0x0000000000000000000000000000000000000000
     * @property {string} implementation.required - The address of the implementation contract - eg: 0x0000000000000000000000000000000000000000
     * @property {string} by.required - The address of the administrator who made the upgrade - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemUpgradeControlContractUpgraded
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsUpgradeControlContractUpgraded.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListUpgradeControlContractUpgraded
     * @property {Array.<EventItemUpgradeControlContractUpgraded>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type ContractUpgraded
     * Smart contract: UpgradeControl (UpgradeControl)
     * Event signature: ContractUpgraded(address,address,address)
     * Binding: GetEventsContractUpgraded
     * ContractUpgraded - A smart contract was upgraded
     * @route GET /contracts/upgrade-control/events/contract-upgraded
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListUpgradeControlContractUpgraded.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsContractUpgraded(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "proxy", "type": "address" }, { "indexed": false, "internalType": "address", "name": "implementation", "type": "address" }, { "indexed": false, "internalType": "address", "name": "by", "type": "address" }], "name": "ContractUpgraded", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventUpgradeControlContractUpgraded>[] = [];

        const [events, nextContinuationToken] = await EventUpgradeControlContractUpgraded.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsUpgradeControlInitialized
     * @property {string} version.required - version - eg: 0
     */

    /**
     * @typedef EventItemUpgradeControlInitialized
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsUpgradeControlInitialized.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListUpgradeControlInitialized
     * @property {Array.<EventItemUpgradeControlInitialized>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Initialized
     * Smart contract: UpgradeControl (UpgradeControl)
     * Event signature: Initialized(uint64)
     * Binding: GetEventsInitialized
     * @route GET /contracts/upgrade-control/events/initialized
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListUpgradeControlInitialized.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsInitialized(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint64", "name": "version", "type": "uint64" }], "name": "Initialized", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventUpgradeControlInitialized>[] = [];

        const [events, nextContinuationToken] = await EventUpgradeControlInitialized.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsUpgradeControlPaused
     * @property {string} by.required - The administrator who paused the smart contract - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemUpgradeControlPaused
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsUpgradeControlPaused.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListUpgradeControlPaused
     * @property {Array.<EventItemUpgradeControlPaused>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Paused
     * Smart contract: UpgradeControl (UpgradeControl)
     * Event signature: Paused(address)
     * Binding: GetEventsPaused
     * Paused - The smart contract was paused
     * @route GET /contracts/upgrade-control/events/paused
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListUpgradeControlPaused.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsPaused(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "by", "type": "address" }], "name": "Paused", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventUpgradeControlPaused>[] = [];

        const [events, nextContinuationToken] = await EventUpgradeControlPaused.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsUpgradeControlUnpaused
     * @property {string} by.required - The administrator who paused the smart contract - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemUpgradeControlUnpaused
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsUpgradeControlUnpaused.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListUpgradeControlUnpaused
     * @property {Array.<EventItemUpgradeControlUnpaused>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Unpaused
     * Smart contract: UpgradeControl (UpgradeControl)
     * Event signature: Unpaused(address)
     * Binding: GetEventsUnpaused
     * Paused - The smart contract was paused
     * @route GET /contracts/upgrade-control/events/unpaused
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListUpgradeControlUnpaused.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsUnpaused(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "by", "type": "address" }], "name": "Unpaused", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventUpgradeControlUnpaused>[] = [];

        const [events, nextContinuationToken] = await EventUpgradeControlUnpaused.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsUpgradeControlUpgraded
     * @property {string} implementation.required - implementation - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemUpgradeControlUpgraded
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsUpgradeControlUpgraded.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListUpgradeControlUpgraded
     * @property {Array.<EventItemUpgradeControlUpgraded>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Upgraded
     * Smart contract: UpgradeControl (UpgradeControl)
     * Event signature: Upgraded(address)
     * Binding: GetEventsUpgraded
     * @route GET /contracts/upgrade-control/events/upgraded
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pImplementation.query - Filter event with a value for the parameter 'implementation' equal than the one specified.
     * @returns {EventListUpgradeControlUpgraded.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsUpgraded(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "Upgraded", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventUpgradeControlUpgraded>[] = [];

        if (request.query.filter_eq_pImplementation !== undefined && request.query.filter_eq_pImplementation !== null) {
            filters.push(DataFilter.equals("pImplementation", normalizeAddress(request.query.filter_eq_pImplementation + "")));
        }

        const [events, nextContinuationToken] = await EventUpgradeControlUpgraded.findPaginated(filters, limit, continuationToken);

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
