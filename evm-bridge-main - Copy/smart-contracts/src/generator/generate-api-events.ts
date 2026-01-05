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

// Generates events APIs for a smart contract

"use strict";

import Path from "path";
import FS from "fs";
import { ABILike } from "@asanrom/smart-contract-wrapper";
import { ContractDoc } from "../utils/user-doc";
import { toTypescriptFileName, toClassName, prettifyJsonAbi, getModelPropertyName, eventInputIsIndexed, getModelType } from "../utils/generator-utils";
import { licenseCommentLines } from "../utils/license";
import { backendSrcPath, AUTO_GEN_WARNING, tab2, tab, tab3, tab4, tab5 } from "./common";
import { generateSwaggerDocsForAbiType } from "./generate-api-call";
import { ZERO_BYTES32 } from "../utils/blockchain";

export function generateApiEvents(contractKey: string, contractName: string, abi: ABILike, docs: ContractDoc) {
    const events = abi.filter(f => f.name && f.type === "event");

    if (events.length === 0) {
        // No events, skip generation
        return;
    }

    const apiGroup = toTypescriptFileName(contractKey);
    const apiControllerFile = Path.resolve(backendSrcPath, "controllers", "api", "api-auto-contract-" + apiGroup + "-events.ts");

    const apiGroupTag = `@group ${apiGroup.replace(/\-/g, "_")} - API for smart contract: ${toClassName(contractKey)} (${contractName})`;

    const lines = [];

    for (const l of licenseCommentLines) {
        lines.push(l);
    }

    lines.push(`// Smart contract synchronizer for ${toClassName(contractKey)}`);
    lines.push(AUTO_GEN_WARNING);
    lines.push("");
    lines.push('"use strict";');
    lines.push("");

    lines.push(`import Express from "express";`);
    lines.push(`import { Controller } from "../controller";`);
    lines.push(`import { noCache, sendApiError, sendApiResult, sendApiSuccess } from "../../utils/http-utils";`);
    lines.push(`import { parsePaginationParameters } from "../../utils/pagination";`);
    lines.push(`import { DataFilter } from "tsbean-orm";`);

    let usesNormalizeUint256 = false;
    let usesNormalizeInt256 = false;
    let usesNormalizeAddress = false;
    let usesNormalizeBytes32 = false;
    let usesParseBigInteger = false;

    for (const event of events) {
        const eventClassName = "Event" + toClassName(contractKey) + event.name;
        lines.push(`import { ${eventClassName} } from "../../models/event-sync/${toTypescriptFileName(contractKey)}/${toTypescriptFileName(event.name)}";`);

        (event.inputs || []).map((input) => {
            if (!eventInputIsIndexed(input)) {
                return;
            }

            if (input.type.startsWith("uint")) {
                usesNormalizeUint256 = true;
                usesParseBigInteger = true;
            } else if (input.type.startsWith("int")) {
                usesNormalizeInt256 = true;
                usesParseBigInteger = true;
            } else if (input.type === "address") {
                usesNormalizeAddress = true;
            } else if (input.type === "bytes32") {
                usesNormalizeBytes32 = true;
            }
        });
    }

    const blockchainUtilsImports = ["serializeEventABIParams"];

    if (usesNormalizeUint256) {
        blockchainUtilsImports.push("normalizeDatabaseUint256");
    }

    if (usesNormalizeInt256) {
        blockchainUtilsImports.push("normalizeDatabaseInt256");
    }

    if (usesNormalizeAddress) {
        blockchainUtilsImports.push("normalizeAddress");
    }

    if (usesNormalizeBytes32) {
        blockchainUtilsImports.push("normalizeBytes32");
    }

    if (blockchainUtilsImports.length > 0) {
        lines.push(`import { ${blockchainUtilsImports.join(", ")} } from "../../utils/blockchain";`);
    }

    if (usesParseBigInteger) {
        lines.push(`import { parseBigInteger } from "../../utils/bigint";`);
    }

    lines.push("");

    lines.push(`/**`);
    lines.push(` * Auto generated smart contract API`);
    lines.push(` * Contract ${toClassName(contractKey)} (${contractName})`);
    lines.push(` * This file contains the API for fetching events`);
    lines.push(` * ${apiGroupTag}`);
    lines.push(` */`);

    lines.push(`export class ${toClassName(contractKey)}ContractApiEventsController extends Controller {`);

    lines.push(tab + `public registerAPI(prefix: string, application: Express.Express) {`);

    for (const event of events) {
        lines.push(tab2 + `application.get(prefix + "/contracts/${apiGroup}/events/${toTypescriptFileName(event.name)}", noCache(this.getEvents${toClassName(event.name)}.bind(this)));`);
    }

    lines.push(tab + `}`);

    lines.push("");

    for (const event of events) {
        const eventClassName = "Event" + toClassName(contractKey) + event.name;

        const signature = event.name + "(" + event.inputs.map(i => i.type).join(",") + ")";
        const eventDocs = (((docs.user.events || Object.create(null))[signature] || Object.create(null)).notice || "").split("<br>").map(l => l.trim()).filter(l => !!l);
        const eventParamsDoc = ((docs.dev.events || Object.create(null))[signature] || Object.create(null)).params || Object.create(null);

        const eventParametersType = `EventParams${toClassName(contractKey)}${toClassName(event.name)}`;

        if (event.inputs && event.inputs.length > 0) {
            const typesExtraLines: string[] = [];

            lines.push(tab + `/**`);
            lines.push(tab + ` * @typedef ${eventParametersType}`);

            let tupleIndex = 0;

            event.inputs.forEach((input, i) => {
                const inputName = (input.name || ("_" + i));
                const [tName, moreLines, newTupleIndex, swaggerExampleValue] = generateSwaggerDocsForAbiType(eventParametersType, tupleIndex, input);

                tupleIndex = newTupleIndex;

                for (const l of moreLines) {
                    typesExtraLines.push(l);
                }

                lines.push(tab + ` * @property {${tName}} ${inputName}.required - ${eventParamsDoc[inputName] || inputName}${swaggerExampleValue ? (' - eg: ' + swaggerExampleValue) : ''}`);
            });

            lines.push(tab + ` */`);
            lines.push("");

            for (const l of typesExtraLines) {
                lines.push(l);
            }
        }

        const eventItemType = `EventItem${toClassName(contractKey)}${toClassName(event.name)}`;

        lines.push(tab + `/**`);
        lines.push(tab + ` * @typedef ${eventItemType}`);

        lines.push(tab + ` * @property {string} id.required - Event ID - eg: xxxx-yyyy-zzzz`);
        lines.push(tab + ` * @property {number} block.required - Block number - eg: 1`);
        lines.push(tab + ` * @property {number} eventIndex.required - Event index in the block - eg: 0`);
        lines.push(tab + ` * @property {string} tx.required - Transaction hash - eg: ${ZERO_BYTES32}`);
        lines.push(tab + ` * @property {string} timestamp.required - Event timestamp (Unix seconds) - eg: 0`);

        if (event.inputs && event.inputs.length > 0) {
            lines.push(tab + ` * @property {${eventParametersType}.model} parameters.required - Event parameters`);
        }

        lines.push(tab + ` */`);
        lines.push("");

        const eventListType = `EventList${toClassName(contractKey)}${toClassName(event.name)}`;

        lines.push(tab + `/**`);
        lines.push(tab + ` * @typedef ${eventListType}`);

        lines.push(tab + ` * @property {Array.<${eventItemType}>} events.required - List of events`);
        lines.push(tab + ` * @property {string} continuationToken - Continuation token - eg: xxxx-yyyy-zzzz`);

        lines.push(tab + ` */`);
        lines.push("");

        lines.push(tab + `/**`);
        lines.push(tab + ` * Get a list of events of type ${event.name}`);
        lines.push(tab + ` * Smart contract: ${toClassName(contractKey)} (${contractName})`);
        lines.push(tab + ` * Event signature: ${signature}`);
        lines.push(tab + ` * Binding: GetEvents${toClassName(event.name)}`);

        for (const notice of eventDocs) {
            lines.push(tab + ` * ${notice}`);
        }

        lines.push(tab + ` * @route GET /contracts/${apiGroup}/events/${toTypescriptFileName(event.name)}`);
        lines.push(tab + ` * ${apiGroupTag}`);
        lines.push(tab + ` * @param {string} continuationToken.query - Continuation token`);
        lines.push(tab + ` * @param {string} limit.query - Max number of items to get. Default: 25, Max: 256`);

        (event.inputs || []).map((input, i) => {
            if (!eventInputIsIndexed(input)) {
                return;
            }

            const inputName = (input.name || ("_" + i));
            const propName = getModelPropertyName(input, i);

            const filterEqName = "filter_eq_" + propName;

            lines.push(tab + ` * @param {${getModelType(input)}} ${filterEqName}.query - Filter event with a value for the parameter '${inputName}' equal than the one specified.`);

            if ((input.type || "").startsWith("uint") || (input.type || "").startsWith("int")) {
                const filterGtName = "filter_gt_" + propName;
                const filterLtName = "filter_lt_" + propName;

                lines.push(tab + ` * @param {${getModelType(input)}} ${filterGtName}.query - Filter event with a value for the parameter '${inputName}' greater than the one specified.`);
                lines.push(tab + ` * @param {${getModelType(input)}} ${filterLtName}.query - Filter event with a value for the parameter '${inputName}' less than the one specified.`);
            }
        });

        lines.push(tab + ` * @returns {${eventListType}.model} 200 - Event list`);
        lines.push(tab + ` * @security BearerAuthorization`);
        lines.push(tab + ` */`);

        lines.push(tab + `public async getEvents${toClassName(event.name)}(request: Express.Request, response: Express.Response) {`);

        lines.push(tab2 + `const eventAbi = ${prettifyJsonAbi(event)};`);
        lines.push("");

        lines.push(tab2 + `const [limit, continuationToken] = parsePaginationParameters(request);`);
        lines.push("");

        lines.push(tab2 + `const filters: DataFilter<${eventClassName}>[] = [];`);
        lines.push("");

        (event.inputs || []).map((input, i) => {
            if (!eventInputIsIndexed(input)) {
                return;
            }

            const propName = getModelPropertyName(input, i);

            const filterEqName = "filter_eq_" + propName;

            lines.push(tab2 + `if (request.query.${filterEqName} !== undefined && request.query.${filterEqName} !== null) {`);

            if (input.type === "bool") {
                lines.push(tab3 + `filters.push(DataFilter.equals("${propName}", (request.query.${filterEqName} + "") === "true"));`);
            } else if (input.type === "address") {
                lines.push(tab3 + `filters.push(DataFilter.equals("${propName}", normalizeAddress(request.query.${filterEqName} + "")));`);
            } else if (input.type === "bytes32") {
                lines.push(tab3 + `filters.push(DataFilter.equals("${propName}", normalizeBytes32(request.query.${filterEqName} + "")));`);
            } else if ((input.type || "").startsWith("uint")) {
                lines.push(tab3 + `filters.push(DataFilter.equals("${propName}", normalizeDatabaseUint256(parseBigInteger(request.query.${filterEqName} + ""))));`);
            } else if ((input.type || "").startsWith("int")) {
                lines.push(tab3 + `filters.push(DataFilter.equals("${propName}", normalizeDatabaseInt256(parseBigInteger(request.query.${filterEqName} + ""))));`);
            } else {
                lines.push(tab3 + `filters.push(DataFilter.equals("${propName}", request.query.${filterEqName} + ""));`);
            }

            lines.push(tab2 + `}`);

            lines.push("");

            if ((input.type || "").startsWith("uint") || (input.type || "").startsWith("int")) {
                const filterGtName = "filter_gt_" + propName;

                lines.push(tab2 + `if (request.query.${filterGtName} !== undefined && request.query.${filterGtName} !== null) {`);

                if ((input.type || "").startsWith("uint")) {
                    lines.push(tab3 + `filters.push(DataFilter.greaterThan("${propName}", normalizeDatabaseUint256(parseBigInteger(request.query.${filterGtName} + ""))));`);
                } else {
                    lines.push(tab3 + `filters.push(DataFilter.greaterThan("${propName}", normalizeDatabaseInt256(parseBigInteger(request.query.${filterGtName} + ""))));`);
                }

                lines.push(tab2 + `}`);

                lines.push("");

                const filterLtName = "filter_lt_" + propName;

                lines.push(tab2 + `if (request.query.${filterLtName} !== undefined && request.query.${filterLtName} !== null) {`);

                if ((input.type || "").startsWith("uint")) {
                    lines.push(tab3 + `filters.push(DataFilter.lessThan("${propName}", normalizeDatabaseUint256(parseBigInteger(request.query.${filterLtName} + ""))));`);
                } else {
                    lines.push(tab3 + `filters.push(DataFilter.lessThan("${propName}", normalizeDatabaseInt256(parseBigInteger(request.query.${filterLtName} + ""))));`);
                }

                lines.push(tab2 + `}`);

                lines.push("");
            }
        });

        lines.push(tab2 + `const [events, nextContinuationToken] = await ${eventClassName}.findPaginated(filters, limit, continuationToken);`);
        lines.push("");

        lines.push(tab2 + `sendApiResult(request, response, {`);
        lines.push(tab3 + `events: events.map(e => {`);
        lines.push(tab4 + `return {`);
        lines.push(tab5 + `id: e.id,`);
        lines.push(tab5 + `block: e.block,`);
        lines.push(tab5 + `timestamp: e.timestamp,`);
        lines.push(tab5 + `eventIndex: e.eventIndex,`);
        lines.push(tab5 + `tx: e.tx,`);
        lines.push(tab5 + `parameters: serializeEventABIParams(e.getParametersArray(), eventAbi),`);
        lines.push(tab4 + `};`);
        lines.push(tab3 + `}),`);
        lines.push(tab3 + `continuationToken: nextContinuationToken,`);
        lines.push(tab2 + `});`);

        lines.push(tab + `}`);
    }

    lines.push(`}`);

    lines.push("");

    FS.writeFileSync(apiControllerFile, lines.join("\n"));
}


