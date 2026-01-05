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

// Blockchain utils

"use strict";

import Crypto from "crypto";
import { hexWithPrefix, InputABIParam, JsonFragment, OutputABIParam } from "@asanrom/smart-contract-wrapper";
import { keccak256 } from "ethereum-cryptography/keccak";

/**
 * Zero address
 */
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

/**
 * Zero bytes32
 */
export const ZERO_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000";

/**
 * Turns address into standard format
 * @param addr The address
 * @returns The normalized address
 */
export function normalizeAddress(addr: string): string {
    return hexWithPrefix(addr).toLowerCase();
}

/**
 * Compares two addresses
 * @param addr1 Address 1
 * @param addr2 Address 2
 * @returns True if the address are equal
 */
export function compareAddresses(addr1: string, addr2: string): boolean {
    return normalizeAddress(addr1) === normalizeAddress(addr2);
}

/**
 * Checks if an address is the zero address
 * @param addr The address
 * @returns True if the address is the zero address
 */
export function isZeroAddress(addr: string): boolean {
    return compareAddresses(ZERO_ADDRESS, addr);
}

/**
 * Turns event output parameter to string
 * @param param The parameter value
 * @returns The stringified value
 */
export function eventParameterToString(param: OutputABIParam | InputABIParam): string {
    if (typeof param === "object") {
        if (Array.isArray(param)) {
            return JSON.stringify(param.map(eventParameterToString));
        } else if (param instanceof Buffer) {
            return "0x" + param.toString("hex");
        } else {
            return param + "";
        }
    } else {
        return param + "";
    }
}

/**
 * Validates an Ethereum address
 * @param addr The address 
 * @returns True if the address is valid
 */
export function validateAddress(addr: string): boolean {
    return ((/^0x[0-9a-f]{40}$/i).test(hexWithPrefix(addr)));
}

/**
 * Creates random bytes32 value
 * @returns The random bytes32 value
 */
export function randomBytes32(): string {
    return "0x" + Crypto.randomBytes(32).toString("hex").toLowerCase();
}

/**
 * Computes function selector
 * @param f The function ABI fragment
 * @returns The selector
 */
export function computeFunctionSelector(f: JsonFragment): string {
    const signature = f.name + "(" + (f.inputs || []).map(i => i.type).join(",") + ")";
    return Buffer.from(keccak256(Buffer.from(signature, "utf-8"))).toString("hex").substring(0, 8).toLowerCase();
}
