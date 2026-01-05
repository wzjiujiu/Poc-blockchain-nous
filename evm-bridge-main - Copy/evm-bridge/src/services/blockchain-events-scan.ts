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

// Blockchain event scanner

"use strict";

import FS from "fs";
import Path from "path";
import { AsyncInterval } from "@asanrom/async-tools";
import { Quantity, Web3RPCClient } from "@asanrom/smart-contract-wrapper";
import { BlockchainConfig } from "../config/config-blockchain";
import { DynamicConfiguration } from "../models/dynconf";
import { Monitor } from "../monitor";
import { ContractEventStatus } from "../models/contract-event-status";
import { SmartContractEventSynchronizer } from "./synchronizers/event-synchronizer";
import { normalizeAddress } from "../utils/blockchain";

export const DYN_CONF_CURRENT_BLOCK = "event_sync_current_block";

/**
 * Blockchain events scanner service
 */
export class BlockchainEventsScanner {
    public static instance: BlockchainEventsScanner = null;

    public static getInstance(): BlockchainEventsScanner {
        if (BlockchainEventsScanner.instance) {
            return BlockchainEventsScanner.instance;
        } else {
            BlockchainEventsScanner.instance = new BlockchainEventsScanner();
            return BlockchainEventsScanner.instance;
        }
    }

    public currentBlock: Quantity;
    public maxRange: number;

    private interval: AsyncInterval;

    private synchronizers: SmartContractEventSynchronizer[];

    constructor() {
        this.currentBlock = BlockchainConfig.getInstance().firstBlock;
        this.maxRange = BlockchainConfig.getInstance().eventSyncRange;

        this.synchronizers = [];
        const files = FS.readdirSync(Path.resolve(__dirname, "synchronizers"));
        for (const file of files) {
            if (!file.endsWith(".js") && !file.endsWith(".ts")) {
                continue;
            }

            if (file.startsWith("event-synchronizer.")) {
                continue; // Abstract synchronizer
            }

            try {
                const synchronizerModule = require(Path.resolve(__dirname, "synchronizers", file));
                for (const key of Object.keys(synchronizerModule)) {
                    const synchronizer = synchronizerModule[key];
                    if (synchronizer && synchronizer.prototype && typeof synchronizer.prototype.start === "function") {
                        const instance: SmartContractEventSynchronizer = new synchronizer();
                        this.synchronizers.push(instance)
                        Monitor.debug("Registered event synchronizer: " + key);
                    }
                }
            } catch (ex) {
                Monitor.exception(ex);
            }
        }
    }

    public async reset() {
        await DynamicConfiguration.setConfiguration(DYN_CONF_CURRENT_BLOCK, "");
        await ContractEventStatus.reset();

        for (const s of this.synchronizers) {
            await s.reset();
        }
    }

    public async start() {
        const currentBlock = await DynamicConfiguration.getStringConfiguration(DYN_CONF_CURRENT_BLOCK, "");

        if (currentBlock) {
            const blockQ = BigInt(currentBlock);
            if (blockQ > this.currentBlock) {
                this.currentBlock = blockQ;
            }
        }

        this.interval = new AsyncInterval(this.scan.bind(this), BlockchainConfig.getInstance().blockTime);
        this.interval.on("error", err => {
            Monitor.exception(err);
            Monitor.error("Error syncing the blockchain");
        });
        this.interval.start(true);

        for (const s of this.synchronizers) {
            s.start();
        }
    }

    private async storeCurrentBlock() {
        const currentBlockHex = "0x" + this.currentBlock.toString(16);
        await DynamicConfiguration.setConfiguration(DYN_CONF_CURRENT_BLOCK, currentBlockHex);
    }

    private async scan() {
        const lastBlock = await Web3RPCClient.getInstance().getBlockByNumber("latest", { provider: BlockchainConfig.getInstance().provider });

        if (!lastBlock) {
            return;
        }

        const lastBlockNumber = lastBlock.number;

        if (this.currentBlock >= lastBlockNumber) {
            return; // Nothing to sync
        }

        while (this.currentBlock < lastBlockNumber) {
            const rangeStart = this.currentBlock + BigInt(1);
            let rangeEnd = rangeStart + BigInt(this.maxRange);

            if (rangeEnd > lastBlockNumber) {
                rangeEnd = lastBlockNumber;
            }

            // Add scanning methods below this line

            const logs = await Web3RPCClient.getInstance().getLogs({ fromBlock: rangeStart, toBlock: rangeEnd }, {
                provider: BlockchainConfig.getInstance().provider,
            });

            const eventsMap = new Map<string, number>();

            for (const log of logs) {
                const address = normalizeAddress(log.address);

                if (eventsMap.has(address)) {
                    continue;
                }

                eventsMap.set(address, Number(log.blockNumber));
            }

            for (const contractAddress of eventsMap.keys()) {
                const blockNumber = eventsMap.get(contractAddress);
                const exists = await ContractEventStatus.exists(contractAddress);

                if (!exists) {
                    const newStatus = new ContractEventStatus({
                        address: contractAddress,
                        firstEvent: blockNumber,
                        lastSyncEvent: blockNumber - 1,
                    });

                    await newStatus.insert();
                }
            }

            this.currentBlock = rangeEnd;
            await this.storeCurrentBlock();
            Monitor.debug("[EVENTS SYNC] Sync block event / Block: 0x" + this.currentBlock.toString(16));
        }
    }
}
