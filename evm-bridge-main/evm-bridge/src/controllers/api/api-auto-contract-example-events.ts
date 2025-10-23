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
import { noCache, sendApiResult } from "../../utils/http-utils";
import { parsePaginationParameters } from "../../utils/pagination";
import { DataFilter } from "tsbean-orm";
import { EventExampleInitialized } from "../../models/event-sync/example/initialized";
import { EventExamplePaused } from "../../models/event-sync/example/paused";
import { EventExampleTestEvent } from "../../models/event-sync/example/test-event";
import { EventExampleUnpaused } from "../../models/event-sync/example/unpaused";
import { EventExampleUpgraded } from "../../models/event-sync/example/upgraded";
import { serializeEventABIParams, normalizeDatabaseUint256, normalizeAddress } from "../../utils/blockchain";
import { parseBigInteger } from "../../utils/bigint";

/**
 * Auto generated smart contract API
 * Contract Example (ExampleContract)
 * This file contains the API for fetching events
 * @group example - API for smart contract: Example (ExampleContract)
 */
export class ExampleContractApiEventsController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.get(prefix + "/contracts/example/events/initialized", noCache(this.getEventsInitialized.bind(this)));
        application.get(prefix + "/contracts/example/events/paused", noCache(this.getEventsPaused.bind(this)));
        application.get(prefix + "/contracts/example/events/test-event", noCache(this.getEventsTestEvent.bind(this)));
        application.get(prefix + "/contracts/example/events/unpaused", noCache(this.getEventsUnpaused.bind(this)));
        application.get(prefix + "/contracts/example/events/upgraded", noCache(this.getEventsUpgraded.bind(this)));
    }

    /**
     * @typedef EventParamsExampleInitialized
     * @property {string} version.required - version - eg: 0
     */

    /**
     * @typedef EventItemExampleInitialized
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleInitialized.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleInitialized
     * @property {Array.<EventItemExampleInitialized>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Initialized
     * Smart contract: Example (ExampleContract)
     * Event signature: Initialized(uint64)
     * Binding: GetEventsInitialized
     * @route GET /contracts/example/events/initialized
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListExampleInitialized.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsInitialized(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint64", "name": "version", "type": "uint64" }], "name": "Initialized", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleInitialized>[] = [];

        const [events, nextContinuationToken] = await EventExampleInitialized.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExamplePaused
     * @property {string} by.required - The administrator who paused the smart contract - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemExamplePaused
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExamplePaused.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExamplePaused
     * @property {Array.<EventItemExamplePaused>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Paused
     * Smart contract: Example (ExampleContract)
     * Event signature: Paused(address)
     * Binding: GetEventsPaused
     * Paused - The smart contract was paused
     * @route GET /contracts/example/events/paused
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListExamplePaused.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsPaused(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "by", "type": "address" }], "name": "Paused", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExamplePaused>[] = [];

        const [events, nextContinuationToken] = await EventExamplePaused.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleTestEvent
     * @property {string} exampleValue1.required - Example value 1 - eg: 0
     * @property {string} exampleValue2.required - Example value 2
     * @property {string} exampleValue3.required - Example value 3 - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemExampleTestEvent
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleTestEvent.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleTestEvent
     * @property {Array.<EventItemExampleTestEvent>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type TestEvent
     * Smart contract: Example (ExampleContract)
     * Event signature: TestEvent(uint256,string,address)
     * Binding: GetEventsTestEvent
     * TestEvent - An example event
     * @route GET /contracts/example/events/test-event
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pExampleValue1.query - Filter event with a value for the parameter 'exampleValue1' equal than the one specified.
     * @param {string} filter_gt_pExampleValue1.query - Filter event with a value for the parameter 'exampleValue1' greater than the one specified.
     * @param {string} filter_lt_pExampleValue1.query - Filter event with a value for the parameter 'exampleValue1' less than the one specified.
     * @returns {EventListExampleTestEvent.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsTestEvent(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "exampleValue1", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "exampleValue2", "type": "string" }, { "indexed": false, "internalType": "address", "name": "exampleValue3", "type": "address" }], "name": "TestEvent", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleTestEvent>[] = [];

        if (request.query.filter_eq_pExampleValue1 !== undefined && request.query.filter_eq_pExampleValue1 !== null) {
            filters.push(DataFilter.equals("pExampleValue1", normalizeDatabaseUint256(parseBigInteger(request.query.filter_eq_pExampleValue1 + ""))));
        }

        if (request.query.filter_gt_pExampleValue1 !== undefined && request.query.filter_gt_pExampleValue1 !== null) {
            filters.push(DataFilter.greaterThan("pExampleValue1", normalizeDatabaseUint256(parseBigInteger(request.query.filter_gt_pExampleValue1 + ""))));
        }

        if (request.query.filter_lt_pExampleValue1 !== undefined && request.query.filter_lt_pExampleValue1 !== null) {
            filters.push(DataFilter.lessThan("pExampleValue1", normalizeDatabaseUint256(parseBigInteger(request.query.filter_lt_pExampleValue1 + ""))));
        }

        const [events, nextContinuationToken] = await EventExampleTestEvent.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleUnpaused
     * @property {string} by.required - The administrator who paused the smart contract - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemExampleUnpaused
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleUnpaused.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleUnpaused
     * @property {Array.<EventItemExampleUnpaused>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Unpaused
     * Smart contract: Example (ExampleContract)
     * Event signature: Unpaused(address)
     * Binding: GetEventsUnpaused
     * Paused - The smart contract was paused
     * @route GET /contracts/example/events/unpaused
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListExampleUnpaused.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsUnpaused(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "by", "type": "address" }], "name": "Unpaused", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleUnpaused>[] = [];

        const [events, nextContinuationToken] = await EventExampleUnpaused.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleUpgraded
     * @property {string} implementation.required - implementation - eg: 0x0000000000000000000000000000000000000000
     */

    /**
     * @typedef EventItemExampleUpgraded
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleUpgraded.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleUpgraded
     * @property {Array.<EventItemExampleUpgraded>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type Upgraded
     * Smart contract: Example (ExampleContract)
     * Event signature: Upgraded(address)
     * Binding: GetEventsUpgraded
     * @route GET /contracts/example/events/upgraded
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pImplementation.query - Filter event with a value for the parameter 'implementation' equal than the one specified.
     * @returns {EventListExampleUpgraded.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsUpgraded(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "Upgraded", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleUpgraded>[] = [];

        if (request.query.filter_eq_pImplementation !== undefined && request.query.filter_eq_pImplementation !== null) {
            filters.push(DataFilter.equals("pImplementation", normalizeAddress(request.query.filter_eq_pImplementation + "")));
        }

        const [events, nextContinuationToken] = await EventExampleUpgraded.findPaginated(filters, limit, continuationToken);

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
