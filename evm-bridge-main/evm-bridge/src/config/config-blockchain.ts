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

// Blockchain configuration

"use strict";

import { Quantity, RPCProvider, RPC_HTTP_Provider, RPC_WebSocket_Provider } from "@asanrom/smart-contract-wrapper";

/**
 * Blockchain configuration.
 */
export class BlockchainConfig {

    /**
     * Gets the configuration instance.
     */
    public static getInstance(): BlockchainConfig {
        if (BlockchainConfig.instance) {
            return BlockchainConfig.instance;
        }

        const config: BlockchainConfig = new BlockchainConfig();

        switch (process.env.BLOCKCHAIN_NODE_PROTOCOL || "http") {
            case "http":
            case "https":
                config.protocol = "http";
                config.url = process.env.BLOCKCHAIN_NODE_RPC_URL || "http://localhost:8545";
                config.provider = new RPC_HTTP_Provider(config.url);
                break;
            case "ws":
                config.protocol = "ws";
                config.url = process.env.BLOCKCHAIN_NODE_RPC_URL || "ws://localhost:8546";
                config.provider = new RPC_WebSocket_Provider(config.url);
                break;
            default:
                throw new Error("Invalid protocol: " + config.protocol + " | Allowed protocols for blockchain connections: http, ws");
        }

        config.sync = process.env.BLOCKCHAIN_SYNC === "YES";

        config.firstBlock = BigInt(process.env.BLOCKCHAIN_SYNC_FIRST_BLOCK || 0);

        config.eventSyncRange = parseInt(process.env.BLOCKCHAIN_SYNC_RANGE || "1", 10) || 1;

        config.blockTime = parseInt(process.env.BLOCKCHAIN_SYNC_TIME || "1000", 10) || 1000;

        BlockchainConfig.instance = config;

        return config;
    }
    private static instance: BlockchainConfig = null;

    public protocol: "http" | "ws";
    public url: string;

    public provider: RPCProvider;

    public firstBlock: Quantity;

    public sync: boolean;
    public eventSyncRange: number;
    public blockTime: number;

    constructor() {
        this.protocol = "http";
        this.url = "http://localhost:8545";
        this.provider = null;
        this.firstBlock = BigInt(0);
        this.eventSyncRange = 1;
        this.blockTime = 1000;
        this.sync = true;
    }
}
