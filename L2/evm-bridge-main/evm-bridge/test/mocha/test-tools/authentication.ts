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

// API authentication

"use strict";

import { RequestParams } from "@asanrom/request-axios";
import FS from "fs";
import Path from "path";
import * as JOSE from "jose";

export class APIAuthentication {
    public static Unauthenticated(): APIAuthentication {
        return new APIAuthentication("");
    }

    /**
     * Generates a token for an user
     * @param user The user ID
     * @returns The token
     */
    public static async GenerateToken(user: string): Promise<APIAuthentication> {
        const ISSUER = process.env.SIMPL_ISSUER || "simpl-idp";
        const AUDIENCE = process.env.SIMPL_AUDIENCE || "evm-bridge";

        const KEY = await JOSE.importJWK(JSON.parse(FS.readFileSync(Path.resolve(__dirname, "..", "..", "keys", "private.json")).toString()), "EdDSA");

        const jwt = await new JOSE.SignJWT({
            sub: user
        })
            .setProtectedHeader({ alg: "EdDSA" })
            .setIssuedAt()
            .setIssuer(ISSUER)
            .setAudience(AUDIENCE)
            .setExpirationTime('24h')
            .sign(KEY);

        return new APIAuthentication(jwt);
    }

    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    public getToken(): string {
        return this.token;
    }

    public applyToRequestParams<T>(params: RequestParams<T>): RequestParams<T> {
        const headers = Object.create(null);

        if (params.headers) {
            for (let key of Object.keys(params.headers)) {
                headers[key] = params.headers[key];
            }
        }

        if (this.token) {
            headers["Authorization"] = "Bearer " + this.token;
        }

        return {
            method: params.method,
            url: params.url,
            headers: headers,
            json: params.json,
            form: params.form,
            handleError: params.handleError,
        };
    }
}
