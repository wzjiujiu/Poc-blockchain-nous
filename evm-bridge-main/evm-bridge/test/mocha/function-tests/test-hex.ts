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

import assert from 'assert';
import {  hexNoPrefix, hexWithPrefix } from "../../../src/utils/hex";

// Test group
describe("Hex utilities", () => {
    it('hexWithPrefix', async () => {
        let res: string;

        res = hexWithPrefix("0123456");

        assert(res.startsWith("0x"));
        assert.equal(res, "0x0123456");

        res = hexWithPrefix(res);

        assert.equal(res, "0x0123456");
    });

    it('hexNoPrefix', async () => {
        let res: string;

        res = hexNoPrefix("0x0123456");

        assert(!res.startsWith("0x"));
        assert.equal(res, "0123456");

        res = hexNoPrefix(res);

        assert.equal(res, "0123456");
    });
});