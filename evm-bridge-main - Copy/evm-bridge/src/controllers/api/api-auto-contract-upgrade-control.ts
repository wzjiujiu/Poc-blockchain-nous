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

// Smart contract synchronizer for UpgradeControl
// WARNING: THIS FILE IS AUTO-GENERATED. DO NOT ADD ANY CHANGES OR THEY MAY BE LOST THE NEXT TIME YOU GENERATE THE CODE

"use strict";

import Express from "express";
import { Controller } from "../controller";
import { noCache, sendApiResult } from "../../utils/http-utils";
import { SmartContractsConfig } from "../../config/config-smart-contracts";
import { ContractEventStatus } from "../../models/contract-event-status";
import { normalizeAddress } from "../../utils/blockchain";
import { UpgradeControlWrapper } from "../../contracts/upgrade-control";

/**
 * Auto generated smart contract API
 * Contract UpgradeControl (UpgradeControl)
 * This file contains the base API for the smart contract
 * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
 */
export class UpgradeControlContractApiBasicController extends Controller {
    public registerAPI(prefix: string, application: Express.Express) {
        application.get(prefix + "/contracts/upgrade-control", noCache(this.getSmartContractInformation.bind(this)));
    }

    /**
     * Gets the information for the smart contract: UpgradeControl
     * Binding: GetSmartContractInformation
     * @route GET /contracts/upgrade-control
     * @group upgrade_control - API for smart contract: UpgradeControl (UpgradeControl)
     * @returns {SmartContractInformation.model} 200 - Block information
     * @security BearerAuthorization
     */
    public async getSmartContractInformation(request: Express.Request, response: Express.Response) {
        const address = SmartContractsConfig.getInstance().example.address;
        const abi = UpgradeControlWrapper.abi();

        let firstEventBlock: number;
        let lastSyncedEventBlock: number;

        const eventStatus = await ContractEventStatus.finder.findByKey(normalizeAddress(address));

        if (eventStatus) {
            firstEventBlock = eventStatus.firstEvent;
            lastSyncedEventBlock = eventStatus.lastSyncEvent;
        }

        sendApiResult(request, response, {
            address,
            abi,
            firstEventBlock,
            lastSyncedEventBlock,
        });
    }
}
