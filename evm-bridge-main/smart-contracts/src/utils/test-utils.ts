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

// Test utils

import assert from "assert";
import { hexWithPrefix, TransactionResult } from "@asanrom/smart-contract-wrapper";
import { logDebug } from "./log-debug";

const TestStatus = {
    indentation: 0,
};

// Gets indentation for tests
function getIndentation(): string {
    let res = "";

    for (let i = 0; i < TestStatus.indentation; i++) {
        res += "    ";
    }

    return res;
}

/**
 * Marks test as started
 * @param name The test name
 */
export function markTestStart(name: string) {
    console.log(`${getIndentation()}🧪  ${name}`);
    TestStatus.indentation++;
}

/**
 * Marks test as ended
 */
export function markTestEnd() {
    console.log("");
    TestStatus.indentation--;
}

/**
 * Marks test as passed
 * @param msg The test message
 */
export function markPassed(msg: string) {
    console.log(`${getIndentation()}✔️  ${msg}`);
}

/**
 * Marks test as failed
 * @param msg The test message
 */
export function markFailed(msg: string) {
    console.log(`${getIndentation()}❌  ${msg}`);
}

/**
 * Runs test
 * @param name The test name
 * @param testFunc The function to run
 */
export async function runTest(name: string, testFunc: () => Promise<void>): Promise<void> {
    markTestStart(name);

    try {
        await testFunc();
    } catch (ex) {
        console.error(ex);
        process.exit(1);
    }

    markTestEnd();
}

/**
 * Runs test case
 * @param msg The test message
 * @param testFunc The function to run
 */
export async function runTestCase(msg: string, testFunc: () => Promise<void>): Promise<void> {
    try {
        await testFunc();
    } catch (ex) {
        console.error(ex);
        markFailed(msg);
        process.exit(1);
    }

    markPassed(msg);
}

/**
 * Asserts that a promise will fail
 * @param promiseToFailCheck The promise to check
 * @param messageIfNoError The error message in case of no error
 */
export async function assertFailure(promiseToFailCheck: Promise<any>, messageIfNoError?: string): Promise<void> {
    try {
        await promiseToFailCheck;
    } catch (ex) {
        logDebug("Expected failure with message: " + ex.message);
        return;
    }

    throw new Error(messageIfNoError || "Expected failure, but no error was thrown.");
}

/**
 * Asserts that a transaction will revert
 * @param promiseToFailCheck The promise to send the transaction
 * @param messageIfNoError The error message in case of no error
 */
export async function assertRevert(promiseToFailCheck: Promise<TransactionResult<any>>, messageIfNoError?: string): Promise<void> {
    try {
        await promiseToFailCheck;
    } catch (ex) {
        if (!ex.message.toLowerCase().includes("execution reverted")) {
            throw ex;
        }
        logDebug("Expected failure with message: " + ex.message);
        return;
    }

    throw new Error(messageIfNoError || "Expected failure, but no error was thrown.");
}

/**
 * Asserts two hex values are equal
 * @param hex1 The hex value 1
 * @param hex2 The hex value 2
 * @param message The custom error message
 */
export function assertEqualHex(hex1: string, hex2: string, message?: string) {
    assert.equal(
        hexWithPrefix(hex1).toLowerCase(),
        hexWithPrefix(hex2).toLowerCase(),
        message,
    );
}
