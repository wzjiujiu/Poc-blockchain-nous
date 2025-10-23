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

// ContractEventStatus - Stores any necessary status for smart contract event synchronization

"use strict";

import { DataModel, enforceType, TypedRow, DataSource, DataFinder, DataFilter } from "tsbean-orm";

const DATA_SOURCE = DataSource.DEFAULT;
const TABLE = "contract_event_status";
const PRIMARY_KEY = "address";

/**
 * Stores any necessary status for smart contract event synchronization
 */
export class ContractEventStatus extends DataModel {

    public static finder = new DataFinder<ContractEventStatus, string>(DATA_SOURCE, TABLE, PRIMARY_KEY, (data: TypedRow<ContractEventStatus>) => { return new ContractEventStatus(data) });

    /**
     * Resets the collection
     */
    public static async reset() {
        await ContractEventStatus.finder.delete(DataFilter.any());
    }

    /**
     * Checks if an entry exists for a contract
     * @param address The smart contract address
     * @returns True only if the entry exists
     */
    public static async exists(address: string): Promise<boolean> {
        const count = await ContractEventStatus.finder.count(DataFilter.equals("address", address));
        return count > 0;
    }

    /* db-type: VARCHAR 255 */
    public address: string;

    /* db-type: BIGINT */
    public firstEvent: number;

    /* db-type: BIGINT */
    public lastSyncEvent: number;

    constructor(data: TypedRow<ContractEventStatus>) {
        // First, we call DataModel constructor 
        super(DATA_SOURCE, TABLE, PRIMARY_KEY);

        // Second, we set the class properties
        // The recommended way is to set one by one to prevent prototype pollution
        // You can also enforce the types if you do not trust the data source
        // In that case you can use the enforceType utility function

        this.address = enforceType(data.address, "string") || '';
        this.firstEvent = enforceType(data.firstEvent, "int") || 0;
        this.lastSyncEvent = enforceType(data.lastSyncEvent, "int") || 0;

        // Finally, we must call init()
        this.init();
    }
}
