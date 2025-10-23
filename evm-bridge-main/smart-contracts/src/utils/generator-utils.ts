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

// Generator utils

"use strict";

import { JsonFragmentType } from "@asanrom/smart-contract-wrapper";

/**
 * Transforms a class name into typescript file name
 * @param className The class name
 * @returns The typescript file name
 */
export function toTypescriptFileName(className: string) {
    let res = "";
    let s = 0;

    for (let i = 0; i < className.length; i++) {
        const c = className.charAt(i);

        if (c === "_") {
            if (res) {
                res += "-";
            }
            s = 1;
        } else {
            const isBreaker = c.toLowerCase() !== c;

            if (isBreaker) {
                if (s === 0) {
                    if (res) {
                        res += "-";
                    }
                }

                s = 1;
            } else {
                s = 0;
            }

            res += c.toLowerCase();
        }
    }

    return res;
}

/**
 * Computes class name from contract key
 * @param contractKey The contract key
 * @returns The class name
 */
export function toClassName(contractKey: string): string {
    return contractKey.charAt(0).toUpperCase() + contractKey.substring(1);
}

/**
 * Turns a model class name into a table name
 * @param className The class name
 * @returns The table name
 */
export function toTableName(className: string) {
    return toTypescriptFileName(className).replace(/\-/g, "_");
}

/**
 * Gets the model type to use depending on the ABI type
 * @param t The input fragment
 * @returns The type
 */
export function getModelType(t: JsonFragmentType): string {
    if (t.type === "bool") {
        return "boolean";
    } else {
        return "string";
    }
}

/**
 * Gets the model type default value to use depending on the ABI type
 * @param t The input fragment
 * @returns The type default value
 */
export function getModelTypeDefaultValue(t: JsonFragmentType): string {
    if (t.type === "bool") {
        return "false";
    } else {
        return "''";
    }
}

/**
 * Gets the model database type to use depending on the ABI type
 * @param t The input fragment
 * @returns The database type
 */
export function getModelDatabaseType(t: JsonFragmentType): string {
    if (t.type === "bool") {
        return "boolean";
    } else if (['address', 'bytes32'].includes(t.type)) {
        return "VARCHAR 255";
    } else if (t.type && (t.type.startsWith("uint") || t.type.startsWith("int")) && !t.type.endsWith("]")) {
        return "VARCHAR 255";
    } else {
        return "TEXT";
    }
}

/**
 * Gets the model property name for the input
 * @param t The input fragment
 * @param i The input index
 * @returns The name to use
 */
export function getModelPropertyName(t: JsonFragmentType, i: number): string {
    let sanitizedName = (t.name || "").replace(/\_/g, "");

    if (!sanitizedName) {
        sanitizedName = "p" + i;
    } else {
        sanitizedName = "p" + sanitizedName.charAt(0).toUpperCase() + sanitizedName.substring(1);
    }

    return sanitizedName;
}

/**
 * Checks if the event input is indexed and can be indexed
 * @param t The input fragment
 * @returns True if indexed
 */
export function eventInputIsIndexed(t: JsonFragmentType) {
    return t.indexed && [
        'bool', 
        'address', 
        'uint8', 'uint16', 'uint32', 'uint64', 'uint128', 'uint256', 
        'int8', 'int16', 'int32', 'int64', 'int128', 'int256', 
        'bytes32'
    ].includes(t.type);
}

/**
 * Prettifies JSON for the code
 * @param abi The ABI JSON
 * @returns The prettified JSON
 */
export function prettifyJsonAbi(abi: any): string {
    return JSON.stringify(abi, null, "\t")
        .replace(/[\n\r\t]+/g, " ")
        .replace(/\[\s\{/g, "[{")
        .replace(/\}\s\]/g, "}]")
        .replace(/\[\s\[/g, "[[")
        .replace(/\]\s\]/g, "]]");
}
