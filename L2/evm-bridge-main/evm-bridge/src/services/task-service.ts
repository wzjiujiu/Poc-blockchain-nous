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

// Tasks service

"use strict";

import { AsyncInterval } from "@asanrom/async-tools";
import { Monitor } from "../monitor";
import { Config } from "../config/config";

interface Task {
    id: string;
    interval: AsyncInterval;
    period: number;
    runOnStartup?: boolean,
}

/**
 * Periodic tasks service
 */
export class TaskService {
    /* Singleton */

    public static instance: TaskService = null;

    public static getInstance(): TaskService {
        if (TaskService.instance) {
            return TaskService.instance;
        } else {
            TaskService.instance = new TaskService();
            return TaskService.instance;
        }
    }

    public tasks: Task[];

    constructor() {
        this.tasks = [];
    }

    private createTask(id: string, period: number, handler: () => Promise<any>, runOnStartup?: boolean) {
        const task: Task = {
            id: id,
            period: period,
            interval: new AsyncInterval(handler, period),
            runOnStartup: runOnStartup,
        };

        task.interval.on("error", err => {
            Monitor.exception(err);
        });

        this.tasks.push(task);
    }

    private startIntervals() {
        for (const task of this.tasks) {
            task.interval.start(task.runOnStartup);
        }
    }

    public start() {
        if (!Config.getInstance().isTaskRunner) {
            return;
        }

        Monitor.status("Task service starting...");

        this.tasks = [];

        // Start
        this.startIntervals();
    }
}
