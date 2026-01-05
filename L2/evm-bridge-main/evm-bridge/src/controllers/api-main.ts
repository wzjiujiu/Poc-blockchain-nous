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

// API entry file

"use strict";

import FS from "fs";
import Path from "path";
import Express from "express";
import { Config } from "../config/config";
import { NOT_FOUND, sendApiError, UNAUTHORIZED } from "../utils/http-utils";
import { Controller } from "./controller";
import { Monitor } from "../monitor";
import { AuthService } from "../services/auth-service";

const API_PREFIX = "/api/v1";

/**
 * API (Version 1.0)
 */
export class ApiVersion1Controller extends Controller {
    public register(application: Express.Express): any {
        // API auth handler
        application.all(API_PREFIX + "/*", this.apiAuthHandler.bind(this));

        // Register API controllers
        const files = FS.readdirSync(Path.resolve(__dirname, "api"));
        for (const file of files) {
            if (file.endsWith(".js") || file.endsWith(".ts")) {
                try {
                    const controllerModule = require(Path.resolve(__dirname, "api", file));
                    for (const key of Object.keys(controllerModule)) {
                        const controller = controllerModule[key];
                        if (controller && controller.prototype && typeof controller.prototype.register === "function") {
                            const instance: Controller = new controller();
                            instance.registerAPI(API_PREFIX, application);
                            Monitor.debug("Registered API controller: " + key);
                        }
                    }
                } catch (ex) {
                    Monitor.exception(ex);
                }
            }
        }

        // Documentation
        if (Config.getInstance().serveSwaggerDocs) {
            application.get(API_PREFIX + "/", this.redirectToDoc.bind(this));
        }

        // Not found (default)
        application.all(API_PREFIX + "/*", this.notFound.bind(this));
    }

    public async redirectToDoc(_request: Express.Request, response: Express.Response) {
        response.redirect("/api-docs");
    }

    public async notFound(request: Express.Request, response: Express.Response) {
        sendApiError(request, response, NOT_FOUND, "API_NOT_FOUND", "The requested URL does not match with any of the API endpoints.");
    }

    /**
      * Handler for API auth
      * @param request The request object.
      * @param response The response object.
      * @param next The callback.
      */
    private async apiAuthHandler(request: Express.Request, response: Express.Response, next: () => void) {
        const authStatus = await AuthService.getInstance().resolveAuth(request);

        if (!authStatus.authorized) {
            sendApiError(request, response, UNAUTHORIZED, authStatus.errorCode || "UNAUTHORIZED", authStatus.errorMessage || "Unauthorized");
            return;
        }

        request.user = authStatus.user;

        next();
    }
}
