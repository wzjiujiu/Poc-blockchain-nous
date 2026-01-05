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

// Generates transaction APIs for a smart contract

"use strict";

import Path from "path";
import FS from "fs";
import { ABILike } from "@asanrom/smart-contract-wrapper";
import { ContractDoc } from "../utils/user-doc";
import { toTypescriptFileName, toClassName, prettifyJsonAbi } from "../utils/generator-utils";
import { licenseCommentLines } from "../utils/license";
import { backendSrcPath, AUTO_GEN_WARNING, tab2, tab, tab3 } from "./common";
import { computeFunctionSelector } from "../utils/blockchain";
import { generateSwaggerDocsForAbiType } from "./generate-api-call";

export function generateApiTx(contractKey: string, contractName: string, abi: ABILike, docs: ContractDoc) {
    const methods = abi.filter(f => f.name && f.type === "function" && ['nonpayable', 'payable'].includes(f.stateMutability));

    if (methods.length === 0) {
        // No functions, skip generation
        return;
    }

    const hasPayableMethod = methods.filter(f => f.payable).length > 0;

    const methodNameSet = new Set<string>();
    const overloadedMethods = new Set<string>();

    for (const method of methods) {
        if (methodNameSet.has(method.name)) {
            overloadedMethods.add(method.name);
        }
    }

    const apiGroup = toTypescriptFileName(contractKey);
    const apiControllerFile = Path.resolve(backendSrcPath, "controllers", "api", "api-auto-contract-" + apiGroup + "-tx.ts");

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
    lines.push(`import { handleTransactionSending } from "../../utils/tx-sending";`);
    if (hasPayableMethod) {
        lines.push(`import { isBigInteger, parseBigInteger } from "../../utils/bigint";`);
    }

    lines.push("");

    lines.push(`/**`);
    lines.push(` * Auto generated smart contract API`);
    lines.push(` * Contract ${toClassName(contractKey)} (${contractName})`);
    lines.push(` * This file contains the API for calling smart contract transaction methods`);
    lines.push(` * ${apiGroupTag}`);
    lines.push(` */`);

    lines.push(`export class ${toClassName(contractKey)}ContractApiTxController extends Controller {`);

    lines.push(tab + `public registerAPI(prefix: string, application: Express.Express) {`);

    for (const method of methods) {
        const isOverloaded = overloadedMethods.has(method.name);
        lines.push(tab2 + `application.post(prefix + "/contracts/${apiGroup}/tx/${toTypescriptFileName(method.name)}${isOverloaded ? ('-' + computeFunctionSelector(method)) : ''}", ensureObjectBody(this.tx${toClassName(method.name)}${isOverloaded ? ('_' + computeFunctionSelector(method)) : ''}.bind(this)));`);
    }

    lines.push(tab + `}`);

    lines.push("");

    for (const method of methods) {
        const isOverloaded = overloadedMethods.has(method.name);
        const signature = `${method.name}(${(method.inputs || []).map(i => i.type).join(",")})`;

        const isPayable = !!method.payable;

        const methodNotice = (((docs.user.methods || Object.create(null))[signature] || Object.create(null)).notice || "").split("<br>");
        const methodParamsDoc = ((docs.dev.methods || Object.create(null))[signature] || Object.create(null)).params || Object.create(null);

        const methodParametersType = `TxParams${toClassName(contractKey)}${toClassName(method.name)}${isOverloaded ? ('-' + computeFunctionSelector(method)) : ''}`;
        const methodRequestType = `TxRequest${toClassName(contractKey)}${toClassName(method.name)}${isOverloaded ? ('-' + computeFunctionSelector(method)) : ''}`;

        if (method.inputs && method.inputs.length > 0) {
            const typesExtraLines: string[] = [];

            lines.push(tab + `/**`);
            lines.push(tab + ` * @typedef ${methodParametersType}`);

            let tupleIndex = 0;

            method.inputs.forEach((input, i) => {
                const inputName = (input.name || ("_" + i));
                const [tName, moreLines, newTupleIndex, swaggerExampleValue] = generateSwaggerDocsForAbiType(methodParametersType, tupleIndex, input);

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

        lines.push(tab + `/**`);
        lines.push(tab + ` * @typedef ${methodRequestType}`);

        if (method.inputs && method.inputs.length > 0) {
            lines.push(tab + ` * @property {${methodParametersType}.model} parameters.required - Transaction parameters`);
        }

        if (isPayable) {
            lines.push(tab + ` * @property {string} value.required - Transaction value - eg: 0`);
        }

        lines.push(tab + ` * @property {TxSigningOptions.model} txSign.required - Transaction signing options`);

        lines.push(tab + ` */`);
        lines.push("");


        lines.push(tab + `/**`);
        lines.push(tab + ` * Sends transaction for method: ${method.name}`);
        lines.push(tab + ` * Smart contract: ${toClassName(contractKey)} (${contractName})`);
        lines.push(tab + ` * Method signature: ${signature}`);
        lines.push(tab + ` * Binding: Tx${toClassName(method.name)}${isOverloaded ? ('_' + computeFunctionSelector(method)) : ''}`);

        for (const notice of methodNotice) {
            lines.push(tab + ` * ${notice}`);
        }

        lines.push(tab + ` * @route POST /contracts/${apiGroup}/tx/${toTypescriptFileName(method.name)}${isOverloaded ? ('-' + computeFunctionSelector(method)) : ''}`);
        lines.push(tab + ` * ${apiGroupTag}`);
        lines.push(tab + ` * @param {${methodRequestType}.model} request.body.required - Request body`);
        lines.push(tab + ` * @returns {TxResponse.model} 200 - Transaction result`);
        lines.push(tab + ` * @returns {TxBadRequest.model} 400 - Bad request`);
        lines.push(tab + ` * @returns {TxSigningForbiddenResponse.model} 403 - Access denied`);
        lines.push(tab + ` * @security BearerAuthorization`);
        lines.push(tab + ` */`);

        lines.push(tab + `public async tx${toClassName(method.name)}${isOverloaded ? ('_' + computeFunctionSelector(method)) : ''}(request: Express.Request, response: Express.Response) {`);

        lines.push(tab2 + `const methodAbi = ${prettifyJsonAbi(method)};`);

        lines.push("");

        lines.push(tab2 + `const [txParams, validParams, invalidParamsReason] = normalizeAndValidateInputParameters(request.body.parameters, methodAbi);`);

        lines.push("");

        lines.push(tab2 + `if (!validParams) {`);
        lines.push(tab3 + `sendApiError(request, response, BAD_REQUEST, "INVALID_PARAMETERS", invalidParamsReason);`);
        lines.push(tab3 + `return;`);
        lines.push(tab2 + `}`);

        lines.push("");

        if (isPayable) {
            lines.push(tab2 + `if (!isBigInteger(request.body.value + "")) {`);
            lines.push(tab3 + `sendApiError(request, response, BAD_REQUEST, "INVALID_VALUE", "Invalid transaction value");`);
            lines.push(tab2 + `}`);
            lines.push("");
            lines.push(tab2 + `const value = parseBigInteger(request.body.value + "");`);
            lines.push("");
            lines.push(tab2 + `txParams.push(value);`);
            lines.push("");
        }

        lines.push(tab2 + `const wrapper = SmartContractsConfig.getInstance().${contractKey};`);

        lines.push("");

        lines.push(tab2 + `const txBuildData = wrapper.${method.name}${isOverloaded ? ("_" + computeFunctionSelector(method)) : ''}$txBuildDetails.call(wrapper, ...txParams);`);

        lines.push("");

        lines.push(tab2 + `await handleTransactionSending(request, response, txBuildData, wrapper.address);`);

        lines.push(tab + `}`);
    }

    lines.push(`}`);

    lines.push("");

    FS.writeFileSync(apiControllerFile, lines.join("\n"));
}
