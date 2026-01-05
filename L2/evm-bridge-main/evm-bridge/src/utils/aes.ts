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

// AES encryption

"use strict";

import Crypto from "crypto";

export function encrypt(text: string | Buffer, password: string) {
    const iv = Buffer.from(Crypto.randomBytes(16));
    const hash = Crypto.createHash('sha256');
    hash.update(password);
    const cipher = Crypto.createCipheriv('aes-256-ctr', hash.digest(), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("base64");
}

export function decrypt(text: string, password: string): Buffer {
    const colonIndex = text.indexOf(":");
    const iv = Buffer.from(text.substr(0, colonIndex), 'hex');
    const cipherText = Buffer.from(text.substr(colonIndex + 1), 'base64');
    const hash = Crypto.createHash('sha256');
    hash.update(password);
    const decipher = Crypto.createDecipheriv('aes-256-ctr', hash.digest(), iv);
    let data = decipher.update(cipherText);
    data = Buffer.concat([data, decipher.final()]);
    return data;
}
