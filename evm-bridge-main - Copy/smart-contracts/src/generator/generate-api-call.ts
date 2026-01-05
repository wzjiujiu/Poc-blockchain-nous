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

// Generates view/pure call APIs for a smart contract

"use strict";

import Path from "path";
import FS from "fs";
import { ABILike, JsonFragmentType } from "@asanrom/smart-contract-wrapper";
import { ContractDoc } from "../utils/user-doc";
import { toTypescriptFileName, toClassName, prettifyJsonAbi } from "../utils/generator-utils";
import { licenseCommentLines } from "../utils/license";
import { backendSrcPath, AUTO_GEN_WARNING, tab, tab2, tab3, tab4 } from "./common";
import { computeFunctionSelector, ZERO_ADDRESS, ZERO_BYTES32 } from "../utils/blockchain";

export function generateApiCall(contractKey: string, contractName: string, abi: ABILike, docs: ContractDoc) {
    const methods = abi.filter(f => f.name && f.type === "function" && ['pure', 'view'].includes(f.stateMutability));

    if (methods.length === 0) {
        // No functions, skip generation
        return;
    }

    const methodNameSet = new Set<string>();
    const overloadedMethods = new Set<string>();

    for (const method of methods) {
        if (methodNameSet.has(method.name)) {
            overloadedMethods.add(method.name);
        }
    }

    const apiGroup = toTypescriptFileName(contractKey);
    const apiControllerFile = Path.resolve(backendSrcPath, "controllers", "api", "api-auto-contract-" + apiGroup + "-call.ts");

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
    lines.push(`import { Monitor } from "../../monitor";`);
    lines.push(`import { BAD_REQUEST, NOT_FOUND, ensureObjectBody, sendApiError, sendApiResult } from "../../utils/http-utils";`);
    lines.push(`import { SmartContractsConfig } from "../../config/config-smart-contracts";`);
    lines.push(`import { normalizeAndValidateInputParameters, serializeOutputABIParams } from "../../utils/blockchain";`);

    lines.push("");

    lines.push(`/**`);
    lines.push(` * Auto generated smart contract API`);
    lines.push(` * Contract ${toClassName(contractKey)} (${contractName})`);
    lines.push(` * This file contains the API for calling smart contract view / pure methods`);
    lines.push(` * ${apiGroupTag}`);
    lines.push(` */`);

    lines.push(`export class ${toClassName(contractKey)}ContractApiCallController extends Controller {`);

    lines.push(tab + `public registerAPI(prefix: string, application: Express.Express) {`);

    for (const method of methods) {
        const isOverloaded = overloadedMethods.has(method.name);
        lines.push(tab2 + `application.post(prefix + "/contracts/${apiGroup}/call/${toTypescriptFileName(method.name)}${isOverloaded ? ('-' + computeFunctionSelector(method)) : ''}", ensureObjectBody(this.call${toClassName(method.name)}${isOverloaded ? ('_' + computeFunctionSelector(method)) : ''}.bind(this)));`);
    }

    lines.push(tab + `}`);

    lines.push("");

    for (const method of methods) {
        const isOverloaded = overloadedMethods.has(method.name);
        const signature = `${method.name}(${(method.inputs || []).map(i => i.type).join(",")})`;

        const methodNotice = (((docs.user.methods || Object.create(null))[signature] || Object.create(null)).notice || "").split("<br>");
        const methodParamsDoc = ((docs.dev.methods || Object.create(null))[signature] || Object.create(null)).params || Object.create(null);
        const methodReturnsDoc = ((docs.dev.methods || Object.create(null))[signature] || Object.create(null)).returns || Object.create(null);

        const methodRequestType = `CallRequest${toClassName(contractKey)}${toClassName(method.name)}${isOverloaded ? ('-' + computeFunctionSelector(method)) : ''}`;
        const methodResponseType = `CallResponse${toClassName(contractKey)}${toClassName(method.name)}${isOverloaded ? ('-' + computeFunctionSelector(method)) : ''}`;

        if (method.inputs && method.inputs.length > 0) {
            const typesExtraLines: string[] = [];

            lines.push(tab + `/**`);
            lines.push(tab + ` * @typedef ${methodRequestType}`);

            let tupleIndex = 0;

            method.inputs.forEach((input, i) => {
                const inputName = (input.name || ("_" + i));
                const [tName, moreLines, newTupleIndex, swaggerExampleValue] = generateSwaggerDocsForAbiType(methodRequestType, tupleIndex, input);

                tupleIndex = newTupleIndex;

                for (const l of moreLines) {
                    typesExtraLines.push(l);
                }

                lines.push(tab + ` * @property {${tName}} ${inputName}.required - ${methodParamsDoc[inputName] || inputName}${swaggerExampleValue ? (' - eg: ' + swaggerExampleValue) : ''}`);
            });

            lines.push(tab + ` */`);
            lines.push("");

            for (const l of typesExtraLines) {
                lines.push(l);
            }
        }

        const responseTypesExtraLines: string[] = [];
        let responseTypesTupleIndex = 0;

        lines.push(tab + `/**`);
        lines.push(tab + ` * @typedef ${methodResponseType}`);

        (method.outputs || []).forEach((output, i) => {
            const outputName = (output.name || ("_" + i));
            const [tName, moreLines, newTupleIndex, swaggerExampleValue] = generateSwaggerDocsForAbiType(methodResponseType, responseTypesTupleIndex, output);

            responseTypesTupleIndex = newTupleIndex;

            for (const l of moreLines) {
                responseTypesExtraLines.push(l);
            }

            lines.push(tab + ` * @property {${tName}} ${outputName}.required - ${methodReturnsDoc[outputName] || outputName}${swaggerExampleValue ? (' - eg: ' + swaggerExampleValue) : ''}`);
        });

        lines.push(tab + ` */`);
        lines.push("");

        for (const l of responseTypesExtraLines) {
            lines.push(l);
        }

        lines.push(tab + `/**`);
        lines.push(tab + ` * Calls the ${method.stateMutability} method: ${method.name}`);
        lines.push(tab + ` * Smart contract: ${toClassName(contractKey)} (${contractName})`);
        lines.push(tab + ` * Method signature: ${signature}`);
        lines.push(tab + ` * Binding: Call${toClassName(method.name)}${isOverloaded ? ('_' + computeFunctionSelector(method)) : ''}`);

        for (const notice of methodNotice) {
            lines.push(tab + ` * ${notice}`);
        }

        lines.push(tab + ` * @route POST /contracts/${apiGroup}/call/${toTypescriptFileName(method.name)}${isOverloaded ? ('-' + computeFunctionSelector(method)) : ''}`);
        lines.push(tab + ` * ${apiGroupTag}`);
        if (method.inputs && method.inputs.length > 0) {
            lines.push(tab + ` * @param {${methodRequestType}.model} request.body.required - Request body`);
        }
        lines.push(tab + ` * @returns {${methodResponseType}.model} 200 - OK`);
        lines.push(tab + ` * @returns {void} 400 - Invalid parameters`);
        lines.push(tab + ` * @returns {void} 404 - Error calling the method`);
        lines.push(tab + ` * @security BearerAuthorization`);
        lines.push(tab + ` */`);

        lines.push(tab + `public async call${toClassName(method.name)}${isOverloaded ? ('_' + computeFunctionSelector(method)) : ''}(request: Express.Request, response: Express.Response) {`);

        lines.push(tab2 + `const methodAbi = ${prettifyJsonAbi(method)};`);

        lines.push("");

        lines.push(tab2 + `const [callParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body, methodAbi);`);

        lines.push("");

        lines.push(tab2 + `if (!validParams) {`);
        lines.push(tab3 + `sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);`);
        lines.push(tab3 + `return;`);
        lines.push(tab2 + `}`);

        lines.push("");

        lines.push(tab2 + `const wrapper = SmartContractsConfig.getInstance().${contractKey};`);

        lines.push("");

        lines.push(tab2 + `let result: any;`);

        const hasOnlyOneOutput = method.outputs && method.outputs.length === 1;

        lines.push(tab2 + `try {`);

        lines.push(tab3 + `const callResult = await wrapper.${method.name}${isOverloaded ? ("_" + computeFunctionSelector(method)) : ''}.call(wrapper, ...callParams);`);
        lines.push("");

        if (hasOnlyOneOutput) {
            lines.push(tab3 + `result = serializeOutputABIParams([callResult], methodAbi);`);
        } else {
            lines.push(tab3 + `result = serializeOutputABIParams([`);

            (method.outputs || []).forEach((output, i) => {
                const outputName = (output.name || ("_" + i));

                lines.push(tab4 + `callResult.${outputName},`);
            });

            lines.push(tab3 + `], methodAbi);`);
        }

        lines.push(tab2 + `} catch (ex) {`);
        lines.push(tab3 + `Monitor.debugException(ex)`);
        lines.push(tab3 + `sendApiError(request, response, NOT_FOUND, "CALL_ERROR", ex.message);`);
        lines.push(tab3 + `return;`);
        lines.push(tab2 + `}`);

        lines.push("");

        lines.push(tab2 + `sendApiResult(request, response, result);`);

        lines.push(tab + `}`);
    }

    lines.push(`}`);

    lines.push("");

    FS.writeFileSync(apiControllerFile, lines.join("\n"));
}

export function generateSwaggerDocsForAbiType(baseName: string, tupleIndex: number, t: JsonFragmentType): [typeName: string, extraLines: string[], newTupleIndex: number, exampleValue: string] {
    let abiType = t.type || "";

    const matchArray = (/\[([0-9]+)?\]$/).exec(abiType);
    let isArray: boolean;

    if (matchArray) {
        isArray = true;
        abiType = abiType.substr(0, abiType.length - matchArray[0].length);
    } else {
        isArray = false;
    }

    let swaggerType = "string";
    let swaggerExampleValue = "";
    const extraLines: string[] = [];

    if (abiType === "bool") {
        swaggerType = "boolean";
    } else if (abiType === "tuple" && t.components) {
        const tupleTypeName = `${baseName}Tuple${tupleIndex}`;
        tupleIndex++;

        extraLines.push(tab + `/**`);
        extraLines.push(tab + ` * @typedef ${tupleTypeName}`);

        const moreExtraLines: string[] = [];

        t.components.forEach((comp, i) => {
            const compName = (comp.name || ("_" + i));
            const [tName, moreLines, newTpIndex, exValue] = generateSwaggerDocsForAbiType(baseName, tupleIndex, comp);

            tupleIndex = newTpIndex;

            for (const l of moreLines) {
                moreExtraLines.push(l);
            }

            extraLines.push(tab + ` * @property {${tName}} ${compName}.required - ${compName}${exValue ? (' - eg: ' + exValue) : ''}`);
        });

        extraLines.push(tab + ` */`);

        extraLines.push("");

        for (const l of moreExtraLines) {
            extraLines.push(l);
        }

        swaggerType = tupleTypeName + (!isArray ? ".model" : "");
    } else if (!isArray) {
        switch (abiType) {
            case "address":
                swaggerExampleValue = ZERO_ADDRESS;
                break;
            case "bytes32":
                swaggerExampleValue = ZERO_BYTES32;
                break;
            case "bytes":
                swaggerExampleValue = "0x";
                break;
            default:
                if (abiType.startsWith("uint") || abiType.startsWith("int")) {
                    swaggerExampleValue = "0";
                }
                break;
        }
    }

    const typeName = isArray ? `Array.<${swaggerType}>` : swaggerType;

    return [typeName, extraLines, tupleIndex, swaggerExampleValue];
}
