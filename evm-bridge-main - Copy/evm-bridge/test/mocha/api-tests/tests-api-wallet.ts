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

// API tests

"use strict";

import assert from "assert";
import Crypto from "crypto";
import { APITester } from '../test-tools/api-tester';
import { ApiWallet } from '../test-tools/api-bindings/api-group-wallet';
import { privateKeyToAddress } from '@asanrom/smart-contract-wrapper';
import { APIAuthentication } from "../test-tools/authentication";

// Test group
describe("API / Wallets", () => {
    let authUser1: APIAuthentication;

    before(async () => {
        // Setup test server (REQUIRED)
        await APITester.Initialize();

        // Setup auth token
        authUser1 = await APIAuthentication.GenerateToken("user-1");
    });

    // Tests

    const randomPassword = Crypto.randomBytes(8).toString("hex");
    let wallet1: string;
    let wallet2: string;

    it('Should be able to create a wallet', async () => {
        const r = await APITester.Test(ApiWallet.CreateWallet({ name: "Wallet 1", password: randomPassword }), authUser1);

        assert.equal(r.name, "Wallet 1");

        wallet1 = r.id;
    });

    const randomPrivateKey = Crypto.randomBytes(32);
    const randomPrivateKeyAddress = privateKeyToAddress(randomPrivateKey);

    it('Should be able to create a wallet with a private key', async () => {
        const r = await APITester.Test(ApiWallet.CreateWallet({ name: "Wallet 2", password: randomPassword, private_key: randomPrivateKey.toString("hex") }), authUser1);

        assert.equal(r.name, "Wallet 2");
        assert.equal((r.address || "").toLowerCase(), randomPrivateKeyAddress.toLowerCase());

        wallet2 = r.id;
    });

    it('Should be able to list the wallets', async () => {
        const wallets = await APITester.Test(ApiWallet.ListWallets(), authUser1);

        assert.equal(wallets.length, 2);
    });

    it('Should be able to change the wallet name', async () => {
        await APITester.Test(ApiWallet.ModifyWallet(wallet1, { name: "Wallet 1 (M)" }), authUser1);

        const wallet = await APITester.Test(ApiWallet.GetWallet(wallet1), authUser1);

        assert.equal(wallet.name, "Wallet 1 (M)");
    });

    const randomPassword2 = Crypto.randomBytes(8).toString("hex");

    it('Should be able to change the wallet password', async () => {
       // Should fail if the password is wrong
       await APITester.TestError(ApiWallet.ChangeWalletPassword(wallet1, {password: "Invalid", new_password: randomPassword2}), authUser1, 400, "WRONG_PASSWORD");

       // Success if correct password
       await APITester.Test(ApiWallet.ChangeWalletPassword(wallet1, {password: randomPassword, new_password: randomPassword2}), authUser1)
    });

    it('Should be able to export the private key', async () => {
        // Should fail if wrong password
        await APITester.TestError(ApiWallet.ExportPrivatekey(wallet1, {password: "Invalid"}), authUser1, 400, "WRONG_PASSWORD");

        // Success if correct password
        await APITester.Test(ApiWallet.ExportPrivatekey(wallet1, {password: randomPassword2}), authUser1);

        const r = await APITester.Test(ApiWallet.ExportPrivatekey(wallet2, {password: randomPassword}), authUser1);

        assert.equal(r.private_key.toUpperCase(), randomPrivateKey.toString("hex").toUpperCase());
    });

    it('Should be able to delete a wallet', async () => {
        await APITester.Test(ApiWallet.DeleteWallet(wallet1), authUser1);

        await APITester.TestError(ApiWallet.GetWallet(wallet1), authUser1, 404);

        const wallets = await APITester.Test(ApiWallet.ListWallets(), authUser1);

        assert.equal(wallets.length, 1);
    });
});
