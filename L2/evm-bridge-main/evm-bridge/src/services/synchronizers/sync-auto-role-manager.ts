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

import { SmartContractsConfig } from "../../config/config-smart-contracts";
import { SmartContractEventSynchronizer } from "./event-synchronizer";
import { EventRoleManagerInitialized } from "../../models/event-sync/role-manager/initialized";
import { EventRoleManagerPaused } from "../../models/event-sync/role-manager/paused";
import { EventRoleManagerRoleAssigned } from "../../models/event-sync/role-manager/role-assigned";
import { EventRoleManagerRoleRevoked } from "../../models/event-sync/role-manager/role-revoked";
import { EventRoleManagerUnpaused } from "../../models/event-sync/role-manager/unpaused";
import { EventRoleManagerUpgraded } from "../../models/event-sync/role-manager/upgraded";
import { createEventUID, normalizeDatabaseUint256, normalizeAddress } from "../../utils/blockchain";

/**
 * Event synchronizer for RoleManager (RoleManager)
 */
export class RoleManagerEventSynchronizer extends SmartContractEventSynchronizer {
    constructor() {
        super(SmartContractsConfig.getInstance().roleManager.address);
    }

    getContractName(): string {
        return "RoleManager";
    }

    async scanEvents(fromBlock: number, toBlock: number): Promise<void> {
        const events = await SmartContractsConfig.getInstance().roleManager.findEvents(fromBlock, toBlock);

        this.logEvents(events.events);

        for (let i = 0; i < events.length(); i++) {
            const eventType = events.getEventType(i);
            switch (eventType) {
                case "Initialized":
                    {
                        const ev = events.getInitializedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pVersion = normalizeDatabaseUint256(ev.data.version);
                        const exists = await EventRoleManagerInitialized.exists(id);
                        if (!exists) {
                            const newEvent = new EventRoleManagerInitialized({
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
                        const exists = await EventRoleManagerPaused.exists(id);
                        if (!exists) {
                            const newEvent = new EventRoleManagerPaused({
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
                case "RoleAssigned":
                    {
                        const ev = events.getRoleAssignedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pAccount = normalizeAddress(ev.data.account);
                        const pRole = normalizeDatabaseUint256(ev.data.role);
                        const pBy = normalizeAddress(ev.data.by);
                        const exists = await EventRoleManagerRoleAssigned.exists(id);
                        if (!exists) {
                            const newEvent = new EventRoleManagerRoleAssigned({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pAccount,
                                pRole,
                                pBy,
                            });

                            await newEvent.insert();
                        }
                    }
                    break;
                case "RoleRevoked":
                    {
                        const ev = events.getRoleRevokedEvent(i);

                        const block = Number(ev.event.log.blockNumber);
                        const timestamp = await this.getBlockTimestamp(block);
                        const eventIndex = Number(ev.event.log.logIndex);
                        const tx = ev.event.log.transactionHash.toString("hex").toLowerCase();

                        const id = createEventUID(block, eventIndex, tx);

                        const pAccount = normalizeAddress(ev.data.account);
                        const pRole = normalizeDatabaseUint256(ev.data.role);
                        const pBy = normalizeAddress(ev.data.by);
                        const exists = await EventRoleManagerRoleRevoked.exists(id);
                        if (!exists) {
                            const newEvent = new EventRoleManagerRoleRevoked({
                                id,
                                block,
                                timestamp,
                                eventIndex,
                                tx,
                                pAccount,
                                pRole,
                                pBy,
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
                        const exists = await EventRoleManagerUnpaused.exists(id);
                        if (!exists) {
                            const newEvent = new EventRoleManagerUnpaused({
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
                        const exists = await EventRoleManagerUpgraded.exists(id);
                        if (!exists) {
                            const newEvent = new EventRoleManagerUpgraded({
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
        await EventRoleManagerInitialized.reset();
        await EventRoleManagerPaused.reset();
        await EventRoleManagerRoleAssigned.reset();
        await EventRoleManagerRoleRevoked.reset();
        await EventRoleManagerUnpaused.reset();
        await EventRoleManagerUpgraded.reset();
    }
}
