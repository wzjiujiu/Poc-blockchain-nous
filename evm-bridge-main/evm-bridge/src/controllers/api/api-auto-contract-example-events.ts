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
import { EventExampleAssetModified } from "../../models/event-sync/example/asset-modified";
import { EventExampleAssetRegistered } from "../../models/event-sync/example/asset-registered";
import { EventExampleContrattoRegistered } from "../../models/event-sync/example/contratto-registered";
import { EventExampleContrattoStateUpdated } from "../../models/event-sync/example/contratto-state-updated";
import { EventExampleDataTransferApproved } from "../../models/event-sync/example/data-transfer-approved";
import { EventExampleDataTransferCompleted } from "../../models/event-sync/example/data-transfer-completed";
import { EventExampleDataTransferRejected } from "../../models/event-sync/example/data-transfer-rejected";
import { EventExampleDataTransferRequested } from "../../models/event-sync/example/data-transfer-requested";
import { EventExampleDataofferModified } from "../../models/event-sync/example/dataoffer-modified";
import { EventExampleDataofferRegistered } from "../../models/event-sync/example/dataoffer-registered";
import { EventExampleInitialized } from "../../models/event-sync/example/initialized";
import { EventExamplePaused } from "../../models/event-sync/example/paused";
import { EventExamplePolicyModified } from "../../models/event-sync/example/policy-modified";
import { EventExamplePolicyRegistered } from "../../models/event-sync/example/policy-registered";
import { EventExampleUnpaused } from "../../models/event-sync/example/unpaused";
import { EventExampleUpgraded } from "../../models/event-sync/example/upgraded";
import { serializeEventABIParams, normalizeAddress, normalizeBytes32 } from "../../utils/blockchain";

/**
 * Auto generated smart contract API
 * Contract Example (ExampleContract)
 * This file contains the API for fetching events
 * @group example - API for smart contract: Example (ExampleContract)
 */
export class ExampleContractApiEventsController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.get(prefix + "/contracts/example/events/asset-modified", noCache(this.getEventsAssetModified.bind(this)));
        application.get(prefix + "/contracts/example/events/asset-registered", noCache(this.getEventsAssetRegistered.bind(this)));
        application.get(prefix + "/contracts/example/events/contratto-registered", noCache(this.getEventsContrattoRegistered.bind(this)));
        application.get(prefix + "/contracts/example/events/contratto-state-updated", noCache(this.getEventsContrattoStateUpdated.bind(this)));
        application.get(prefix + "/contracts/example/events/data-transfer-approved", noCache(this.getEventsDataTransferApproved.bind(this)));
        application.get(prefix + "/contracts/example/events/data-transfer-completed", noCache(this.getEventsDataTransferCompleted.bind(this)));
        application.get(prefix + "/contracts/example/events/data-transfer-rejected", noCache(this.getEventsDataTransferRejected.bind(this)));
        application.get(prefix + "/contracts/example/events/data-transfer-requested", noCache(this.getEventsDataTransferRequested.bind(this)));
        application.get(prefix + "/contracts/example/events/dataoffer-modified", noCache(this.getEventsDataofferModified.bind(this)));
        application.get(prefix + "/contracts/example/events/dataoffer-registered", noCache(this.getEventsDataofferRegistered.bind(this)));
        application.get(prefix + "/contracts/example/events/initialized", noCache(this.getEventsInitialized.bind(this)));
        application.get(prefix + "/contracts/example/events/paused", noCache(this.getEventsPaused.bind(this)));
        application.get(prefix + "/contracts/example/events/policy-modified", noCache(this.getEventsPolicyModified.bind(this)));
        application.get(prefix + "/contracts/example/events/policy-registered", noCache(this.getEventsPolicyRegistered.bind(this)));
        application.get(prefix + "/contracts/example/events/unpaused", noCache(this.getEventsUnpaused.bind(this)));
        application.get(prefix + "/contracts/example/events/upgraded", noCache(this.getEventsUpgraded.bind(this)));
    }

    /**
     * @typedef EventParamsExampleAssetModified
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} assetId.required - assetId
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} newTitle.required - newTitle
     */

    /**
     * @typedef EventItemExampleAssetModified
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleAssetModified.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleAssetModified
     * @property {Array.<EventItemExampleAssetModified>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type AssetModified
     * Smart contract: Example (ExampleContract)
     * Event signature: AssetModified(bytes32,string,uint256,string)
     * Binding: GetEventsAssetModified
     * @route GET /contracts/example/events/asset-modified
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pNodeId.query - Filter event with a value for the parameter 'nodeId' equal than the one specified.
     * @returns {EventListExampleAssetModified.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsAssetModified(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "indexed": false, "internalType": "string", "name": "assetId", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "newTitle", "type": "string" }], "name": "AssetModified", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleAssetModified>[] = [];

        if (request.query.filter_eq_pNodeId !== undefined && request.query.filter_eq_pNodeId !== null) {
            filters.push(DataFilter.equals("pNodeId", normalizeBytes32(request.query.filter_eq_pNodeId + "")));
        }

        const [events, nextContinuationToken] = await EventExampleAssetModified.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleAssetRegistered
     * @property {string} registrar.required - registrar - eg: 0x0000000000000000000000000000000000000000
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} assetId.required - assetId
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} title.required - title
     */

    /**
     * @typedef EventItemExampleAssetRegistered
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleAssetRegistered.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleAssetRegistered
     * @property {Array.<EventItemExampleAssetRegistered>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type AssetRegistered
     * Smart contract: Example (ExampleContract)
     * Event signature: AssetRegistered(address,bytes32,string,uint256,string)
     * Binding: GetEventsAssetRegistered
     * @route GET /contracts/example/events/asset-registered
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pRegistrar.query - Filter event with a value for the parameter 'registrar' equal than the one specified.
     * @param {string} filter_eq_pNodeId.query - Filter event with a value for the parameter 'nodeId' equal than the one specified.
     * @returns {EventListExampleAssetRegistered.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsAssetRegistered(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "registrar", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "indexed": false, "internalType": "string", "name": "assetId", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "title", "type": "string" }], "name": "AssetRegistered", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleAssetRegistered>[] = [];

        if (request.query.filter_eq_pRegistrar !== undefined && request.query.filter_eq_pRegistrar !== null) {
            filters.push(DataFilter.equals("pRegistrar", normalizeAddress(request.query.filter_eq_pRegistrar + "")));
        }

        if (request.query.filter_eq_pNodeId !== undefined && request.query.filter_eq_pNodeId !== null) {
            filters.push(DataFilter.equals("pNodeId", normalizeBytes32(request.query.filter_eq_pNodeId + "")));
        }

        const [events, nextContinuationToken] = await EventExampleAssetRegistered.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleContrattoRegistered
     * @property {string} registrar.required - registrar - eg: 0x0000000000000000000000000000000000000000
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} contractNegotiationId.required - contractNegotiationId
     * @property {string} counterpartyId.required - counterpartyId
     * @property {string} createdAt.required - createdAt - eg: 0
     * @property {string} state.required - state
     */

    /**
     * @typedef EventItemExampleContrattoRegistered
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleContrattoRegistered.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleContrattoRegistered
     * @property {Array.<EventItemExampleContrattoRegistered>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type ContrattoRegistered
     * Smart contract: Example (ExampleContract)
     * Event signature: ContrattoRegistered(address,bytes32,string,string,uint256,string)
     * Binding: GetEventsContrattoRegistered
     * @route GET /contracts/example/events/contratto-registered
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pRegistrar.query - Filter event with a value for the parameter 'registrar' equal than the one specified.
     * @param {string} filter_eq_pNodeId.query - Filter event with a value for the parameter 'nodeId' equal than the one specified.
     * @returns {EventListExampleContrattoRegistered.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsContrattoRegistered(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "registrar", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "indexed": false, "internalType": "string", "name": "contractNegotiationId", "type": "string" }, { "indexed": false, "internalType": "string", "name": "counterpartyId", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "createdAt", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "state", "type": "string" }], "name": "ContrattoRegistered", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleContrattoRegistered>[] = [];

        if (request.query.filter_eq_pRegistrar !== undefined && request.query.filter_eq_pRegistrar !== null) {
            filters.push(DataFilter.equals("pRegistrar", normalizeAddress(request.query.filter_eq_pRegistrar + "")));
        }

        if (request.query.filter_eq_pNodeId !== undefined && request.query.filter_eq_pNodeId !== null) {
            filters.push(DataFilter.equals("pNodeId", normalizeBytes32(request.query.filter_eq_pNodeId + "")));
        }

        const [events, nextContinuationToken] = await EventExampleContrattoRegistered.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleContrattoStateUpdated
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} contractNegotiationId.required - contractNegotiationId
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} newState.required - newState
     */

    /**
     * @typedef EventItemExampleContrattoStateUpdated
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleContrattoStateUpdated.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleContrattoStateUpdated
     * @property {Array.<EventItemExampleContrattoStateUpdated>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type ContrattoStateUpdated
     * Smart contract: Example (ExampleContract)
     * Event signature: ContrattoStateUpdated(bytes32,string,uint256,string)
     * Binding: GetEventsContrattoStateUpdated
     * @route GET /contracts/example/events/contratto-state-updated
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pNodeId.query - Filter event with a value for the parameter 'nodeId' equal than the one specified.
     * @returns {EventListExampleContrattoStateUpdated.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsContrattoStateUpdated(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "indexed": false, "internalType": "string", "name": "contractNegotiationId", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "newState", "type": "string" }], "name": "ContrattoStateUpdated", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleContrattoStateUpdated>[] = [];

        if (request.query.filter_eq_pNodeId !== undefined && request.query.filter_eq_pNodeId !== null) {
            filters.push(DataFilter.equals("pNodeId", normalizeBytes32(request.query.filter_eq_pNodeId + "")));
        }

        const [events, nextContinuationToken] = await EventExampleContrattoStateUpdated.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleDataTransferApproved
     * @property {string} transferId.required - transferId
     * @property {string} provider.required - provider - eg: 0x0000000000000000000000000000000000000000
     * @property {string} timestamp.required - timestamp - eg: 0
     */

    /**
     * @typedef EventItemExampleDataTransferApproved
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleDataTransferApproved.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleDataTransferApproved
     * @property {Array.<EventItemExampleDataTransferApproved>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type DataTransferApproved
     * Smart contract: Example (ExampleContract)
     * Event signature: DataTransferApproved(string,address,uint256)
     * Binding: GetEventsDataTransferApproved
     * @route GET /contracts/example/events/data-transfer-approved
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pProvider.query - Filter event with a value for the parameter 'provider' equal than the one specified.
     * @returns {EventListExampleDataTransferApproved.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsDataTransferApproved(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "transferId", "type": "string" }, { "indexed": true, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "DataTransferApproved", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleDataTransferApproved>[] = [];

        if (request.query.filter_eq_pProvider !== undefined && request.query.filter_eq_pProvider !== null) {
            filters.push(DataFilter.equals("pProvider", normalizeAddress(request.query.filter_eq_pProvider + "")));
        }

        const [events, nextContinuationToken] = await EventExampleDataTransferApproved.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleDataTransferCompleted
     * @property {string} transferId.required - transferId
     * @property {string} dataHash.required - dataHash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - timestamp - eg: 0
     */

    /**
     * @typedef EventItemExampleDataTransferCompleted
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleDataTransferCompleted.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleDataTransferCompleted
     * @property {Array.<EventItemExampleDataTransferCompleted>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type DataTransferCompleted
     * Smart contract: Example (ExampleContract)
     * Event signature: DataTransferCompleted(string,bytes32,uint256)
     * Binding: GetEventsDataTransferCompleted
     * @route GET /contracts/example/events/data-transfer-completed
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListExampleDataTransferCompleted.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsDataTransferCompleted(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "transferId", "type": "string" }, { "indexed": false, "internalType": "bytes32", "name": "dataHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "DataTransferCompleted", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleDataTransferCompleted>[] = [];

        const [events, nextContinuationToken] = await EventExampleDataTransferCompleted.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleDataTransferRejected
     * @property {string} transferId.required - transferId
     * @property {string} timestamp.required - timestamp - eg: 0
     */

    /**
     * @typedef EventItemExampleDataTransferRejected
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleDataTransferRejected.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleDataTransferRejected
     * @property {Array.<EventItemExampleDataTransferRejected>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type DataTransferRejected
     * Smart contract: Example (ExampleContract)
     * Event signature: DataTransferRejected(string,uint256)
     * Binding: GetEventsDataTransferRejected
     * @route GET /contracts/example/events/data-transfer-rejected
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @returns {EventListExampleDataTransferRejected.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsDataTransferRejected(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "transferId", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "DataTransferRejected", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleDataTransferRejected>[] = [];

        const [events, nextContinuationToken] = await EventExampleDataTransferRejected.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleDataTransferRequested
     * @property {string} transferId.required - transferId
     * @property {string} assetId.required - assetId
     * @property {string} consumer.required - consumer - eg: 0x0000000000000000000000000000000000000000
     * @property {string} timestamp.required - timestamp - eg: 0
     */

    /**
     * @typedef EventItemExampleDataTransferRequested
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleDataTransferRequested.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleDataTransferRequested
     * @property {Array.<EventItemExampleDataTransferRequested>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type DataTransferRequested
     * Smart contract: Example (ExampleContract)
     * Event signature: DataTransferRequested(string,string,address,uint256)
     * Binding: GetEventsDataTransferRequested
     * @route GET /contracts/example/events/data-transfer-requested
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pConsumer.query - Filter event with a value for the parameter 'consumer' equal than the one specified.
     * @returns {EventListExampleDataTransferRequested.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsDataTransferRequested(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "transferId", "type": "string" }, { "indexed": false, "internalType": "string", "name": "assetId", "type": "string" }, { "indexed": true, "internalType": "address", "name": "consumer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "DataTransferRequested", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleDataTransferRequested>[] = [];

        if (request.query.filter_eq_pConsumer !== undefined && request.query.filter_eq_pConsumer !== null) {
            filters.push(DataFilter.equals("pConsumer", normalizeAddress(request.query.filter_eq_pConsumer + "")));
        }

        const [events, nextContinuationToken] = await EventExampleDataTransferRequested.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleDataofferModified
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} offerId.required - offerId
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} newAccessPolicyId.required - newAccessPolicyId
     * @property {string} newContractPolicyId.required - newContractPolicyId
     * @property {string} newAssetSelector.required - newAssetSelector
     */

    /**
     * @typedef EventItemExampleDataofferModified
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleDataofferModified.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleDataofferModified
     * @property {Array.<EventItemExampleDataofferModified>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type DataofferModified
     * Smart contract: Example (ExampleContract)
     * Event signature: DataofferModified(bytes32,string,uint256,string,string,string)
     * Binding: GetEventsDataofferModified
     * @route GET /contracts/example/events/dataoffer-modified
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pNodeId.query - Filter event with a value for the parameter 'nodeId' equal than the one specified.
     * @returns {EventListExampleDataofferModified.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsDataofferModified(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "indexed": false, "internalType": "string", "name": "offerId", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "newAccessPolicyId", "type": "string" }, { "indexed": false, "internalType": "string", "name": "newContractPolicyId", "type": "string" }, { "indexed": false, "internalType": "string", "name": "newAssetSelector", "type": "string" }], "name": "DataofferModified", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleDataofferModified>[] = [];

        if (request.query.filter_eq_pNodeId !== undefined && request.query.filter_eq_pNodeId !== null) {
            filters.push(DataFilter.equals("pNodeId", normalizeBytes32(request.query.filter_eq_pNodeId + "")));
        }

        const [events, nextContinuationToken] = await EventExampleDataofferModified.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExampleDataofferRegistered
     * @property {string} registrar.required - registrar - eg: 0x0000000000000000000000000000000000000000
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} offerId.required - offerId
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} accessPolicyId.required - accessPolicyId
     * @property {string} contractPolicyId.required - contractPolicyId
     * @property {string} assetSelector.required - assetSelector
     */

    /**
     * @typedef EventItemExampleDataofferRegistered
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExampleDataofferRegistered.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExampleDataofferRegistered
     * @property {Array.<EventItemExampleDataofferRegistered>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type DataofferRegistered
     * Smart contract: Example (ExampleContract)
     * Event signature: DataofferRegistered(address,bytes32,string,uint256,string,string,string)
     * Binding: GetEventsDataofferRegistered
     * @route GET /contracts/example/events/dataoffer-registered
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pRegistrar.query - Filter event with a value for the parameter 'registrar' equal than the one specified.
     * @param {string} filter_eq_pNodeId.query - Filter event with a value for the parameter 'nodeId' equal than the one specified.
     * @returns {EventListExampleDataofferRegistered.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsDataofferRegistered(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "registrar", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "indexed": false, "internalType": "string", "name": "offerId", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "accessPolicyId", "type": "string" }, { "indexed": false, "internalType": "string", "name": "contractPolicyId", "type": "string" }, { "indexed": false, "internalType": "string", "name": "assetSelector", "type": "string" }], "name": "DataofferRegistered", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExampleDataofferRegistered>[] = [];

        if (request.query.filter_eq_pRegistrar !== undefined && request.query.filter_eq_pRegistrar !== null) {
            filters.push(DataFilter.equals("pRegistrar", normalizeAddress(request.query.filter_eq_pRegistrar + "")));
        }

        if (request.query.filter_eq_pNodeId !== undefined && request.query.filter_eq_pNodeId !== null) {
            filters.push(DataFilter.equals("pNodeId", normalizeBytes32(request.query.filter_eq_pNodeId + "")));
        }

        const [events, nextContinuationToken] = await EventExampleDataofferRegistered.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExamplePolicyModified
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} policyId.required - policyId
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} newTitle.required - newTitle
     */

    /**
     * @typedef EventItemExamplePolicyModified
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExamplePolicyModified.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExamplePolicyModified
     * @property {Array.<EventItemExamplePolicyModified>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type PolicyModified
     * Smart contract: Example (ExampleContract)
     * Event signature: PolicyModified(bytes32,string,uint256,string)
     * Binding: GetEventsPolicyModified
     * @route GET /contracts/example/events/policy-modified
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pNodeId.query - Filter event with a value for the parameter 'nodeId' equal than the one specified.
     * @returns {EventListExamplePolicyModified.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsPolicyModified(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "indexed": false, "internalType": "string", "name": "policyId", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "newTitle", "type": "string" }], "name": "PolicyModified", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExamplePolicyModified>[] = [];

        if (request.query.filter_eq_pNodeId !== undefined && request.query.filter_eq_pNodeId !== null) {
            filters.push(DataFilter.equals("pNodeId", normalizeBytes32(request.query.filter_eq_pNodeId + "")));
        }

        const [events, nextContinuationToken] = await EventExamplePolicyModified.findPaginated(filters, limit, continuationToken);

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
     * @typedef EventParamsExamplePolicyRegistered
     * @property {string} registrar.required - registrar - eg: 0x0000000000000000000000000000000000000000
     * @property {string} nodeId.required - nodeId - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} policyId.required - policyId
     * @property {string} timestamp.required - timestamp - eg: 0
     * @property {string} title.required - title
     */

    /**
     * @typedef EventItemExamplePolicyRegistered
     * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz
     * @property {number} block.required - Block number - eg: 1
     * @property {number} eventIndex.required - Event index in the block - eg: 0
     * @property {string} tx.required - Transaction hash - eg: 0x0000000000000000000000000000000000000000000000000000000000000000
     * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0
     * @property {EventParamsExamplePolicyRegistered.model} parameters.required - Event parameters
     */

    /**
     * @typedef EventListExamplePolicyRegistered
     * @property {Array.<EventItemExamplePolicyRegistered>} events.required - List of events
     * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz
     */

    /**
     * Get a list of events of type PolicyRegistered
     * Smart contract: Example (ExampleContract)
     * Event signature: PolicyRegistered(address,bytes32,string,uint256,string)
     * Binding: GetEventsPolicyRegistered
     * @route GET /contracts/example/events/policy-registered
     * @group example - API for smart contract: Example (ExampleContract)
     * @param {string} continuationToken.query - Continuation token
     * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256
     * @param {string} filter_eq_pRegistrar.query - Filter event with a value for the parameter 'registrar' equal than the one specified.
     * @param {string} filter_eq_pNodeId.query - Filter event with a value for the parameter 'nodeId' equal than the one specified.
     * @returns {EventListExamplePolicyRegistered.model} 200 - Event list
     * @security BearerAuthorization
     */
    public async getEventsPolicyRegistered(request: Express.Request, response: Express.Response) {
        const eventAbi = { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "registrar", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" }, { "indexed": false, "internalType": "string", "name": "policyId", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "title", "type": "string" }], "name": "PolicyRegistered", "type": "event" };

        const [limit, continuationToken] = parsePaginationParameters(request);

        const filters: DataFilter<EventExamplePolicyRegistered>[] = [];

        if (request.query.filter_eq_pRegistrar !== undefined && request.query.filter_eq_pRegistrar !== null) {
            filters.push(DataFilter.equals("pRegistrar", normalizeAddress(request.query.filter_eq_pRegistrar + "")));
        }

        if (request.query.filter_eq_pNodeId !== undefined && request.query.filter_eq_pNodeId !== null) {
            filters.push(DataFilter.equals("pNodeId", normalizeBytes32(request.query.filter_eq_pNodeId + "")));
        }

        const [events, nextContinuationToken] = await EventExamplePolicyRegistered.findPaginated(filters, limit, continuationToken);

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
