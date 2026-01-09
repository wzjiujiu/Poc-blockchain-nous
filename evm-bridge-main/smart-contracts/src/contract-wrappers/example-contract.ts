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

// ExampleContract contract wrapper

"use strict";

import { Quantity, SmartContractEventWrapper, SmartContractEvent, Address, MethodCallingOptions, BytesLike, MethodTransactionOptions, TransactionResult, AddressLike, QuantityLike, SmartContractInterface, TransactionBuildDetails, BlockTag, RPCOptions, ABILike } from "@asanrom/smart-contract-wrapper";

/**
 * Contract wrapper: ExampleContract
 * Example smart contract for a blockchain-backed dataspace registry
 */
export class ExampleContractWrapper {
    /**
     * Gets the ABI the smart contract
     * @returns The ABI
     */
    public static abi(): ABILike {
        return CONTRACT_ABI;
    }

    /**
     * Address of the smart contract
     */
    public address: Address;

    private _contractInterface: SmartContractInterface;



    /**
     * Wrapper constructor
     * @param address Address of the smart contract
     * @param rpcOptions Options to connect to the blockchain
     */
    constructor(address: AddressLike, rpcOptions: RPCOptions) {
        this._contractInterface = new SmartContractInterface(address, CONTRACT_ABI, rpcOptions);
        this.address = this._contractInterface.address;
    }

    /**
     * Calls View method: UPGRADE_INTERFACE_VERSION()
     * Method: UPGRADE_INTERFACE_VERSION()
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async UPGRADE_INTERFACE_VERSION(options?: MethodCallingOptions): Promise<string> {
        const __r: any = await this._contractInterface.callViewMethod("UPGRADE_INTERFACE_VERSION", [], options || {});
        return __r[0];
    }

    /**
     * Calls View method: assetExists(bytes32,bytes32)
     * Method: assetExists(bytes32,bytes32)
     * @param nodeId nodeId
     * @param assetId assetId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async assetExists(nodeId: BytesLike, assetId: BytesLike, options?: MethodCallingOptions): Promise<boolean> {
        const __r: any = await this._contractInterface.callViewMethod("assetExists", [nodeId, assetId], options || {});
        return __r[0];
    }

    /**
     * Calls View method: contrattoExists(bytes32,string)
     * Method: contrattoExists(bytes32,string)
     * @param nodeId nodeId
     * @param contractNegotiationId contractNegotiationId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async contrattoExists(nodeId: BytesLike, contractNegotiationId: string, options?: MethodCallingOptions): Promise<boolean> {
        const __r: any = await this._contractInterface.callViewMethod("contrattoExists", [nodeId, contractNegotiationId], options || {});
        return __r[0];
    }

    /**
     * Calls View method: dataofferExists(bytes32,string)
     * Method: dataofferExists(bytes32,string)
     * @param nodeId nodeId
     * @param offerId offerId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async dataofferExists(nodeId: BytesLike, offerId: string, options?: MethodCallingOptions): Promise<boolean> {
        const __r: any = await this._contractInterface.callViewMethod("dataofferExists", [nodeId, offerId], options || {});
        return __r[0];
    }

    /**
     * Calls View method: getAsset(bytes32,bytes32)
     * Method: getAsset(bytes32,bytes32)
     * @param nodeId nodeId
     * @param assetId assetId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async getAsset(nodeId: BytesLike, assetId: BytesLike, options?: MethodCallingOptions): Promise<{id: string, nId: string, registrar: Address, timestamp: Quantity, title: string}> {
        const __r: any = await this._contractInterface.callViewMethod("getAsset", [nodeId, assetId], options || {});
        return {
            id: __r[0],
            nId: __r[1],
            registrar: __r[2],
            timestamp: __r[3],
            title: __r[4],
        };
    }

    /**
     * Calls View method: getContratto(bytes32,string)
     * Method: getContratto(bytes32,string)
     * @param nodeId nodeId
     * @param contractNegotiationId contractNegotiationId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async getContratto(nodeId: BytesLike, contractNegotiationId: string, options?: MethodCallingOptions): Promise<{id: string, nId: string, counterpartyId: string, timestamp: Quantity, createdAt: Quantity, state: string}> {
        const __r: any = await this._contractInterface.callViewMethod("getContratto", [nodeId, contractNegotiationId], options || {});
        return {
            id: __r[0],
            nId: __r[1],
            counterpartyId: __r[2],
            timestamp: __r[3],
            createdAt: __r[4],
            state: __r[5],
        };
    }

    /**
     * Calls View method: getDataoffer(bytes32,string)
     * Method: getDataoffer(bytes32,string)
     * @param nodeId nodeId
     * @param offerId offerId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async getDataoffer(nodeId: BytesLike, offerId: string, options?: MethodCallingOptions): Promise<{id: string, nId: string, registrar: Address, timestamp: Quantity, accessPolicyId: string, contractPolicyId: string, assetSelector: string}> {
        const __r: any = await this._contractInterface.callViewMethod("getDataoffer", [nodeId, offerId], options || {});
        return {
            id: __r[0],
            nId: __r[1],
            registrar: __r[2],
            timestamp: __r[3],
            accessPolicyId: __r[4],
            contractPolicyId: __r[5],
            assetSelector: __r[6],
        };
    }

    /**
     * Calls View method: getInitializedVersion()
     * Gets the current initialized version Use this method to figure out the last deployed version of the contract
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async getInitializedVersion(options?: MethodCallingOptions): Promise<Quantity> {
        const __r: any = await this._contractInterface.callViewMethod("getInitializedVersion", [], options || {});
        return __r[0];
    }

    /**
     * Calls View method: getPolicy(bytes32,string)
     * Method: getPolicy(bytes32,string)
     * @param nodeId nodeId
     * @param policyId policyId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async getPolicy(nodeId: BytesLike, policyId: string, options?: MethodCallingOptions): Promise<{id: string, nId: string, registrar: Address, timestamp: Quantity, title: string}> {
        const __r: any = await this._contractInterface.callViewMethod("getPolicy", [nodeId, policyId], options || {});
        return {
            id: __r[0],
            nId: __r[1],
            registrar: __r[2],
            timestamp: __r[3],
            title: __r[4],
        };
    }

    /**
     * Calls View method: getTransfer(string)
     * Method: getTransfer(string)
     * @param transferId transferId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async getTransfer(transferId: string, options?: MethodCallingOptions): Promise<{id: string, nodeId: string, contractAgreementId: string, assetId: string, dataHash: string, status: Quantity, timestamp: Quantity}> {
        const __r: any = await this._contractInterface.callViewMethod("getTransfer", [transferId], options || {});
        return {
            id: __r[0],
            nodeId: __r[1],
            contractAgreementId: __r[2],
            assetId: __r[3],
            dataHash: __r[4],
            status: __r[5],
            timestamp: __r[6],
        };
    }

    /**
     * Calls View method: paused()
     * Checks if the smart contract is paused
     * @param options The options for sending the request
     * @returns bool True if paused, false otherwise
     */
    public async paused(options?: MethodCallingOptions): Promise<boolean> {
        const __r: any = await this._contractInterface.callViewMethod("paused", [], options || {});
        return __r[0];
    }

    /**
     * Calls View method: policyExists(bytes32,string)
     * Method: policyExists(bytes32,string)
     * @param nodeId nodeId
     * @param policyId policyId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async policyExists(nodeId: BytesLike, policyId: string, options?: MethodCallingOptions): Promise<boolean> {
        const __r: any = await this._contractInterface.callViewMethod("policyExists", [nodeId, policyId], options || {});
        return __r[0];
    }

    /**
     * Calls View method: proxiableUUID()
     * Method: proxiableUUID()
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async proxiableUUID(options?: MethodCallingOptions): Promise<string> {
        const __r: any = await this._contractInterface.callViewMethod("proxiableUUID", [], options || {});
        return __r[0];
    }

    /**
     * Calls View method: transferExists(string)
     * Method: transferExists(string)
     * @param transferId transferId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async transferExists(transferId: string, options?: MethodCallingOptions): Promise<boolean> {
        const __r: any = await this._contractInterface.callViewMethod("transferExists", [transferId], options || {});
        return __r[0];
    }

    /**
     * Calls Transaction method: completeDataTransfer(string,bytes32)
     * Method: completeDataTransfer(string,bytes32)
     * @param transferId transferId
     * @param dataHash dataHash
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async completeDataTransfer(transferId: string, dataHash: BytesLike, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("completeDataTransfer", [transferId, dataHash], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: completeDataTransfer(string,bytes32)
     * Method: completeDataTransfer(string,bytes32)
     * @param transferId transferId
     * @param dataHash dataHash
     * @returns The details for building the transaction
     */
    public completeDataTransfer$txBuildDetails(transferId: string, dataHash: BytesLike): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("completeDataTransfer", [transferId, dataHash]);
    }

    /**
     * Calls Transaction method: initialize(address,address)
     * Method: initialize(address,address)
     * @param roleManagerAddress roleManagerAddress
     * @param upgradeControlAddress upgradeControlAddress
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async initialize(roleManagerAddress: AddressLike, upgradeControlAddress: AddressLike, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("initialize", [roleManagerAddress, upgradeControlAddress], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: initialize(address,address)
     * Method: initialize(address,address)
     * @param roleManagerAddress roleManagerAddress
     * @param upgradeControlAddress upgradeControlAddress
     * @returns The details for building the transaction
     */
    public initialize$txBuildDetails(roleManagerAddress: AddressLike, upgradeControlAddress: AddressLike): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("initialize", [roleManagerAddress, upgradeControlAddress]);
    }

    /**
     * Calls Transaction method: modifyAsset(bytes32,bytes32,bytes32)
     * Method: modifyAsset(bytes32,bytes32,bytes32)
     * @param nodeId nodeId
     * @param assetId assetId
     * @param newTitle newTitle
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async modifyAsset(nodeId: BytesLike, assetId: BytesLike, newTitle: BytesLike, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("modifyAsset", [nodeId, assetId, newTitle], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: modifyAsset(bytes32,bytes32,bytes32)
     * Method: modifyAsset(bytes32,bytes32,bytes32)
     * @param nodeId nodeId
     * @param assetId assetId
     * @param newTitle newTitle
     * @returns The details for building the transaction
     */
    public modifyAsset$txBuildDetails(nodeId: BytesLike, assetId: BytesLike, newTitle: BytesLike): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("modifyAsset", [nodeId, assetId, newTitle]);
    }

    /**
     * Calls Transaction method: modifyDataoffer(bytes32,string,string,string,string)
     * Method: modifyDataoffer(bytes32,string,string,string,string)
     * @param nodeId nodeId
     * @param offerId offerId
     * @param newAccessPolicyId newAccessPolicyId
     * @param newContractPolicyId newContractPolicyId
     * @param newAssetSelector newAssetSelector
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async modifyDataoffer(nodeId: BytesLike, offerId: string, newAccessPolicyId: string, newContractPolicyId: string, newAssetSelector: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("modifyDataoffer", [nodeId, offerId, newAccessPolicyId, newContractPolicyId, newAssetSelector], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: modifyDataoffer(bytes32,string,string,string,string)
     * Method: modifyDataoffer(bytes32,string,string,string,string)
     * @param nodeId nodeId
     * @param offerId offerId
     * @param newAccessPolicyId newAccessPolicyId
     * @param newContractPolicyId newContractPolicyId
     * @param newAssetSelector newAssetSelector
     * @returns The details for building the transaction
     */
    public modifyDataoffer$txBuildDetails(nodeId: BytesLike, offerId: string, newAccessPolicyId: string, newContractPolicyId: string, newAssetSelector: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("modifyDataoffer", [nodeId, offerId, newAccessPolicyId, newContractPolicyId, newAssetSelector]);
    }

    /**
     * Calls Transaction method: modifyPolicy(bytes32,string,string)
     * Method: modifyPolicy(bytes32,string,string)
     * @param nodeId nodeId
     * @param policyId policyId
     * @param newTitle newTitle
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async modifyPolicy(nodeId: BytesLike, policyId: string, newTitle: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("modifyPolicy", [nodeId, policyId, newTitle], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: modifyPolicy(bytes32,string,string)
     * Method: modifyPolicy(bytes32,string,string)
     * @param nodeId nodeId
     * @param policyId policyId
     * @param newTitle newTitle
     * @returns The details for building the transaction
     */
    public modifyPolicy$txBuildDetails(nodeId: BytesLike, policyId: string, newTitle: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("modifyPolicy", [nodeId, policyId, newTitle]);
    }

    /**
     * Calls Transaction method: pause()
     * Pauses the smart contract Requires ADMIN role
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async pause(options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("pause", [], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: pause()
     * Pauses the smart contract Requires ADMIN role
     * @returns The details for building the transaction
     */
    public pause$txBuildDetails(): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("pause", []);
    }

    /**
     * Calls Transaction method: registerAsset(bytes32,bytes32,bytes32)
     * Method: registerAsset(bytes32,bytes32,bytes32)
     * @param nodeId nodeId
     * @param assetId assetId
     * @param assetTitle assetTitle
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async registerAsset(nodeId: BytesLike, assetId: BytesLike, assetTitle: BytesLike, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("registerAsset", [nodeId, assetId, assetTitle], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: registerAsset(bytes32,bytes32,bytes32)
     * Method: registerAsset(bytes32,bytes32,bytes32)
     * @param nodeId nodeId
     * @param assetId assetId
     * @param assetTitle assetTitle
     * @returns The details for building the transaction
     */
    public registerAsset$txBuildDetails(nodeId: BytesLike, assetId: BytesLike, assetTitle: BytesLike): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("registerAsset", [nodeId, assetId, assetTitle]);
    }

    /**
     * Calls Transaction method: registerContratto(bytes32,string,string,uint256,string)
     * Method: registerContratto(bytes32,string,string,uint256,string)
     * @param nodeId nodeId
     * @param contractNegotiationId contractNegotiationId
     * @param counterpartyId counterpartyId
     * @param createdAt createdAt
     * @param state state
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async registerContratto(nodeId: BytesLike, contractNegotiationId: string, counterpartyId: string, createdAt: QuantityLike, state: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("registerContratto", [nodeId, contractNegotiationId, counterpartyId, createdAt, state], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: registerContratto(bytes32,string,string,uint256,string)
     * Method: registerContratto(bytes32,string,string,uint256,string)
     * @param nodeId nodeId
     * @param contractNegotiationId contractNegotiationId
     * @param counterpartyId counterpartyId
     * @param createdAt createdAt
     * @param state state
     * @returns The details for building the transaction
     */
    public registerContratto$txBuildDetails(nodeId: BytesLike, contractNegotiationId: string, counterpartyId: string, createdAt: QuantityLike, state: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("registerContratto", [nodeId, contractNegotiationId, counterpartyId, createdAt, state]);
    }

    /**
     * Calls Transaction method: registerDataoffer(bytes32,string,string,string,string)
     * Method: registerDataoffer(bytes32,string,string,string,string)
     * @param nodeId nodeId
     * @param offerId offerId
     * @param offerAccessPolicyId offerAccessPolicyId
     * @param offerContractPolicyId offerContractPolicyId
     * @param offerAssetSelector offerAssetSelector
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async registerDataoffer(nodeId: BytesLike, offerId: string, offerAccessPolicyId: string, offerContractPolicyId: string, offerAssetSelector: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("registerDataoffer", [nodeId, offerId, offerAccessPolicyId, offerContractPolicyId, offerAssetSelector], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: registerDataoffer(bytes32,string,string,string,string)
     * Method: registerDataoffer(bytes32,string,string,string,string)
     * @param nodeId nodeId
     * @param offerId offerId
     * @param offerAccessPolicyId offerAccessPolicyId
     * @param offerContractPolicyId offerContractPolicyId
     * @param offerAssetSelector offerAssetSelector
     * @returns The details for building the transaction
     */
    public registerDataoffer$txBuildDetails(nodeId: BytesLike, offerId: string, offerAccessPolicyId: string, offerContractPolicyId: string, offerAssetSelector: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("registerDataoffer", [nodeId, offerId, offerAccessPolicyId, offerContractPolicyId, offerAssetSelector]);
    }

    /**
     * Calls Transaction method: registerPolicy(bytes32,string,string)
     * Method: registerPolicy(bytes32,string,string)
     * @param nodeId nodeId
     * @param policyId policyId
     * @param policyTitle policyTitle
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async registerPolicy(nodeId: BytesLike, policyId: string, policyTitle: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("registerPolicy", [nodeId, policyId, policyTitle], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: registerPolicy(bytes32,string,string)
     * Method: registerPolicy(bytes32,string,string)
     * @param nodeId nodeId
     * @param policyId policyId
     * @param policyTitle policyTitle
     * @returns The details for building the transaction
     */
    public registerPolicy$txBuildDetails(nodeId: BytesLike, policyId: string, policyTitle: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("registerPolicy", [nodeId, policyId, policyTitle]);
    }

    /**
     * Calls Transaction method: requestDataTransfer(string,bytes32,string,string,string)
     * Method: requestDataTransfer(string,bytes32,string,string,string)
     * @param transferId transferId
     * @param nodeId nodeId
     * @param contractAgreementId contractAgreementId
     * @param statusout statusout
     * @param assetId assetId
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async requestDataTransfer(transferId: string, nodeId: BytesLike, contractAgreementId: string, statusout: string, assetId: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("requestDataTransfer", [transferId, nodeId, contractAgreementId, statusout, assetId], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: requestDataTransfer(string,bytes32,string,string,string)
     * Method: requestDataTransfer(string,bytes32,string,string,string)
     * @param transferId transferId
     * @param nodeId nodeId
     * @param contractAgreementId contractAgreementId
     * @param statusout statusout
     * @param assetId assetId
     * @returns The details for building the transaction
     */
    public requestDataTransfer$txBuildDetails(transferId: string, nodeId: BytesLike, contractAgreementId: string, statusout: string, assetId: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("requestDataTransfer", [transferId, nodeId, contractAgreementId, statusout, assetId]);
    }

    /**
     * Calls Transaction method: unpause()
     * Unpauses the smart contract Requires ADMIN role
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async unpause(options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("unpause", [], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: unpause()
     * Unpauses the smart contract Requires ADMIN role
     * @returns The details for building the transaction
     */
    public unpause$txBuildDetails(): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("unpause", []);
    }

    /**
     * Calls Transaction method: updateContrattoState(bytes32,string,string)
     * Method: updateContrattoState(bytes32,string,string)
     * @param nodeId nodeId
     * @param contractNegotiationId contractNegotiationId
     * @param newState newState
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async updateContrattoState(nodeId: BytesLike, contractNegotiationId: string, newState: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("updateContrattoState", [nodeId, contractNegotiationId, newState], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: updateContrattoState(bytes32,string,string)
     * Method: updateContrattoState(bytes32,string,string)
     * @param nodeId nodeId
     * @param contractNegotiationId contractNegotiationId
     * @param newState newState
     * @returns The details for building the transaction
     */
    public updateContrattoState$txBuildDetails(nodeId: BytesLike, contractNegotiationId: string, newState: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("updateContrattoState", [nodeId, contractNegotiationId, newState]);
    }

    /**
     * Calls Transaction method: upgradeToAndCall(address,bytes)
     * Method: upgradeToAndCall(address,bytes)
     * @param newImplementation newImplementation
     * @param data data
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async upgradeToAndCall(newImplementation: AddressLike, data: BytesLike, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("upgradeToAndCall", [newImplementation, data], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: upgradeToAndCall(address,bytes)
     * Method: upgradeToAndCall(address,bytes)
     * @param newImplementation newImplementation
     * @param data data
     * @returns The details for building the transaction
     */
    public upgradeToAndCall$txBuildDetails(newImplementation: AddressLike, data: BytesLike): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("upgradeToAndCall", [newImplementation, data]);
    }

    /**
     * Finds events sent by the smart contract
     * @param fromBlock Beginning of the block range
     * @param toBlock Ending of the block range
     * @returns A connection of events
     */
    public async findEvents(fromBlock: QuantityLike | BlockTag, toBlock: QuantityLike | BlockTag): Promise<ExampleContractEventCollection> {
        const events = await this._contractInterface.findEvents(fromBlock, toBlock);
        return new ExampleContractEventCollection(events);
    }
}

/**
 * Possible event types for contract: ExampleContract
 */
export type ExampleContractEventType = "AssetModified" | "AssetRegistered" | "ContrattoRegistered" | "ContrattoStateUpdated" | "DataTransferCompleted" | "DataTransferRequested" | "DataofferModified" | "DataofferRegistered" | "Initialized" | "Paused" | "PolicyModified" | "PolicyRegistered" | "Unpaused" | "Upgraded";

/**
 * Collection of events for contract: ExampleContract
 */
export class ExampleContractEventCollection {
    /**
     * Array of events
     */
    public events: SmartContractEvent[];

    /**
     * Event collection constructor
     * @param events Array of events
     */
    constructor(events: SmartContractEvent[]) {
        this.events = events;
    }

    /**
     * Gets the number of events in the collection
     * @returns The event count
     */
    public length(): number {
        return this.events.length;
    }

    /**
     * Gets the event type given the index
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event type
     */
    public getEventType(index: number): ExampleContractEventType {
        return <any>this.events[index].name;
    }

    /**
     * Filters the collection by event type
     * @param eventType The event type
     * @returns A collection containing only the event of the specified type
     */
    public filter(eventType: ExampleContractEventType): ExampleContractEventCollection {
        return new ExampleContractEventCollection(this.events.filter(event => event.name === eventType));
    }

    /**
     * Get an event of type AssetModified(bytes32,bytes32,uint64,bytes32) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getAssetModifiedEvent(index: number): SmartContractEventWrapper<AssetModifiedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                nodeId: __r[0],
                assetId: __r[1],
                timestamp: __r[2],
                newTitle: __r[3],
            },
        };
    }

    /**
     * Get an event of type AssetRegistered(address,bytes32,bytes32,uint64,bytes32) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getAssetRegisteredEvent(index: number): SmartContractEventWrapper<AssetRegisteredEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                registrar: __r[0],
                nodeId: __r[1],
                assetId: __r[2],
                timestamp: __r[3],
                title: __r[4],
            },
        };
    }

    /**
     * Get an event of type ContrattoRegistered(address,bytes32,string,string,uint256,string) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getContrattoRegisteredEvent(index: number): SmartContractEventWrapper<ContrattoRegisteredEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                registrar: __r[0],
                nodeId: __r[1],
                contractNegotiationId: __r[2],
                counterpartyId: __r[3],
                createdAt: __r[4],
                state: __r[5],
            },
        };
    }

    /**
     * Get an event of type ContrattoStateUpdated(bytes32,string,uint256,string) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getContrattoStateUpdatedEvent(index: number): SmartContractEventWrapper<ContrattoStateUpdatedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                nodeId: __r[0],
                contractNegotiationId: __r[1],
                timestamp: __r[2],
                newState: __r[3],
            },
        };
    }

    /**
     * Get an event of type DataTransferCompleted(string,bytes32,uint256) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getDataTransferCompletedEvent(index: number): SmartContractEventWrapper<DataTransferCompletedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                transferId: __r[0],
                dataHash: __r[1],
                timestamp: __r[2],
            },
        };
    }

    /**
     * Get an event of type DataTransferRequested(string,string,address,uint256,uint8) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getDataTransferRequestedEvent(index: number): SmartContractEventWrapper<DataTransferRequestedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                transferId: __r[0],
                assetId: __r[1],
                consumer: __r[2],
                timestamp: __r[3],
                status: __r[4],
            },
        };
    }

    /**
     * Get an event of type DataofferModified(bytes32,string,uint256,string,string,string) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getDataofferModifiedEvent(index: number): SmartContractEventWrapper<DataofferModifiedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                nodeId: __r[0],
                offerId: __r[1],
                timestamp: __r[2],
                newAccessPolicyId: __r[3],
                newContractPolicyId: __r[4],
                newAssetSelector: __r[5],
            },
        };
    }

    /**
     * Get an event of type DataofferRegistered(address,bytes32,string,uint256,string,string,string) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getDataofferRegisteredEvent(index: number): SmartContractEventWrapper<DataofferRegisteredEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                registrar: __r[0],
                nodeId: __r[1],
                offerId: __r[2],
                timestamp: __r[3],
                accessPolicyId: __r[4],
                contractPolicyId: __r[5],
                assetSelector: __r[6],
            },
        };
    }

    /**
     * Get an event of type Initialized(uint64) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getInitializedEvent(index: number): SmartContractEventWrapper<InitializedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                version: __r[0],
            },
        };
    }

    /**
     * Get an event of type Paused(address) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getPausedEvent(index: number): SmartContractEventWrapper<PausedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                by: __r[0],
            },
        };
    }

    /**
     * Get an event of type PolicyModified(bytes32,string,uint256,string) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getPolicyModifiedEvent(index: number): SmartContractEventWrapper<PolicyModifiedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                nodeId: __r[0],
                policyId: __r[1],
                timestamp: __r[2],
                newTitle: __r[3],
            },
        };
    }

    /**
     * Get an event of type PolicyRegistered(address,bytes32,string,uint256,string) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getPolicyRegisteredEvent(index: number): SmartContractEventWrapper<PolicyRegisteredEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                registrar: __r[0],
                nodeId: __r[1],
                policyId: __r[2],
                timestamp: __r[3],
                title: __r[4],
            },
        };
    }

    /**
     * Get an event of type Unpaused(address) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getUnpausedEvent(index: number): SmartContractEventWrapper<UnpausedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                by: __r[0],
            },
        };
    }

    /**
     * Get an event of type Upgraded(address) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getUpgradedEvent(index: number): SmartContractEventWrapper<UpgradedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                implementation: __r[0],
            },
        };
    }
}

/**
 * Event: AssetModified(bytes32,bytes32,uint64,bytes32)
 */
export interface AssetModifiedEvent {
    nodeId: string,

    assetId: string,

    timestamp: Quantity,

    newTitle: string,
}

/**
 * Event: AssetRegistered(address,bytes32,bytes32,uint64,bytes32)
 */
export interface AssetRegisteredEvent {
    registrar: Address,

    nodeId: string,

    assetId: string,

    timestamp: Quantity,

    title: string,
}

/**
 * Event: ContrattoRegistered(address,bytes32,string,string,uint256,string)
 */
export interface ContrattoRegisteredEvent {
    registrar: Address,

    nodeId: string,

    contractNegotiationId: string,

    counterpartyId: string,

    createdAt: Quantity,

    state: string,
}

/**
 * Event: ContrattoStateUpdated(bytes32,string,uint256,string)
 */
export interface ContrattoStateUpdatedEvent {
    nodeId: string,

    contractNegotiationId: string,

    timestamp: Quantity,

    newState: string,
}

/**
 * Event: DataTransferCompleted(string,bytes32,uint256)
 */
export interface DataTransferCompletedEvent {
    transferId: string,

    dataHash: string,

    timestamp: Quantity,
}

/**
 * Event: DataTransferRequested(string,string,address,uint256,uint8)
 */
export interface DataTransferRequestedEvent {
    transferId: string,

    assetId: string,

    consumer: Address,

    timestamp: Quantity,

    status: Quantity,
}

/**
 * Event: DataofferModified(bytes32,string,uint256,string,string,string)
 */
export interface DataofferModifiedEvent {
    nodeId: string,

    offerId: string,

    timestamp: Quantity,

    newAccessPolicyId: string,

    newContractPolicyId: string,

    newAssetSelector: string,
}

/**
 * Event: DataofferRegistered(address,bytes32,string,uint256,string,string,string)
 */
export interface DataofferRegisteredEvent {
    registrar: Address,

    nodeId: string,

    offerId: string,

    timestamp: Quantity,

    accessPolicyId: string,

    contractPolicyId: string,

    assetSelector: string,
}

/**
 * Event: Initialized(uint64)
 */
export interface InitializedEvent {
    version: Quantity,
}

/**
 * Event: Paused(address)
 * Paused - The smart contract was paused
 */
export interface PausedEvent {
    /**
     * The administrator who paused the smart contract
     */
    by: Address,
}

/**
 * Event: PolicyModified(bytes32,string,uint256,string)
 */
export interface PolicyModifiedEvent {
    nodeId: string,

    policyId: string,

    timestamp: Quantity,

    newTitle: string,
}

/**
 * Event: PolicyRegistered(address,bytes32,string,uint256,string)
 */
export interface PolicyRegisteredEvent {
    registrar: Address,

    nodeId: string,

    policyId: string,

    timestamp: Quantity,

    title: string,
}

/**
 * Event: Unpaused(address)
 * Paused - The smart contract was paused
 */
export interface UnpausedEvent {
    /**
     * The administrator who paused the smart contract
     */
    by: Address,
}

/**
 * Event: Upgraded(address)
 */
export interface UpgradedEvent {
    implementation: Address,
}

const CONTRACT_ABI: ABILike = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            }
        ],
        "name": "AddressEmptyCode",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "ERC1967InvalidImplementation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ERC1967NonPayable",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "FailedInnerCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidInitialization",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotInitializing",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UUPSUnauthorizedCallContext",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "slot",
                "type": "bytes32"
            }
        ],
        "name": "UUPSUnsupportedProxiableUUID",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "assetId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "newTitle",
                "type": "bytes32"
            }
        ],
        "name": "AssetModified",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "registrar",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "assetId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "title",
                "type": "bytes32"
            }
        ],
        "name": "AssetRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "registrar",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "contractNegotiationId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "counterpartyId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "createdAt",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "state",
                "type": "string"
            }
        ],
        "name": "ContrattoRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "contractNegotiationId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newState",
                "type": "string"
            }
        ],
        "name": "ContrattoStateUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "transferId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "dataHash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "DataTransferCompleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "transferId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "assetId",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "consumer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "enum ExampleContract.TransferStatus",
                "name": "status",
                "type": "uint8"
            }
        ],
        "name": "DataTransferRequested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "offerId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newAccessPolicyId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newContractPolicyId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newAssetSelector",
                "type": "string"
            }
        ],
        "name": "DataofferModified",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "registrar",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "offerId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "accessPolicyId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "contractPolicyId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "assetSelector",
                "type": "string"
            }
        ],
        "name": "DataofferRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "version",
                "type": "uint64"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "by",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "policyId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newTitle",
                "type": "string"
            }
        ],
        "name": "PolicyModified",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "registrar",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "policyId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "title",
                "type": "string"
            }
        ],
        "name": "PolicyRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "by",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "UPGRADE_INTERFACE_VERSION",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "assetId",
                "type": "bytes32"
            }
        ],
        "name": "assetExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "transferId",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "dataHash",
                "type": "bytes32"
            }
        ],
        "name": "completeDataTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "contractNegotiationId",
                "type": "string"
            }
        ],
        "name": "contrattoExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "offerId",
                "type": "string"
            }
        ],
        "name": "dataofferExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "assetId",
                "type": "bytes32"
            }
        ],
        "name": "getAsset",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "nId",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "registrar",
                "type": "address"
            },
            {
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            },
            {
                "internalType": "bytes32",
                "name": "title",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "contractNegotiationId",
                "type": "string"
            }
        ],
        "name": "getContratto",
        "outputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "nId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "counterpartyId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "createdAt",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "state",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "offerId",
                "type": "string"
            }
        ],
        "name": "getDataoffer",
        "outputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "nId",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "registrar",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "accessPolicyId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "contractPolicyId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "assetSelector",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getInitializedVersion",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "v",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "policyId",
                "type": "string"
            }
        ],
        "name": "getPolicy",
        "outputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "nId",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "registrar",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "transferId",
                "type": "string"
            }
        ],
        "name": "getTransfer",
        "outputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "contractAgreementId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "assetId",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "dataHash",
                "type": "bytes32"
            },
            {
                "internalType": "enum ExampleContract.TransferStatus",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "roleManagerAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "upgradeControlAddress",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "assetId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "newTitle",
                "type": "bytes32"
            }
        ],
        "name": "modifyAsset",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "offerId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newAccessPolicyId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newContractPolicyId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newAssetSelector",
                "type": "string"
            }
        ],
        "name": "modifyDataoffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "policyId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newTitle",
                "type": "string"
            }
        ],
        "name": "modifyPolicy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "policyId",
                "type": "string"
            }
        ],
        "name": "policyExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "assetId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "assetTitle",
                "type": "bytes32"
            }
        ],
        "name": "registerAsset",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "contractNegotiationId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "counterpartyId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "createdAt",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "state",
                "type": "string"
            }
        ],
        "name": "registerContratto",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "offerId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "offerAccessPolicyId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "offerContractPolicyId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "offerAssetSelector",
                "type": "string"
            }
        ],
        "name": "registerDataoffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "policyId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "policyTitle",
                "type": "string"
            }
        ],
        "name": "registerPolicy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "transferId",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "contractAgreementId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "statusout",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "assetId",
                "type": "string"
            }
        ],
        "name": "requestDataTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "transferId",
                "type": "string"
            }
        ],
        "name": "transferExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "nodeId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "contractNegotiationId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newState",
                "type": "string"
            }
        ],
        "name": "updateContrattoState",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];
