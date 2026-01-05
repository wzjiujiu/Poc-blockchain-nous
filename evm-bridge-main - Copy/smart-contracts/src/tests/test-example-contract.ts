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

// Test

"use strict";

import assert from "assert";
import { DeployedContracts } from "../contracts";
import { assertEqualHex, assertRevert, runTest, runTestCase } from "../utils/test-utils";
import { TestWallet } from "../utils/test-wallet";
import { ROLES } from "./helpers/enums";
import { assertEvent } from "../utils/assert-event";
import { ExampleContractWrapper } from "../contract-wrappers/example-contract";

/**
 * Test for the ExampleContract smart contract
 * @param contracts The deployed contracts
 */
export async function testExampleContract(contracts: DeployedContracts) {
    // Prepare accounts

    const deployer = TestWallet.deployer();
    const testWallet = TestWallet.named("test-wallet");

    const testAccount1 = TestWallet.random();

    await runTest("ExampleContract", async () => {
        // Give the role
        await contracts.roleManager.assignRole(testWallet.address, ROLES.TEST_ROLE, deployer.getTxOptions());

        const exampleValue1 = BigInt(123);
        const exampleValue2 = "Example value string";
        const exampleValue3 = testAccount1.address;

        await runTestCase("Should be able to set the example values", async () => {
            const result = await contracts.example.setTestValues(
                exampleValue1,
                exampleValue2,
                exampleValue3,
                testWallet.getTxOptions(),
            );

            assertEvent(result, {
                contract: contracts.example.address,
                abi: ExampleContractWrapper.abi(),
                eventName: "TestEvent",
                parameters: [exampleValue1, exampleValue2, exampleValue3],
            });
        });

        await runTestCase("Should not be able to set the example values without the role", async () => {
            await assertRevert(
                contracts.example.setTestValues(
                    exampleValue1,
                    exampleValue2,
                    exampleValue3,
                    testAccount1.getTxOptions(),
                ),
                "An account without the appropriate role should not be able to call this method",
            );
        });

        await runTestCase("Should be able to fetch the example values", async () => {
            const exampleValues = await contracts.example.getTestValues();

            assert.equal(exampleValues.exampleValue1, exampleValue1);
            assert.equal(exampleValues.exampleValue2, exampleValue2);
            assertEqualHex(exampleValues.exampleValue3, exampleValue3);
        });
    });
}
