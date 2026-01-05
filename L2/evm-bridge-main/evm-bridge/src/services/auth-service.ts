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

// Auth service

"use strict";

import { AsyncSemaphore } from "@asanrom/async-tools";
import Express from "express";
import { Monitor } from "../monitor";
import { createLocalJWKSet, createRemoteJWKSet, JSONWebKeySet, jwtVerify } from "jose";
import { AuthConfig } from "../config/config-auth";
import { readFile } from "fs";

type JWKSet = ReturnType<typeof createLocalJWKSet> | ReturnType<typeof createRemoteJWKSet>;

/**
 * Periodic tasks service
 */
export class AuthService {
    /* Singleton */

    public static instance: AuthService = null;

    public static getInstance(): AuthService {
        if (AuthService.instance) {
            return AuthService.instance;
        } else {
            AuthService.instance = new AuthService();
            return AuthService.instance;
        }
    }

    // THe JWK set (local or remote)
    private jwks: JWKSet;
    private sem: AsyncSemaphore;

    constructor() {
        this.jwks = null;
        this.sem = new AsyncSemaphore(1);
    }

    private async loadLocalJWKSetFile(): Promise<JSONWebKeySet> {
        return new Promise<JSONWebKeySet>((resolve, reject) => {
            readFile(AuthConfig.getInstance().jwkSetFilePath, (err, data) => {
                if (err) {
                    return reject(err);
                }

                try {
                    resolve(JSON.parse(data.toString()));
                } catch (ex) {
                    reject(ex);
                }
            });
        });
    }

    private async getJWKSSet(): Promise<JWKSet> {
        if (this.jwks) {
            return this.jwks;
        }

        await this.sem.acquire();

        if (this.jwks) {
            return this.jwks;
        }

        try {
            if (AuthConfig.getInstance().jwkSetType === "REMOTE") {
                this.jwks = createRemoteJWKSet(new URL(AuthConfig.getInstance().jwkSetUrl));
            } else {
                const keySet: JSONWebKeySet = await this.loadLocalJWKSetFile();
                this.jwks = createLocalJWKSet(keySet);
            }
        } catch (ex) {
            this.sem.release();
            throw ex;
        }

        this.sem.release();

        return this.jwks;
    }

    /**
     * Resolves auth of a request
     * @param request The request
     * @returns The auth status
     */
    public async resolveAuth(request: Express.Request): Promise<AuthStatus> {
        const jwks = await this.getJWKSSet();

        let token = ((request.headers.authorization || "") + "");

        if (token.includes(" ")) {
            // Remove the 'Bearer ' part
            token = token.split(" ").slice(1).join(" ");
        }

        if (!token) {
            return {
                authorized: false,
                errorCode: "NO_AUTH_TOKEN",
                errorMessage: 'No Authorization token provided',
            };
        }

        let user = "";

        const issuer = AuthConfig.getInstance().issuer;
        const audience = AuthConfig.getInstance().audience;

        request.logger.debug(`[SIMPL] Validating JWT. Expected Issuer: ${issuer}. Expected audience: ${audience}. Token: ${token}`);

        try {
            const { payload } = await jwtVerify(token, jwks, {
                issuer,
                audience,
            });

            user = payload.sub || "";
        } catch (ex) {
            Monitor.debugException(ex);
            request.logger.debug(`[SIMPL] Invalid JWT. Code: ${ex.code}. Message: ${ex.message}`);
            return {
                authorized: false,
                errorCode: ex.code || "INVALID_JWT",
                errorMessage: ex.message,
            };
        }

        return {
            authorized: true,
            user,
        };
    }
}


/**
 * Authorization status
 */
export interface AuthStatus {
    /**
     * True if authorized, false otherwise
     */
    authorized: boolean;

    /**
     * User ID
     */
    user?: string;

    /**
     * Custom error code for the response
     */
    errorCode?: string;

    /**
     * Custom error message for the response
     */
    errorMessage?: string;
}
