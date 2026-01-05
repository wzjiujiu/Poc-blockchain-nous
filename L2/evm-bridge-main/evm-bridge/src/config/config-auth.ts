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

// Auth config

"use strict";

import Path from "path";

/**
 * Auth configuration 
 */
export class AuthConfig {

    /**
     * Gets the configuration instance.
     */
    public static getInstance(): AuthConfig {
        if (AuthConfig.instance) {
            return AuthConfig.instance;
        }

        const config: AuthConfig = new AuthConfig();

        config.jwkSetType = (process.env.SIMPL_JWK_SET_TYPE || "LOCAL").toUpperCase() as any;

        if (!["LOCAL", "REMOTE"].includes(config.jwkSetType)) {
            throw new Error("Invalid SIMPL_JWK_SET_TYPE (must be LOCAL or REMOTE)")
        }

        config.jwkSetFilePath = process.env.SIMPL_JWK_SET_FILE_PATH || Path.resolve(__dirname, "..", "..", "test", "keys", "public-key-set.json");

        config.jwkSetUrl = process.env.SIMPL_JWK_SET_URL || "";

        config.issuer = process.env.SIMPL_ISSUER || "simpl-idp";

        config.audience = process.env.SIMPL_AUDIENCE || "evm-bridge";
        
        AuthConfig.instance = config;

        return config;
    }
    private static instance: AuthConfig = null;

    public jwkSetType: "REMOTE" | "LOCAL";

    public jwkSetFilePath: string;
    public jwkSetUrl: string;

    public issuer: string;

    public audience: string;
}
