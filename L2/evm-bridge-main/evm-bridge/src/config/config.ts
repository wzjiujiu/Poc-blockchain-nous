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

// Main config

"use strict";

import OS from "os";
import { URL } from "url";

/**
 * Http configuration.
 */
export class HttpConfig {
    public port: number;
    public bindAddress: string;

    constructor() {
        this.port = 8080;
        this.bindAddress = "";
    }
}

/**
 * Https configuration.
 */
export class HttpsConfig extends HttpConfig {
    public certFile: string;
    public keyFile: string;

    constructor() {
        super();
        this.certFile = "";
        this.keyFile = "";
    }
}

/**
 * Application configuration.
 */
export class Config {

    /**
     * If this is true, the application is running on test mode
     * Use this frag to skip any non-test logic
     */
    public static IS_TEST = false;

    /**
     * Gets the configuration instance.
     */
    public static getInstance(): Config {
        if (Config.instance) {
            return Config.instance;
        }

        const config: Config = new Config();

        config.isProduction = process.env.NODE_ENV === "production";

        config.isTaskRunner = process.env.RUN_TASKS === "YES";

        config.externalUri = process.env.EXTERNAL_URI || "http://localhost";

        config.allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map(a => a.trim()).filter(a => !!a);

        config.numberOfWorkers = parseInt(process.env.WORKERS_NUMBER || "0") || OS.cpus().length;

        // Set HTTP config
        config.http = new HttpConfig();
        config.http.port = parseInt(process.env.SERVER_HTTP_PORT || "80") || 80;
        config.http.bindAddress = process.env.SERVER_HTTP_ADDRESS || "";

        // Set https config
        config.https = new HttpsConfig();
        config.https.port = parseInt(process.env.SERVER_HTTPS_PORT || "443") || 443;
        config.https.bindAddress = process.env.SERVER_HTTPS_ADDRESS || "";
        config.https.certFile = process.env.SERVER_HTTPS_CERTIFICATE || "";
        config.https.keyFile = process.env.SERVER_HTTPS_KEY || "";

        config.redirectSecure = process.env.SERVER_REDIRECT_SECURE === "YES";

        config.maxUploadFileSize = Number(process.env.MAX_UPLOAD_FILE_SIZE || "1073741824") || (1073741824); // 1 GB by default

        config.usingProxy = process.env.USING_PROXY === "YES";

        config.serveFrontend = process.env.SERVE_FRONTEND !== "NO";
        config.frontendPath = process.env.FRONTEND_PATH || "../frontend/dist";

        config.serveAcmeChallenge = process.env.SERVE_ACME_CHALLENGE === "YES";
        config.acmeChallengePath = process.env.ACME_CHALLENGE_PATH || "/var/www/certbot";

        config.serveSwaggerDocs = process.env.SERVE_SWAGGER_DOCS !== "NO";

        Config.instance = config;

        return config;
    }
    private static instance: Config = null;

    public isProduction: boolean;

    public isTaskRunner: boolean;

    public externalUri: string;

    public http: HttpConfig;
    public https: HttpsConfig;
    public numberOfWorkers: number;
    public redirectSecure: boolean;

    public maxUploadFileSize: number;

    public usingProxy: boolean;

    public allowedOrigins: string[];

    public serveFrontend: boolean;
    public frontendPath: string;

    public serveAcmeChallenge: boolean;
    public acmeChallengePath: string;

    public serveSwaggerDocs: boolean;

    /**
     * Gets the backend host
     * @returns The backend host
     */
    public getHost() {
        return (new URL(this.externalUri)).host;
    }

    /**
     * Gets an external URI
     * @param path The path
     * @returns The URI
     */
    public getExternalURI(path: string): string {
        return (new URL(path, this.externalUri)).toString();
    }
}
