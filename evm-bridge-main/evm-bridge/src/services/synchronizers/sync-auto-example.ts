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
import { EventExampleAssetRegistered } from "../../models/event-sync/example/asset-registered";
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

                        const pAssetId = ev.data.assetId;
                        const pNewTitle = ev.data.newTitle;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const exists = await EventExampleAssetModified.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleAssetModified({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pAssetId,
                                pNewTitle,
                                pTimestamp,
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

                        const pOwner = normalizeAddress(ev.data.owner);
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
                                pOwner,
                                pAssetId,
                                pTimestamp,
                                pTitle,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "DataTransferApproved":
                    {
                        const ev = events.getDataTransferApprovedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pTransferId = ev.data.transferId;
                        const pProvider = normalizeAddress(ev.data.provider);
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const exists = await EventExampleDataTransferApproved.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleDataTransferApproved({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pTransferId,
                                pProvider,
                                pTimestamp,
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
                case "DataTransferRejected":
                    {
                        const ev = events.getDataTransferRejectedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pTransferId = ev.data.transferId;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const exists = await EventExampleDataTransferRejected.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleDataTransferRejected({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pTransferId,
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

                        const pOfferId = ev.data.offerId;
                        const pNewTitle = ev.data.newTitle;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const exists = await EventExampleDataofferModified.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleDataofferModified({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pOfferId,
                                pNewTitle,
                                pTimestamp,
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

                        const pOwner = normalizeAddress(ev.data.owner);
                        const pOfferId = ev.data.offerId;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const pTitle = ev.data.title;
                        const exists = await EventExampleDataofferRegistered.exists(id);
                        if (!exists) {
                            const newEvent = new EventExampleDataofferRegistered({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pOwner,
                                pOfferId,
                                pTimestamp,
                                pTitle,
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

                        const pPolicyId = ev.data.policyId;
                        const pNewTitle = ev.data.newTitle;
                        const pTimestamp = normalizeDatabaseUint256(ev.data.timestamp);
                        const exists = await EventExamplePolicyModified.exists(id);
                        if (!exists) {
                            const newEvent = new EventExamplePolicyModified({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pPolicyId,
                                pNewTitle,
                                pTimestamp,
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

                        const pOwner = normalizeAddress(ev.data.owner);
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
                                pOwner,
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
        await EventExampleAssetRegistered.reset();
        await EventExampleDataTransferApproved.reset();
        await EventExampleDataTransferCompleted.reset();
        await EventExampleDataTransferRejected.reset();
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
