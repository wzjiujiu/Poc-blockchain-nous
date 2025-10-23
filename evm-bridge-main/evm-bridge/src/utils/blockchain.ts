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

// Blockchain and smart contract utilities

"use strict";

import { ABILike, hexNoPrefix, InputABIParams, JsonFragmentType, OutputABIParam, OutputABIParams } from "@asanrom/smart-contract-wrapper";
import { hexWithPrefix } from "./hex";
import { ObjectSchema } from "@asanrom/javascript-object-sanitizer";
import { padNumber } from "./text-utils";
import { JsonFragment } from "ethers";
import { isBigInteger, parseBigInteger } from "./bigint";
import { Monitor } from "../monitor";

/* Addresses */

/**
 * Zero address
 */
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

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
 * Validates an Ethereum address
 * @param addr The address 
 * @returns True if the address is valid
 */
export function validateAddress(addr: string): boolean {
    return ((/^0x[0-9a-f]{40}$/i).test(hexWithPrefix(addr)));
}

/* Bytes32 */

/**
 * Normalizes a bytes hex string to be in standard format
 * @param bytes The hex string
 * @returns The normalized hex string
 */
export function normalizeBytes32(bytes: string): string {
    return hexWithPrefix(bytes).toLowerCase();
}

/**
 * Compares 2 bytes hex strings
 * @param bytes1 Hex 1
 * @param bytes2 Hex 2
 * @returns True if they are equal
 */
export function compareBytes32(bytes1: string, bytes2: string): boolean {
    return normalizeBytes32(bytes1) === normalizeBytes32(bytes2);
}

/**
 * Validates a bytes32 hex string
 * @param bytes The hex string
 * @returns 
 */
export function validateBytes32(bytes: string): boolean {
    return (/^0x[0-9a-f]{64}$/i).test(bytes);
}

const JsonFragmentType_Schema = ObjectSchema.object({
    name: ObjectSchema.optional(ObjectSchema.string()),
    indexed: ObjectSchema.optional(ObjectSchema.boolean()),
    type: ObjectSchema.optional(ObjectSchema.string()),
    internalType: ObjectSchema.optional(ObjectSchema.string()),
    components: ObjectSchema.optional(ObjectSchema.array(ObjectSchema.recursive().withReference("json_fragment"))),
}).withId("json_fragment");

const ABI_Schema = ObjectSchema.array(
    ObjectSchema.object({
        name: ObjectSchema.optional(ObjectSchema.string()),
        type: ObjectSchema.optional(ObjectSchema.string()),
        anonymous: ObjectSchema.optional(ObjectSchema.boolean()),
        payable: ObjectSchema.optional(ObjectSchema.boolean()),
        constant: ObjectSchema.optional(ObjectSchema.boolean()),
        stateMutability: ObjectSchema.optional(ObjectSchema.string()),
        inputs: ObjectSchema.optional(ObjectSchema.array(JsonFragmentType_Schema).withDefaultValue([])),
        outputs: ObjectSchema.optional(ObjectSchema.array(JsonFragmentType_Schema).withDefaultValue([])),
        gas: ObjectSchema.optional(ObjectSchema.string()),
    })
).withDefaultValue([]);

/**
 * Sanitizes ABI
 * @param data The unsanitized data
 * @returns The sanitized ABI
 */
export function sanitizeAbi(data: any): ABILike {
    return ABI_Schema.sanitize(data);
}

const SolidityFunctionParameterArraySchema = ObjectSchema.array(
    ObjectSchema.anyOf(
        [
            ObjectSchema.integer(),
            ObjectSchema.boolean(),
            ObjectSchema.array(ObjectSchema.anyOf([
                ObjectSchema.integer(),
                ObjectSchema.boolean(),
                ObjectSchema.string().withDefaultValue(""),
            ]).withDefaultSchema(ObjectSchema.string().withDefaultValue(""))),
            ObjectSchema.string().withDefaultValue(""),
        ]
    ).withDefaultSchema(ObjectSchema.string().withDefaultValue(""))
).withDefaultValue([]);


/**
 * Sanitizes Input ABI parameters
 * @param data The unsanitized data
 * @returns The sanitized parameters
 */
export function sanitizeAbiInputParameters(data: any): InputABIParams {
    return SolidityFunctionParameterArraySchema.sanitize(data);
}

export type StringifiedOutputParam = string | StringifiedOutputParam[];

/**
 * Stringifies ABI result param
 * @param p The param
 * @returns The stringified result
 */
export function stringifyOutputAbiParam(p: OutputABIParam): StringifiedOutputParam {
    if (typeof p === "object" && p) {
        if (p instanceof Buffer) {
            return hexWithPrefix(p.toString("hex"));
        } else if (Array.isArray(p)) {
            return p.map(stringifyOutputAbiParam);
        }
    } else {
        return p + "";
    }
}

/**
 * Stringifies ABI result
 * @param result The result
 * @returns The stringified result
 */
export function stringifyAbiResult(result: OutputABIParams): StringifiedOutputParam[] {
    return result.map(stringifyOutputAbiParam);
}

/**
 * Creates event UID for the database
 * @param block The block number
 * @param eventIndex The event index
 * @param txHash The hash of the transaction (hex)
 * @returns The ID to put in the database
 */
export function createEventUID(block: number, eventIndex: number, txHash: string): string {
    return `${padNumber(block.toString(16), 16)}-${padNumber(eventIndex.toString(16), 8)}-${hexNoPrefix(txHash).substring(0, 32)}`.toLowerCase();
}

const INT256_POWER = BigInt(2) ** BigInt(255);

const MAX_INT256 = INT256_POWER - BigInt(1);
const MIN_INT256 = -INT256_POWER;

const MAX_UINT256 = (BigInt(2) ** BigInt(256)) - BigInt(1);

/**
 * Normalizes a uint256 number to store in the database
 * @param bi The number
 * @returns The normalized hex string
 */
export function normalizeDatabaseUint256(bi: bigint): string {
    return "0x" + padNumber(bi.toString(16), 64).toLowerCase();
}

/**
 * Parses uint256 stored in the database
 * @param s The string stored in the database
 * @returns The BigInt
 */
export function parseDatabaseUint256(s: string): bigint {
    return parseBigInteger(s);
}

/**
 * Normalizes a int256 number to store in the database
 * @param bi The number
 * @returns The normalized hex string
 */
export function normalizeDatabaseInt256(bi: bigint): string {
    bi += INT256_POWER;
    return "0x" + padNumber(bi.toString(16), 64).toLowerCase();
}

/**
 * Parses int256 stored in the database
 * @param s The string stored in the database
 * @returns The BigInt
 */
export function parseDatabaseInt256(s: string): bigint {
    return parseBigInteger(s) - INT256_POWER;
}

/**
 * Normalizes and validates input parameter for smart contract call
 * @param input The value given by the user
 * @param t The ABI type definition
 * @returns The sanitized value and validation information
 */
export function normalizeAndValidateInputParameter(input: any, t: JsonFragmentType): [p: any, valid: boolean, invalidReason?: string] {
    if (input === null || input === undefined) {
        return [null, false, "Missing parameter"];
    }

    const abiType = t.type || "";

    const matchArray = (/\[([0-9]+)?\]$/).exec(abiType);

    if (matchArray) {
        const itemsType = abiType.substring(0, abiType.length - matchArray[0].length);

        if (!Array.isArray(input)) {
            return [null, false, "Expected an array, but found " + (typeof input)];
        }

        const res: any[] = [];

        for (let i = 0; i < input.length; i++) {
            const [itemVal, itemValid, itemInvalidReason] = normalizeAndValidateInputParameter(input[i], { type: itemsType, components: t.components });

            if (!itemValid) {
                return [null, false, `Item #${i} invalid: ${itemInvalidReason}`];
            }

            res.push(itemVal);
        }

        return [res, true];
    }

    if (abiType === "tuple") {
        return normalizeAndValidateInputParameters(input, { inputs: t.components || [] });
    }

    if (abiType === "string") {
        return ["" + input, true];
    } else if (abiType === "bool") {
        return [!!input, true];
    } else if (abiType.startsWith("uint")) {
        input = input + "";

        if (!isBigInteger(input)) {
            return [null, false, "Invalid uint256"];
        }

        const bi = parseBigInteger(input);

        if (bi < 0) {
            return [null, false, `Invalid ${abiType} (less than 0)`];
        }

        let bits = parseInt(abiType.substring(4), 10) || 256;

        if (bits > 256 || bits < 1) {
            bits = 256; 
        }

        const max = bits === 256 ? MAX_UINT256 : (BigInt(2) ** BigInt(bits));

        if (bi > max) {
            return [null, false, `Invalid ${abiType} (more than maximum)`];
        }

        return [bi, true];
    } else if (abiType.startsWith("int")) {
        input = input + "";

        if (!isBigInteger(input)) {
            return [null, false, "Invalid int256"];
        }

        const bi = parseBigInteger(input);

        let bits = parseInt(abiType.substring(4), 10) || 256;

        if (bits > 256 || bits < 1) {
            bits = 256; 
        }

        const min = bits === 256 ? MIN_INT256 : -(BigInt(2) ** BigInt(bits - 1));

        if (bi < min) {
            return [null, false, `Invalid ${abiType} (less than minimum)`];
        }

        const max = bits === 256 ? MAX_INT256 : ((BigInt(2) ** BigInt(bits - 1)) - BigInt(1));

        if (bi > max) {
            return [null, false, `Invalid ${abiType} (more than maximum)`];
        }

        return [bi, true];
    } else if (abiType === "address") {
        const address = normalizeAddress(input + "");

        if (!validateAddress(address)) {
            return [null, false, "Invalid address"];
        }

        return [address, true];
    } else if (abiType === "bytes32") {
        const b = normalizeBytes32(input + "");

        if (!validateBytes32(b)) {
            return [null, false, "Invalid bytes32"];
        }

        return [b, true];
    } else if (abiType === "bytes") {
        let b: Buffer;

        try {
            b = Buffer.from(hexNoPrefix(input + ""), "hex");
        } catch (ex) {
            return [null, false, "Invalid bytes: " + ex.message];
        }

        return [b, true];
    } else {
        return [null, false, "Unsupported ABI type: " + t.type];
    }
}

/**
 * Normalizes and validates a list of parameters
 * @param input The input provided by the user
 * @param fragment The JSON ABI fragment of the method
 * @returns The normalized input, and validation information
 */
export function normalizeAndValidateInputParameters(input: any, fragment: JsonFragment): [p: any[], valid: boolean, invalidReason?: string] {
    const inputs = fragment.inputs || [];
    const res: any[] = [];

    for (let i = 0; i < inputs.length; i++) {
        const t = inputs[i];
        const pName = t.name || ("_" + i);

        const [pVal, pValid, pInvalidReason] = normalizeAndValidateInputParameter(input[pName], t);

        if (!pValid) {
            return [[], false, `Invalid parameter value for '${pName}': ${pInvalidReason}`];
        }

        res.push(pVal);
    }

    return [res, true];
}

/**
 * Serializes result given by a smart contract call
 * @param p The raw result
 * @param t The type definition
 * @returns The serialized result
 */
export function serializeOutputABIParam(p: OutputABIParam, t: JsonFragmentType): any {
    const abiType = t.type || "";

    const matchArray = (/\[([0-9]+)?\]$/).exec(abiType);

    if (matchArray) {
        const itemsType = abiType.substring(0, abiType.length - matchArray[0].length);

        if (!Array.isArray(p)) {
            return [];
        }

        return (p as OutputABIParam[]).map(i => serializeOutputABIParam(i, { type: itemsType, components: t.components }));
    }

    if (abiType === "tuple") {
        if (!Array.isArray(p)) {
            return [];
        }

        return serializeOutputABIParams(p as OutputABIParam[], { outputs: t.components || [] })
    }

    if (typeof p === "boolean") {
        return p;
    }

    return stringifyOutputAbiParam(p);
}

/**
 * Serializes result provided by a smart contract call
 * @param result The result
 * @param fragment The ABI definition of the function
 * @returns The serialized result
 */
export function serializeOutputABIParams(result: OutputABIParams, fragment: JsonFragment): any {
    const outputs = fragment.outputs || [];

    const res = Object.create(null);

    for (let i = 0; i < outputs.length; i++) {
        const t = outputs[i];
        const pName = t.name || ("_" + i);

        res[pName] = serializeOutputABIParam(result[i], t);
    }

    return res;
}

/**
 * Serializes parameters of an event
 * @param result The result
 * @param fragment The ABI definition of the event
 * @returns The serialized result
 */
export function serializeEventABIParams(params: (string | boolean)[], fragment: JsonFragment): any {
    // De-normalize params

    const result: OutputABIParam[] = (fragment.inputs || []).map((input, i) => {
        const val = params[i];

        const abiType = input.type || "";

        const isArray = abiType.endsWith("]");

        if (!isArray && abiType.startsWith("uint")) {
            return parseDatabaseUint256(val + "").toString(10);
        } else if (!isArray && abiType.startsWith("int")) {
            return parseDatabaseInt256(val + "").toString(10);
        } else if (["address", "string", "bytes32", "bytes", "bool"].includes(input.type)) {
            return val;
        } else {
            try {
                return JSON.parse(val + "");
            } catch (ex) {
                Monitor.debugException(ex);
                return val + "";
            }
        }
    });

    // Serialize

    return serializeOutputABIParams(result, { outputs: fragment.inputs });
}
