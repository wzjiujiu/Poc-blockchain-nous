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

// Websocket controller

"use strict";

import WebSocket from "ws";
import HTTP from "http";
import { AsyncQueue } from "@asanrom/async-tools";
import { Monitor } from "../../monitor";
import { RequestLogger } from "../../utils/request-log";

const WS_QUEUE_SIZE = 20;

/**
 * Websocket controller
 */
export class WebsocketController {
    public request: HTTP.IncomingMessage;
    public socket: WebSocket.WebSocket;
    public interval: any;
    public busy: boolean;
    public closed: boolean;

    public initT: number;
    public lastAliveT: number;

    public queue: AsyncQueue;

    public logger: RequestLogger;

    public eventListeners: { [event: string]: (any) => any };

    constructor(ws: WebSocket.WebSocket, req: HTTP.IncomingMessage) {
        this.closed = false;
        this.request = req;
        this.socket = ws;
        this.logger = new RequestLogger();
        this.busy = false;
        this.interval = null;
        this.queue = new AsyncQueue(WS_QUEUE_SIZE, this.parseMessage.bind(this));
        this.queue.on('error', error => {
            Monitor.exception(error);
        });
    }

    /* General */

    public async tick() {
        if (Date.now() - this.initT > 24 * 60 * 60 * 1000) {
            Monitor.debug("Too much time connected, killing websocket");
            this.kill();
            return; // Too much time connected
        }

        if (Date.now() - this.lastAliveT > 60 * 1000) {
            Monitor.debug("Socket not alive");
            this.kill();
            return; // Timeout
        }
    }

    public send(message: any) {
        if (this.closed) {
            return;
        }
        this.socket.send(JSON.stringify(message));
    }

    public message(msg: string | Buffer | ArrayBuffer) {
        if (!msg) { return; }
        if (msg instanceof Buffer) {
            msg = msg.toString("utf8");
        }
        if (msg === "a") {
            this.lastAliveT = Date.now();
            return;
        }
        if (typeof msg === "string") {
            let msgParsed: any;
            try {
                msgParsed = JSON.parse(msg);
            } catch (ex) {
                Monitor.debug("Received invalid message: " + msg);
                return;
            }

            if (msgParsed.type === "a") {
                this.lastAliveT = Date.now();
            } else {
                this.queue.push(msgParsed);
            }
        } else {
            Monitor.debug("Received invalid message: " + JSON.stringify(msg));
            return;
        }
    }

    public async parseMessage(msg) {
        //Monitor.debug("Received message from socket: " + JSON.stringify(msg));

        switch (msg.type) {
            case "promise":
                this.send({ event: "resolved" });
                break;
            default:
                Monitor.debug("Unknown message type: " + msg.type);
        }
    }

    /* Open / Close */

    public async close() {
        // Close
        this.closed = true;

        // Destroy intervals
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        // Destroy queue
        await this.queue.destroy();
    }

    public kill() {
        this.socket.close();
    }

    public start() {
        this.logger.info("WEBSOCKET " + this.request.url + " FOR " + this.request.socket.remoteAddress);

        this.initT = Date.now();
        this.lastAliveT = Date.now();

        this.socket.on("message", this.message.bind(this));
        this.socket.on("close", this.close.bind(this));

        this.interval = setInterval(this.tick.bind(this), 1000);

        // Send client version
        this.send({ event: "hello" });
    }
}
