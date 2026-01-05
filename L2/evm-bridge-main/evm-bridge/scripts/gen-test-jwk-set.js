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

// Script to generate 

const Crypto = require("crypto");
const FS = require("fs");
const Path = require("path");

async function main() {
    const keyPair = Crypto.generateKeyPairSync("ed25519");

    console.log();

    FS.writeFileSync(
        Path.resolve(__dirname, "..", "test", "keys", "private.json"),
        JSON.stringify(keyPair.privateKey.export({ format: "jwk" }), null, 4),
    );

    FS.writeFileSync(
        Path.resolve(__dirname, "..", "test", "keys", "public-key-set.json"),
        JSON.stringify({
            keys: [
                keyPair.publicKey.export({ format: "jwk" }),
            ],
        }, null, 4),
    );

    console.log("Generated test key-pair for SIMPL (test/keys).");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
