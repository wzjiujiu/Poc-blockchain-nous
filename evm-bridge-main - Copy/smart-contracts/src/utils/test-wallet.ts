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

// Test wallets

"use strict";

import { privateKeyToAddress, TransactionSendingOptions } from "@asanrom/smart-contract-wrapper";
import Crypto from "crypto";
import { BlockchainConfig } from "../config/config-blockchain";

/**
 * Test wallet
 */
export class TestWallet {
    /**
     * Generates a random wallet for testing
     * @returns The wallet
     */
    public static random(): TestWallet {
        const key = Crypto.randomBytes(32);
        return new TestWallet(key);
    }

    /**
     * Obtains the deployer wallet
     * @returns The wallet
     */
    public static deployer(): TestWallet {
        return new TestWallet(BlockchainConfig.getInstance().deployPrivateKey);
    }

    private static namedWallets: Map<string, TestWallet> = new Map();

    /**
     * Gets a named wallet (it will be the same between tests)
     * @param name The wallet name
     * @returns The wallet
     */
    public static named(name: string): TestWallet {
        if (TestWallet.namedWallets.has(name)) {
            return TestWallet.namedWallets.get(name);
        }

        const wallet = TestWallet.random();

        TestWallet.namedWallets.set(name, wallet);

        return wallet;
    }

    // Private key
    public key: Buffer;

    // Address
    public address: string;

    /**
     * Builds a test wallet
     * @param key The wallet private key
     */
    constructor(key: Buffer) {
        this.key = key;
        this.address = privateKeyToAddress(key);
    }

    /**
     * Gets the options to send transactions
     * @returns The transaction sending options
     */
    public getTxOptions(): TransactionSendingOptions {
        return BlockchainConfig.getInstance().getTransactionSendingOptions(this.key);
    }
}
