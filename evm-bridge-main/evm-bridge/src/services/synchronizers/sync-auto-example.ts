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

import { SmartContractsConfig } from "../../config/config-smart-contracts";
import { SmartContractEventSynchronizer } from "./event-synchronizer";
import { EventExampleAssetModified } from "../../models/event-sync/example/asset-modified";
import { EventExampleAssetModifiedminio } from "../../models/event-sync/example/asset-modifiedminio";
import { EventExampleAssetRegistered } from "../../models/event-sync/example/asset-registered";
import { EventExampleAssetRegisteredminio } from "../../models/event-sync/example/asset-registeredminio";
import { EventExampleContrattoRegistered } from "../../models/event-sync/example/contratto-registered";
import { EventExampleContrattoStateUpdated } from "../../models/event-sync/example/contratto-state-updated";
import { EventExampleDataTransferCompleted } from "../../models/event-sync/example/data-transfer-completed";
import { EventExampleDataTransferRequested } from "../../models/event-sync/example/data-transfer-requested";
import { EventExampleDataofferModified } from "../../models/event-sync/example/dataoffer-modified";
import { EventExampleDataofferRegistered } from "../../models/event-sync/example/dataoffer-registered";
import { EventExampleInitialized } from "../../models/event-sync/example/initialized";
import { EventExamplePaused } from "../../models/event-sync/example/paused";
import { EventExamplePolicyModified } from "../../models/event-sync/example/policy-modified";
import { EventExamplePolicyRegistered } from "../../models/event-sync/example/policy-registered";
import { EventExampleUnpaused } from "../../models/event-sync/example/unpaused";
import { EventExampleUpgraded } from "../../models/event-sync/example/upgraded";
import { createEventUID, normalizeDatabaseUint256, normalizeAddress, normalizeBytes32 } from "../../utils/blockchain";

/**
 * Event synchronizer for Example (ExampleContract)
 */
export class ExampleEventSynchronizer extends SmartContractEventSynchronizer {
    constructor() {
        super(SmartContractsConfig.getInstance().example.address);
    }

    getContractName(): string {
        return "Example";
    }

    async scanEvents(fromBlock: number, toBlock: number): Promise<void> {
        const events = await SmartContractsConfig.getInstance().example.findEvents(fromBlock, toBlock);

        this.logEvents(events.events);

        for (let i = 0; i < events.length(); i++) {
            const eventType = events.getEventType(i);
            switch (eventType) {
                case "AssetModified":
                    {
                        const ev = events.getAssetModifiedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pNodeId = normalizeBytes32(ev.data.nodeId);
                        const pAssetId = ev.data.assetId;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pNewTitle = ev.data.newTitle;
                        const exists = await EventExampleAssetModified.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleAssetModified({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pNodeId,
                                pAssetId,
                                pTimestamp,
                                pNewTitle,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "AssetModifiedminio":
                    {
                        const ev = events.getAssetModifiedminioEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pNodeId = normalizeBytes32(ev.data.nodeId);
                        const pAssetId = ev.data.assetId;
                        const pDataHash = normalizeBytes32(ev.data.dataHash);
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pNewTitle = ev.data.newTitle;
                        const exists = await EventExampleAssetModifiedminio.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleAssetModifiedminio({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pNodeId,
                                pAssetId,
                                pDataHash,
                                pTimestamp,
                                pNewTitle,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "AssetRegistered":
                    {
                        const ev = events.getAssetRegisteredEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pRegistrar = normalizeAddress(ev.data.registrar);
                        const pNodeId = normalizeBytes32(ev.data.nodeId);
                        const pAssetId = ev.data.assetId;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pTitle = ev.data.title;
                        const exists = await EventExampleAssetRegistered.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleAssetRegistered({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pRegistrar,
                                pNodeId,
                                pAssetId,
                                pTimestamp,
                                pTitle,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "AssetRegisteredminio":
                    {
                        const ev = events.getAssetRegisteredminioEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pRegistrar = normalizeAddress(ev.data.registrar);
                        const pNodeId = normalizeBytes32(ev.data.nodeId);
                        const pAssetId = ev.data.assetId;
                        const pDataHash = normalizeBytes32(ev.data.dataHash);
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pTitle = ev.data.title;
                        const exists = await EventExampleAssetRegisteredminio.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleAssetRegisteredminio({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pRegistrar,
                                pNodeId,
                                pAssetId,
                                pDataHash,
                                pTimestamp,
                                pTitle,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "ContrattoRegistered":
                    {
                        const ev = events.getContrattoRegisteredEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pRegistrar = normalizeAddress(ev.data.registrar);
                        const pNodeId = normalizeBytes32(ev.data.nodeId);
                        const pContractNegotiationId = ev.data.contractNegotiationId;
                        const pCounterpartyId = ev.data.counterpartyId;
                        const pCreatedAt = normalizeDatabaseUint256(ev.data.createdAt);
                        const pState = ev.data.state;
                        const exists = await EventExampleContrattoRegistered.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleContrattoRegistered({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pRegistrar,
                                pNodeId,
                                pContractNegotiationId,
                                pCounterpartyId,
                                pCreatedAt,
                                pState,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "ContrattoStateUpdated":
                    {
                        const ev = events.getContrattoStateUpdatedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pNodeId = normalizeBytes32(ev.data.nodeId);
                        const pContractNegotiationId = ev.data.contractNegotiationId;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pNewState = ev.data.newState;
                        const exists = await EventExampleContrattoStateUpdated.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleContrattoStateUpdated({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pNodeId,
                                pContractNegotiationId,
                                pTimestamp,
                                pNewState,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "DataTransferCompleted":
                    {
                        const ev = events.getDataTransferCompletedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pTransferId = ev.data.transferId;
                        const pDataHash = normalizeBytes32(ev.data.dataHash);
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const exists = await EventExampleDataTransferCompleted.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleDataTransferCompleted({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pTransferId,
                                pDataHash,
                                pTimestamp,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "DataTransferRequested":
                    {
                        const ev = events.getDataTransferRequestedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pTransferId = ev.data.transferId;
                        const pAssetId = ev.data.assetId;
                        const pConsumer = normalizeAddress(ev.data.consumer);
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pStatus = normalizeDatabaseUint256(ev.data.status);
                        const exists = await EventExampleDataTransferRequested.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleDataTransferRequested({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pTransferId,
                                pAssetId,
                                pConsumer,
                                pTimestamp,
                                pStatus,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "DataofferModified":
                    {
                        const ev = events.getDataofferModifiedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pNodeId = normalizeBytes32(ev.data.nodeId);
                        const pOfferId = ev.data.offerId;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pNewAccessPolicyId = ev.data.newAccessPolicyId;
                        const pNewContractPolicyId = ev.data.newContractPolicyId;
                        const pNewAssetSelector = ev.data.newAssetSelector;
                        const exists = await EventExampleDataofferModified.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleDataofferModified({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pNodeId,
                                pOfferId,
                                pTimestamp,
                                pNewAccessPolicyId,
                                pNewContractPolicyId,
                                pNewAssetSelector,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "DataofferRegistered":
                    {
                        const ev = events.getDataofferRegisteredEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pRegistrar = normalizeAddress(ev.data.registrar);
                        const pNodeId = normalizeBytes32(ev.data.nodeId);
                        const pOfferId = ev.data.offerId;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pAccessPolicyId = ev.data.accessPolicyId;
                        const pContractPolicyId = ev.data.contractPolicyId;
                        const pAssetSelector = ev.data.assetSelector;
                        const exists = await EventExampleDataofferRegistered.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleDataofferRegistered({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pRegistrar,
                                pNodeId,
                                pOfferId,
                                pTimestamp,
                                pAccessPolicyId,
                                pContractPolicyId,
                                pAssetSelector,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "Initialized":
                    {
                        const ev = events.getInitializedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pVersion = normalizeDatabaseUint256(ev.data.version);
                        const exists = await EventExampleInitialized.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleInitialized({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pVersion,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "Paused":
                    {
                        const ev = events.getPausedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pBy = normalizeAddress(ev.data.by);
                        const exists = await EventExamplePaused.exists(id);
                        if (!exists) {
                            const newEvent = new EventExamplePaused({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pBy,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "PolicyModified":
                    {
                        const ev = events.getPolicyModifiedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pNodeId = normalizeBytes32(ev.data.nodeId);
                        const pPolicyId = ev.data.policyId;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pNewTitle = ev.data.newTitle;
                        const exists = await EventExamplePolicyModified.exists(id);
                        if (!exists) {
                            const newEvent = new EventExamplePolicyModified({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pNodeId,
                                pPolicyId,
                                pTimestamp,
                                pNewTitle,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "PolicyRegistered":
                    {
                        const ev = events.getPolicyRegisteredEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pRegistrar = normalizeAddress(ev.data.registrar);
                        const pNodeId = normalizeBytes32(ev.data.nodeId);
                        const pPolicyId = ev.data.policyId;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pTitle = ev.data.title;
                        const exists = await EventExamplePolicyRegistered.exists(id);
                        if (!exists) {
                            const newEvent = new EventExamplePolicyRegistered({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pRegistrar,
                                pNodeId,
                                pPolicyId,
                                pTimestamp,
                                pTitle,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "Unpaused":
                    {
                        const ev = events.getUnpausedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pBy = normalizeAddress(ev.data.by);
                        const exists = await EventExampleUnpaused.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleUnpaused({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pBy,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "Upgraded":
                    {
                        const ev = events.getUpgradedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pImplementation = normalizeAddress(ev.data.implementation);
                        const exists = await EventExampleUpgraded.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleUpgraded({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pImplementation,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
            }
        }
    }
    async reset(): Promise<void> {
        await EventExampleAssetModified.reset();
        await EventExampleAssetModifiedminio.reset();
        await EventExampleAssetRegistered.reset();
        await EventExampleAssetRegisteredminio.reset();
        await EventExampleContrattoRegistered.reset();
        await EventExampleContrattoStateUpdated.reset();
        await EventExampleDataTransferCompleted.reset();
        await EventExampleDataTransferRequested.reset();
        await EventExampleDataofferModified.reset();
        await EventExampleDataofferRegistered.reset();
        await EventExampleInitialized.reset();
        await EventExamplePaused.reset();
        await EventExamplePolicyModified.reset();
        await EventExamplePolicyRegistered.reset();
        await EventExampleUnpaused.reset();
        await EventExampleUpgraded.reset();
    }
}
