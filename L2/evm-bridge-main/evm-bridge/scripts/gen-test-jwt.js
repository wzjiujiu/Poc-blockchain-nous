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

// Script to generate test JWT

require('dotenv').config();

const Path = require("path");
const FS = require("fs");
const JOSE = require('jose');

const SUB = process.argv[2] || "test-user";

const ISSUER = process.env.SIMPL_ISSUER || "simpl-idp";
const AUDIENCE = process.env.SIMPL_AUDIENCE || "evm-bridge";

async function main() {
    const KEY = await JOSE.importJWK(JSON.parse(FS.readFileSync(Path.resolve(__dirname, "..", "test", "keys", "private.json")).toString()), "EdDSA");

    const jwt = await new JOSE.SignJWT({
        sub: SUB
    })
        .setProtectedHeader({ alg: "EdDSA" })
        .setIssuedAt()
        .setIssuer(ISSUER)
        .setAudience(AUDIENCE)
        .setExpirationTime('24h')
        .sign(KEY);

    console.log("TOKEN: " + jwt);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
