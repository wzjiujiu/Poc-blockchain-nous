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

// Text utils

"use strict";

import Crypto from "crypto";
import * as uuid from "uuid";

/**
 * Removes accents and diacritics.
 * @param str   The input string
 * @returns     The normalized string
 */
export function normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Escapes html reserved characters.
 * @param html      Input HTML text.
 * @returns         The escaped text.
 */
export function escapeHTML(html: string): string {
    return ("" + html).replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;").replace(/\//g, "&#x2f;");
}

/**
 * Escapes single quotes and reverse bars
 * @param raw The raw input text
 * @returns The escaped text.
 */
export function escapeSingleQuotes(raw: string): string {
    return ("" + raw).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

/**
 * Escapes double quotes and reverse bars.
 * @param raw The raw input text
 * @returns The escaped text.
 */
export function escapeDoubleQuotes(raw: string): string {
    return ("" + raw).replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}

/**
 * Validates an email.
 * @param email The email
 */
export function validateEmail(email: string): boolean {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}

/**
 * Escapes regular expressions espacial characters.
 * @param text The input text.
 */
export function escapeRegExp(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

/**
 * Pads number
 * @param n Number
 * @param d Number of digits
 * @returns The padded number
 */
export function padNumber(n: number | string, d: number): string {
    let str = n + "";
    while (str.length < d) {
        str = "0" + str;
    }
    return str;
}

/**
 * Incremental ID, pure Hex, use for
 * most IDs and streaming rooms, etc
 */
export function createRandomUID(): string {
    return uuid.v7();
}

/**
 * Creates a random hex token. Use for streaming keys.
 */
export function createRandomToken(): string {
    return (`${Crypto.randomBytes(32).toString("hex")}`).toLowerCase();
}

/**
 * Compares string (time-secure)
 * @param a First string
 * @param b Second string
 * @returns True if they match, false if they don't
 */
export function secureStringCompare(a: string, b: string): boolean {
    try {
        return Crypto.timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));
    } catch (ex) {
        return false;
    }
}

/**
 * Validates an URL
 * @param url The URL
 * @returns True if the URL is valid
 */
export function validateURL(url: string): boolean {
    try {
        const u = new URL(url);
        if (u.protocol !== "http:" && u.protocol !== "https:") {
            return false;
        }
    } catch (ex) {
        return false;
    }
    return true;
}

/**
 * Turns a base 64 certificate into PEM format
 * @param b64 The base 64 string
 * @returns The PEM encoded certificate
 */
export function base64ToPEM(b64: string): string {
    const str = [];
    
    str.push("-----BEGIN CERTIFICATE-----");

    while (b64.length > 64) {
        str.push(b64.substr(0, 64));
        b64 = b64.substr(64);
    }

    if (b64.length > 0) {
        str.push(b64);
    }

    str.push("-----END CERTIFICATE-----");

    return str.join("\n");
}

/**
 * Turns a PEM encoded certificate into base 64
 * @param cert The PEM encoded certificate
 * @returns The base 64 string
 */
export function certToBase64(cert: string) {
    return cert.replace("-----BEGIN CERTIFICATE-----", "").replace("-----END CERTIFICATE-----", "").replace(/[^A-Za-z0-9+/=]/g, '').trim();
}

