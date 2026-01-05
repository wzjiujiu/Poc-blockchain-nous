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

// Time utils

"use strict";

/**
 * Asynchronously sleeps a number of milliseconds
 * @param ms Milliseconds to sleep
 * @returns A promise
 */
export function aSleep(ms: number): Promise<void> {
    return new Promise<void>(function (resolve) {
        setTimeout(resolve, ms);
    });
}

/**
 * Turns a timestamp into a formatted date.
 * @param timestamp The input timestamp.
 * @returns         The formatted date.
 */
export function formatDate(timestamp: number): string {
    const d: Date = new Date(timestamp);
    let day: string = "" + d.getDate();
    let month: string = "" + (d.getMonth() + 1);
    const year: string = "" + d.getFullYear();
    let hour: string = "" + d.getHours();
    let minutes: string = "" + d.getMinutes();
    let seconds: string = "" + d.getSeconds();

    if (day.length < 2) {
        day = "0" + day;
    }

    if (month.length < 2) {
        month = "0" + month;
    }

    if (hour.length < 2) {
        hour = "0" + hour;
    }

    if (minutes.length < 2) {
        minutes = "0" + minutes;
    }

    if (seconds.length < 2) {
        seconds = "0" + seconds;
    }

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}
