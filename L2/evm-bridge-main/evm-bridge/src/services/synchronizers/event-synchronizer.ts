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

// Abstract class for contract event synchronizers

"use strict";

import { AsyncInterval } from "@asanrom/async-tools";
import { ContractEventStatus } from "../../models/contract-event-status";
import { normalizeAddress } from "../../utils/blockchain";
import { BlockchainConfig } from "../../config/config-blockchain";
import { Monitor } from "../../monitor";
import { QuantityLike, SmartContractEvent, Web3RPCClient } from "@asanrom/smart-contract-wrapper";
import { LogsConfig } from "../../config/config-logs";

/**
 * Smart contract event synchronizer
 */
export abstract class SmartContractEventSynchronizer {
    private address: string;
    private contractEventStatus: ContractEventStatus | null;

    public maxRange: number;

    private interval: AsyncInterval;

    /**
     * Constructor
     * @param address The smart contract address 
     */
    constructor(address: string) {
        this.maxRange = BlockchainConfig.getInstance().eventSyncRange;
        this.address = normalizeAddress(address);
        this.contractEventStatus = null;
    }

    /**
     * Gets the smart contract address
     * @returns The smart contract address
     */
    public getAddress(): string {
        return this.address;
    }

    /**
     * Gets the smart contract name
     */
    abstract getContractName(): string;

    /**
     * Starts the synchronizer
     */
    public start() {
        this.interval = new AsyncInterval(this.scan.bind(this), BlockchainConfig.getInstance().blockTime);
        this.interval.on("error", err => {
            Monitor.debugException(err);
            Monitor.error(`[EVENT-SYNC] [${this.getContractName()}] ${err.message}`);
        });
        this.interval.start(true);
    }

    /**
     * Scans the blockchain
     */
    private async scan() {
        if (!this.contractEventStatus) {
            const contractEventStatus = await ContractEventStatus.finder.findByKey(this.address);

            if (!contractEventStatus) {
                // No activity for the smart contract yet
                return;
            }

            this.contractEventStatus = contractEventStatus;
        }

        const lastBlock = await Web3RPCClient.getInstance().getBlockByNumber("latest", { provider: BlockchainConfig.getInstance().provider });

        if (!lastBlock) {
            return;
        }

        const lastBlockNumber = Number(lastBlock.number);

        if (this.contractEventStatus.lastSyncEvent >= lastBlockNumber) {
            return; // Nothing to sync
        }

        while (this.contractEventStatus.lastSyncEvent < lastBlockNumber) {
            const rangeStart = this.contractEventStatus.lastSyncEvent + 1;
            let rangeEnd = rangeStart + this.maxRange;

            if (rangeEnd > lastBlockNumber) {
                rangeEnd = lastBlockNumber;
            }

            await this.scanEvents(rangeStart, rangeEnd);

            this.contractEventStatus.lastSyncEvent = rangeEnd;
            await this.contractEventStatus.save();
            Monitor.debug(`[EVENT-SYNC] [${this.getContractName()}] Synced contract events up to block: ${this.contractEventStatus.lastSyncEvent}`);
        }
    }

    /**
     * Scans the events of the smart contract
     * @param fromBlock Start block range
     * @param toBlock End of block range
     */
    abstract scanEvents(fromBlock: number, toBlock: number): Promise<void>;

    /**
     * Logs events for debugging purposes
     * @param events The events
     */
    public logEvents(events: SmartContractEvent[]) {
        if (LogsConfig.getInstance().logDebug) {
            for (const event of events) {
                Monitor.debug("[EVENT] " + event.signature + " | Data: " + event.parameters.map(p => {
                    if (typeof p === "bigint") {
                        return "0x" + p.toString(16);
                    } else if (typeof p === "string") {
                        return JSON.stringify(p);
                    } else if (p instanceof Buffer) {
                        return JSON.stringify(p.toString("hex"));
                    } else {
                        return "" + p;
                    }
                }).join(","));
            }
        }
    }

    /**
     * Resets event synchronization
     */
    abstract reset(): Promise<void>;

    /**
     * Resolves block timestamp
     * @param blockNumber The block number
     * @returns The block timestamp
     */
    public async getBlockTimestamp(blockNumber: QuantityLike): Promise<number> {
        const block = await Web3RPCClient.getInstance().getBlockByNumber(blockNumber, {
            provider: BlockchainConfig.getInstance().provider,
        });

        return Number(block.timestamp);
    }
}
