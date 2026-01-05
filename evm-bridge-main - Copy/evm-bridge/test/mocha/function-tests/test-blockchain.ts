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

// Function tests

"use strict";

import Crypto from "crypto";
import assert from 'assert';
import { ZERO_ADDRESS, isZeroAddress, validateAddress, compareAddresses, compareBytes32, normalizeAddress, normalizeBytes32, validateBytes32 } from "../../../src/utils/blockchain";

// Test group
describe("Blockchain utilities", () => {
    it('isZeroAddress', async () => {
        assert.equal(validateAddress(ZERO_ADDRESS), true);
        assert.equal(isZeroAddress(ZERO_ADDRESS), true);
        assert.equal(isZeroAddress("0xAb6355Ca5BC17C886b95f61EE601dD149F5C31B6"), false);
    });

    it('validateAddress', async () => {
        assert.equal(validateAddress("0x"), false);
        assert.equal(validateAddress("0x00"), false);
        assert.equal(validateAddress("0000000000000000000000000000000000000000"), true);
        assert.equal(validateAddress("0x0000000000000000000000000000000000000000"), true);
        assert.equal(validateAddress("0xAb6355Ca5BC17C886b95f61EE601dD149F5C31B6"), true);
    });

    it('normalizeAddress', async () => {
        const randomAddress = Crypto.randomBytes(20).toString("hex").toUpperCase();

        let res = normalizeAddress(randomAddress);

        assert.match(res, /^0x[0-9a-z]{40}$/);
    });

    it('compareAddresses', async () => {
        const randomAddress1 = Crypto.randomBytes(20).toString("hex").toUpperCase();
        const randomAddress2 = Crypto.randomBytes(20).toString("hex").toUpperCase();

        assert(compareAddresses(randomAddress1, "0x" + randomAddress1));
        assert(compareAddresses(randomAddress1.toLowerCase(), randomAddress1));
        assert(compareAddresses(randomAddress1, randomAddress2) === (randomAddress1 === randomAddress2));
    });

    it('normalizeBytes32', async () => {
        const randomBytes = Crypto.randomBytes(32).toString("hex").toUpperCase();

        let res = normalizeBytes32(randomBytes);

        assert.match(res, /^0x[0-9a-z]{64}$/);
    });

    it('compareBytes32', async () => {
        const bytes1 = Crypto.randomBytes(32).toString("hex").toUpperCase();
        const bytes2 = Crypto.randomBytes(32).toString("hex").toUpperCase();

        assert(compareBytes32(bytes1, "0x" + bytes1));
        assert(compareAddresses(bytes1.toLowerCase(), bytes1));
        assert(compareAddresses(bytes1, bytes2) === (bytes1 === bytes2));
    });

    it('validateBytes32', async () => {
        const randomBytes = Crypto.randomBytes(32).toString("hex").toUpperCase();

        assert(!validateBytes32(randomBytes));
        assert(!validateBytes32(randomBytes.toLowerCase()));
        assert(!validateBytes32(normalizeBytes32(randomBytes) + "a"));

        assert(validateBytes32("0x" + randomBytes));
        assert(validateBytes32(normalizeBytes32(randomBytes)));
    });
});