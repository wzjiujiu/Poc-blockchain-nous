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

// File storage config

"use strict";

import { Monitor } from "../monitor";
import { Config } from "./config";

export type FileStorageMode = "fs";

/**
 * File storage configuration 
 */
export class FileStorageConfig {

    /**
     * Gets the configuration instance.
     */
    public static getInstance(): FileStorageConfig {
        if (FileStorageConfig.instance) {
            return FileStorageConfig.instance;
        }

        const config: FileStorageConfig = new FileStorageConfig();

        switch (((process.env.FILE_STORAGE_MODE || "fs") + "").toLowerCase()) {
            case "fs":
            case "filesystem":
                config.storageMode = "fs";
                config.fileSystemPath = process.env.FILE_STORAGE_FS_PATH || "./data";
                config.privateFilesSecret = process.env.FILE_STORAGE_PRIVATE_SECRET || "";
                config.staticFilesBaseURL = process.env.FILE_STORAGE_SERVER_URL || Config.getInstance().getExternalURI("/static/");
                break;
            default:
                throw new Error("Configuration error: Unknown file storage type: " + process.env.FILE_STORAGE_MODE);
        }

        if (!config.privateFilesSecret) {
            Monitor.warning("The FILE_STORAGE_PRIVATE_SECRET variable is not set or empty. Private files authentication will fail.");
        }

        FileStorageConfig.instance = config;

        return config;
    }
    private static instance: FileStorageConfig = null;

    public storageMode: FileStorageMode;

    public staticFilesBaseURL: string;

    public privateFilesSecret: string;

    public fileSystemPath: string;

    constructor() {
        this.storageMode = "fs";
        this.fileSystemPath = "./data";
        this.privateFilesSecret = "secret";
        this.staticFilesBaseURL = "/static/";
    }
}
