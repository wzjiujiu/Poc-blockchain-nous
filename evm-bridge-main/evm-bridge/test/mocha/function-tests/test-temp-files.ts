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

// Function tests

"use strict";

import Path from "path";
import assert from "assert";
import { makeTempFile, getTempFilePath, moveUploadedFileToTempFile } from "../../../src/utils/file-utils";

// Test group
describe("Temp files", () => {
    it('Should be able to create random temp files', async () => {
        const tempPath = Path.resolve(__dirname, "..", "..", "..", "temp");
        const randomTempFile = makeTempFile();

        assert.equal(Path.dirname(randomTempFile), tempPath);
    });

    it('Should be able to get a custom named temp file', async () => {
        const tempPath = Path.resolve(__dirname, "..", "..", "..", "temp");
        const randomTempFile = getTempFilePath("custom.txt");

        assert.equal(Path.dirname(randomTempFile), tempPath);
        assert.equal(Path.basename(randomTempFile), "custom.txt");
    });

    it('Should move an uploaded file to the temp path for handling', async () => {
        const tempPath = Path.resolve(__dirname, "..", "..", "..", "temp");
        
        const fakeUploadedFile: any = {
            name: "fake.txt",
            mv: (path: string, callback?: (err?: any) => void) => {
                try {
                    assert.equal(Path.dirname(path), tempPath);
                    if (callback) {
                        callback();
                    } else {
                        return Promise.resolve();
                    }
                } catch (err) {
                    if (callback) {
                        callback(err);
                    } else {
                        return Promise.reject(err);
                    }
                }
            },
        };

        const file = await moveUploadedFileToTempFile(fakeUploadedFile);

        assert.equal(Path.dirname(file), tempPath);
    });
});
