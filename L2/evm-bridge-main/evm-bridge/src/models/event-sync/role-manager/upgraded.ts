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

// EventRoleManagerUpgraded - Model class to store events of type 'Upgraded' for contract RoleManager
// WARNING: THIS FILE IS AUTO-GENERATED. DO NOT ADD ANY CHANGES OR THEY MAY BE LOST THE NEXT TIME YOU GENERATE THE CODE

"use strict";

import { DataModel, enforceType, TypedRow, DataSource, DataFinder, DataFilter, OrderBy, SelectOptions } from "tsbean-orm";

const DATA_SOURCE = DataSource.DEFAULT;
const TABLE = "event_role_manager_upgraded";
const PRIMARY_KEY = "id";

/**
 * Model class for event storage
 * Contract name: RoleManager
 * Contract name (instance): RoleManager
 * Event name: Upgraded
 */
export class EventRoleManagerUpgraded extends DataModel {
    public static finder = new DataFinder<EventRoleManagerUpgraded, string>(DATA_SOURCE, TABLE, PRIMARY_KEY, (data: TypedRow<EventRoleManagerUpgraded>) => { return new EventRoleManagerUpgraded(data) });

    /**
     * Finds events (paginated)
     * @param filters The filters for the finder
     * @param limit The max number of results to get
     * @param continuationToken The continuation token
     * @returns The results and the next continuation token
     */
    public static async findPaginated(filters: DataFilter<EventRoleManagerUpgraded>[], limit: number, continuationToken?: string): Promise<[list: EventRoleManagerUpgraded[], nextContinuationToken: string | null]> {
        const finalFilters = filters.slice();

        if (continuationToken) {
            finalFilters.push(DataFilter.greaterThan("id", continuationToken));
        }

        let finalFilter: DataFilter<EventRoleManagerUpgraded>;

        if (finalFilters.length === 1) {
            finalFilter = finalFilters[0];
        } else if (finalFilters.length > 0) {
            finalFilter = DataFilter.and(...finalFilters);
        } else {
            finalFilter = DataFilter.any();
        }

        const itemList = await EventRoleManagerUpgraded.finder.find(finalFilter, OrderBy.desc("id"), SelectOptions.configure().setMaxRows(limit));

        let nextContinuationToken: string | null = null;

        if (itemList.length >= limit && itemList.length > 0) {
            nextContinuationToken = itemList[itemList.length - 1].id;
        }

        return [itemList, nextContinuationToken];
    }

    /**
     * Resets the collection
     */
    public static async reset() {
        await EventRoleManagerUpgraded.finder.delete(DataFilter.any());
    }

    /**
     * Checks if an event exists
     * @param id Event ID
     * @returns True only of the event exists
     */
    public static async exists(id: string): Promise<boolean> {
        const count = await EventRoleManagerUpgraded.finder.count(DataFilter.equals("id", id));
        return count > 0;
    }

    /* db-index: id DESC */
    /* db-type: VARCHAR 255 */
    public id: string;

    /* db-index: block */
    /* db-type: BIGINT */
    public block: number;

    /* db-type: BIGINT */
    public eventIndex: number;

    /* db-index: tx */
    /* db-type: VARCHAR 255 */
    public tx: string;

    /* db-type: BIGINT */
    public timestamp: number;

    /* db-index: pImplementation, id DESC */
    /* db-type: VARCHAR 255 */
    public pImplementation: string;

    constructor(data: TypedRow<EventRoleManagerUpgraded>) {
        super(DATA_SOURCE, TABLE, PRIMARY_KEY);

        this.id = enforceType(data.id, "string") || '';
        this.block = enforceType(data.block, "int") || 0;
        this.eventIndex = enforceType(data.eventIndex, "int") || 0;
        this.tx = enforceType(data.tx, "string") || '';
        this.timestamp = enforceType(data.timestamp, "int") || 0;
        this.pImplementation = enforceType(data.pImplementation, "string") || '';

        this.init();
    }

    // Gets the parameters into a single array
    public getParametersArray(): (string | boolean)[] {
        return [
            this.pImplementation,
        ];
    }
}
