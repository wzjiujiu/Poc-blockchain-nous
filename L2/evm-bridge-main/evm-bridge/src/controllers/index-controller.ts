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

// Index controller

"use strict";

import Express from "express";
import { Controller } from "./controller";
import { Config } from "../config/config";

/**
 * Index controller
 */
export class IndexController extends Controller {
    constructor() {
        super();
    }

    public register(application: Express.Express): any {
        // Root and health check
        application.get("/", this.rootPath.bind(this));
        application.get("/health", this.healthCheck.bind(this));
    }

    public async rootPath(_request: Express.Request, response: Express.Response) {
        if (Config.getInstance().serveSwaggerDocs) {
            response.redirect("/api-docs");
        } else {
            response.send("WeForming Identity Proxy");
        }
    }

    public async healthCheck(_request: Express.Request, response: Express.Response) {
        response.send("OK");
    } 
}
