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

// Generates event model classes

"use strict";

import Path from "path";
import FS from "fs";
import { JsonFragment, ABILike } from "@asanrom/smart-contract-wrapper";
import { toTypescriptFileName, toClassName, toTableName, getModelPropertyName, eventInputIsIndexed, getModelDatabaseType, getModelType, getModelTypeDefaultValue } from "../utils/generator-utils";
import { licenseCommentLines } from "../utils/license";
import { backendSrcPath, AUTO_GEN_WARNING, tab, tab2, tab3 } from "./common";

function generateEventModel(contractKey: string, contractName: string, event: JsonFragment) {
    const modelsFolder = Path.resolve(backendSrcPath, "models", "event-sync", toTypescriptFileName(contractKey));

    if (!FS.existsSync(modelsFolder)) {
        try {
            FS.mkdirSync(modelsFolder, { recursive: true });
        } catch (ex) { }
    }

    const modelFile = Path.resolve(modelsFolder, toTypescriptFileName(event.name)) + ".ts";
    const lines = [];

    const modelClassName = "Event" + toClassName(contractKey) + event.name;

    for (const l of licenseCommentLines) {
        lines.push(l);
    }

    lines.push(`// ${modelClassName} - Model class to store events of type '${event.name}' for contract ${toClassName(contractKey)}`);
    lines.push(AUTO_GEN_WARNING);
    lines.push("");
    lines.push(`"use strict";`);
    lines.push("");

    lines.push('import { DataModel, enforceType, TypedRow, DataSource, DataFinder, DataFilter, OrderBy, SelectOptions } from "tsbean-orm";');
    lines.push("");

    lines.push(`const DATA_SOURCE = DataSource.DEFAULT;`);
    lines.push(`const TABLE = "${toTableName(modelClassName)}";`);
    lines.push(`const PRIMARY_KEY = "id";`);

    lines.push("");

    lines.push('/**');
    lines.push(' * Model class for event storage');
    lines.push(' * Contract name: ' + contractName);
    lines.push(' * Contract name (instance): ' + toClassName(contractKey));
    lines.push(' * Event name: ' + event.name);
    lines.push(' */');

    lines.push(`export class ${modelClassName} extends DataModel {`);

    lines.push(tab + `public static finder = new DataFinder<${modelClassName}, string>(DATA_SOURCE, TABLE, PRIMARY_KEY, (data: TypedRow<${modelClassName}>) => { return new ${modelClassName}(data) });`);
    lines.push("");

    // Add the paginated finder for the model class

    lines.push(tab + '/**');
    lines.push(tab + ' * Finds events (paginated)');
    lines.push(tab + ' * @param filters The filters for the finder');
    lines.push(tab + ' * @param limit The max number of results to get');
    lines.push(tab + ' * @param continuationToken The continuation token');
    lines.push(tab + ' * @returns The results and the next continuation token');
    lines.push(tab + ' */');
    lines.push(tab + `public static async findPaginated(filters: DataFilter<${modelClassName}>[], limit: number, continuationToken?: string): Promise<[list: ${modelClassName}[], nextContinuationToken: string | null]> {`);

    lines.push(tab2 + `const finalFilters = filters.slice();`);
    lines.push("");
    lines.push(tab2 + `if (continuationToken) {`);
    lines.push(tab3 + `finalFilters.push(DataFilter.greaterThan("id", continuationToken));`);
    lines.push(tab2 + `}`);
    lines.push("");
    lines.push(tab2 + `let finalFilter: DataFilter<${modelClassName}>;`);
    lines.push("");
    lines.push(tab2 + `if (finalFilters.length === 1) {`);
    lines.push(tab3 + `finalFilter = finalFilters[0];`);
    lines.push(tab2 + `} else if (finalFilters.length > 0) {`);
    lines.push(tab3 + `finalFilter = DataFilter.and(...finalFilters);`);
    lines.push(tab2 + `} else {`);
    lines.push(tab3 + `finalFilter = DataFilter.any();`);
    lines.push(tab2 + `}`);
    lines.push("");
    lines.push(tab2 + `const itemList = await ${modelClassName}.finder.find(finalFilter, OrderBy.desc("id"), SelectOptions.configure().setMaxRows(limit));`);
    lines.push("");
    lines.push(tab2 + `let nextContinuationToken: string | null = null;`);
    lines.push("");
    lines.push(tab2 + `if (itemList.length >= limit && itemList.length > 0) {`);
    lines.push(tab3 + `nextContinuationToken = itemList[itemList.length - 1].id;`);
    lines.push(tab2 + `}`);
    lines.push("");
    lines.push(tab2 + `return [itemList, nextContinuationToken];`);

    lines.push(tab + "}");
    lines.push("");

    // Add reset method

    lines.push(tab + '/**');
    lines.push(tab + ' * Resets the collection');
    lines.push(tab + ' */');
    lines.push(tab + `public static async reset() {`);
    lines.push(tab2 + `await ${modelClassName}.finder.delete(DataFilter.any());`);
    lines.push(tab + `}`);
    lines.push("");

    // Add exists method

    lines.push(tab + '/**');
    lines.push(tab + ' * Checks if an event exists');
    lines.push(tab + ' * @param id Event ID');
    lines.push(tab + ' * @returns True only of the event exists');
    lines.push(tab + ' */');
    lines.push(tab + `public static async exists(id: string): Promise<boolean> {`);
    lines.push(tab2 + `const count = await ${modelClassName}.finder.count(DataFilter.equals("id", id));`);
    lines.push(tab2 + `return count > 0;`);
    lines.push(tab + `}`);
    lines.push("");

    // Add the generic parameters

    lines.push(tab + `/* db-index: id DESC */`);
    lines.push(tab + `/* db-type: VARCHAR 255 */`);
    lines.push(tab + `public id: string;`);
    lines.push("");

    lines.push(tab + `/* db-index: block */`);
    lines.push(tab + `/* db-type: BIGINT */`);
    lines.push(tab + `public block: number;`);
    lines.push("");

    lines.push(tab + `/* db-type: BIGINT */`);
    lines.push(tab + `public eventIndex: number;`);
    lines.push("");

    lines.push(tab + `/* db-index: tx */`);
    lines.push(tab + `/* db-type: VARCHAR 255 */`);
    lines.push(tab + `public tx: string;`);
    lines.push("");

    lines.push(tab + `/* db-type: BIGINT */`);
    lines.push(tab + `public timestamp: number;`);
    lines.push("");

    // Add the input parameters

    (event.inputs || []).forEach((input, i) => {
        const inputName = getModelPropertyName(input, i);

        if (eventInputIsIndexed(input)) {
            lines.push(tab + `/* db-index: ${inputName}, id DESC */`);
        }

        lines.push(tab + `/* db-type: ${getModelDatabaseType(input)} */`);

        lines.push(tab + `public ${inputName}: ${getModelType(input)};`);

        lines.push("");
    });

    lines.push(tab + `constructor(data: TypedRow<${modelClassName}>) {`);

    lines.push(tab2 + `super(DATA_SOURCE, TABLE, PRIMARY_KEY);`);
    lines.push("");

    lines.push(tab2 + `this.id = enforceType(data.id, "string") || '';`);
    lines.push(tab2 + `this.block = enforceType(data.block, "int") || 0;`);
    lines.push(tab2 + `this.eventIndex = enforceType(data.eventIndex, "int") || 0;`);
    lines.push(tab2 + `this.tx = enforceType(data.tx, "string") || '';`);
    lines.push(tab2 + `this.timestamp = enforceType(data.timestamp, "int") || 0;`);

    (event.inputs || []).forEach((input, i) => {
        const inputName = getModelPropertyName(input, i);
        lines.push(tab2 + `this.${inputName} = enforceType(data.${inputName}, "${getModelType(input)}") || ${getModelTypeDefaultValue(input)};`);
    });

    lines.push("");
    lines.push(tab2 + `this.init();`);

    lines.push(tab + `}`);

    lines.push("");
    lines.push(tab + `// Gets the parameters into a single array`);
    lines.push(tab + `public getParametersArray(): (string | boolean)[] {`);
    if (event.inputs && event.inputs.length > 0) {
        lines.push(tab2 + `return [`);
        (event.inputs || []).forEach((input, i) => {
            const inputName = getModelPropertyName(input, i);
            lines.push(tab3 + `this.${inputName},`);
        });
        lines.push(tab2 + `];`);
    } else {
        lines.push(tab2 + `return [];`);
    }

    lines.push(tab + `}`);

    lines.push('}');
    lines.push("");

    FS.writeFileSync(modelFile, lines.join("\n"));
}

export function generateEventsModels(contractKey: string, contractName: string, abi: ABILike) {
    for (const fragment of abi) {
        if (fragment.type !== "event") {
            continue;
        }

        generateEventModel(contractKey, contractName, fragment);
    }
}