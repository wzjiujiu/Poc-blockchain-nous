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

// Transaction sending options

"use strict";

import Express from "express";
import { hexNoPrefix, hexWithPrefix, parseBytes, parseQuantity, privateKeyToAddress, sendTransaction, TransactionBuildDetails, TransactionReceipt, Web3RPCClient } from "@asanrom/smart-contract-wrapper";
import { ObjectSchema } from "@asanrom/javascript-object-sanitizer";
import { FORBIDDEN, INTERNAL_SERVER_ERROR, sendApiError, sendApiResult } from "./http-utils";
import { Monitor } from "../monitor";
import { BlockchainConfig } from "../config/config-blockchain";
import { Wallet } from "../models/wallet";
import { BlockchainService } from "../services/blockchain-service";

// Types and schemas for sending options

type TxReturnData = {
    mode: "return_data";
};

const TxReturnDataSchema = ObjectSchema.object({
    mode: ObjectSchema.string().withEnumeration(["return_data"]),
});

type TxSignWithWallet = {
    mode: "wallet";

    walletId: string;

    walletPassword: string;
};

const TxSignWithWalletSchema = ObjectSchema.object({
    mode: ObjectSchema.string().withEnumeration(["wallet"]),
    walletId: ObjectSchema.string().withMaxLength(255).withDefaultValue(""),
    walletPassword: ObjectSchema.string().withMaxLength(255).withDefaultValue(""),
});

type TxSignWithPrivateKey = {
    mode: "private_key";

    privateKey: string;
};

const TxSignWithPrivateKeySchema = ObjectSchema.object({
    mode: ObjectSchema.string().withEnumeration(["private_key"]),
    privateKey: ObjectSchema.string().withMaxLength(255).withDefaultValue(""),
});

export type TxSignOptions = TxReturnData | TxSignWithWallet | TxSignWithPrivateKey;

const TxSignOptionsSchema = ObjectSchema.anyOf([
    TxSignWithWalletSchema,
    TxSignWithPrivateKeySchema,
    TxReturnDataSchema
]).withDefaultSchema(TxReturnDataSchema);

/**
 * Handles the process of sending a transaction
 * This function mush be called by any API that consists on sending a transaction
 * @param request The request
 * @param response The response
 * @param txBuildDetails The transaction build details
 * @param waitForContract Contract address to wait for event synchronization
 */
export async function handleTransactionSending(request: Express.Request, response: Express.Response, txBuildDetails: TransactionBuildDetails, waitForContract?: string) {
    const signingOptions: TxSignOptions = TxSignOptionsSchema.sanitize(request.body.txSign);

    if (signingOptions.mode === "return_data") {
        sendApiResult(request, response, {
            transactionData: {
                to: txBuildDetails.to,
                data: hexWithPrefix(parseBytes(txBuildDetails.data).toString("hex")),
                value: "0x" + parseQuantity(txBuildDetails.value).toString(16),
            },
        });
        return;
    }

    let privateKey: Buffer;

    if (signingOptions.mode === "wallet") {
        const wallet = await Wallet.findById(signingOptions.walletId);

        if (!wallet || wallet.uid !== request.user) {
            sendApiError(
                request,
                response,
                FORBIDDEN,
                "WALLET_NOT_FOUND",
                "Wallet not found: " + signingOptions.walletId
            );
            return;
        }

        if (!wallet.checkPassword(signingOptions.walletPassword)) {
            sendApiError(
                request,
                response,
                FORBIDDEN,
                "INVALID_WALLET_PASSWORD",
                "Invalid password provided for the wallet"
            );
            return;
        }

        privateKey = wallet.unlock(signingOptions.walletPassword);
    } else if (signingOptions.mode === "private_key") {
        try {
            privateKey = Buffer.from(hexNoPrefix(signingOptions.privateKey), "hex");
        } catch (_ex) {
            sendApiError(
                request,
                response,
                FORBIDDEN,
                "INVALID_PRIVATE_KEY",
                "Invalid private key (hexadecimal)"
            );
            return;
        }

        if (privateKey.length !== 32) {
            sendApiError(
                request,
                response,
                FORBIDDEN,
                "INVALID_PRIVATE_KEY",
                "Invalid private key (must be 32 bytes)"
            );
            return;
        }
    }

    if (!privateKey) {
        sendApiError(
            request,
            response,
            INTERNAL_SERVER_ERROR,
            "UNSUPPORTED_SIGN_MODE",
            "Unsupported signature mode: " + signingOptions.mode
        );
        return;
    }

    const account = privateKeyToAddress(privateKey);

    // Estimate gas

    let gasLimit: bigint;

    try {
        gasLimit = await Web3RPCClient.getInstance().estimateGas({
            to: txBuildDetails.to,
            from: account,
            data: txBuildDetails.data,
            value: txBuildDetails.value,
        }, "pending", {
            provider: BlockchainConfig.getInstance().provider,
        });
    } catch (ex) {
        Monitor.debugException(ex);
        sendApiResult(request, response, {
            sendResult: {
                success: false,
                error: ex.message,
            },
        });
        return;
    }

    // Send transaction

    let receipt: TransactionReceipt;

    try {
        receipt = await sendTransaction(txBuildDetails.to, txBuildDetails.data, txBuildDetails.value, {
            provider: BlockchainConfig.getInstance().provider,
            privateKey,
            gasLimit,
            logFunction: msg => {
                Monitor.debug("[TX-SEND] " + msg);
            },
        });
    } catch (ex) {
        Monitor.debugException(ex);

        sendApiResult(request, response, {
            sendResult: {
                success: false,
                error: ex.message,
            },
        });
        return;
    }

    if (!waitForContract) {
        try {
            await BlockchainService.getInstance().waitForBlockSync(waitForContract, receipt.blockNumber);
        } catch (ex) {
            Monitor.exception(ex);
        }
    }

    sendApiResult(request, response, {
        success: true,
        txHash: receipt.transactionHash.toString("hex"),
        status: Number(receipt.status),
        contract: receipt.contractAddress,
    });
}
