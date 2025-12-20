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

import { Quantity, SmartContractEventWrapper, SmartContractEvent, Address, MethodCallingOptions, AddressLike, MethodTransactionOptions, TransactionResult, BytesLike, SmartContractInterface, TransactionBuildDetails, QuantityLike, BlockTag, RPCOptions, ABILike } from "@asanrom/smart-contract-wrapper";

/**
 * Contract wrapper: ExampleContract
 * This is an example smart contract
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
     * Calls View method: getAsset(string)
     * Restituisce i dettagli di un asset
     * @param assetId assetId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async getAsset(assetId: string, options?: MethodCallingOptions): Promise<{id: string, owner: Address, timestamp: Quantity, title: string}> {
        const __r: any = await this._contractInterface.callViewMethod("getAsset", [assetId], options || {});
        return {
            id: __r[0],
            owner: __r[1],
            timestamp: __r[2],
            title: __r[3],
        };
    }

    /**
     * Calls View method: getDataoffer(string)
     * Restituisce i dettagli di un policy
     * @param offerId offerId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async getDataoffer(offerId: string, options?: MethodCallingOptions): Promise<{id: string, owner: Address, timestamp: Quantity, title: string}> {
        const __r: any = await this._contractInterface.callViewMethod("getDataoffer", [offerId], options || {});
        return {
            id: __r[0],
            owner: __r[1],
            timestamp: __r[2],
            title: __r[3],
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
     * Calls View method: getPolicy(string)
     * Restituisce i dettagli di un policy
     * @param policyId policyId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async getPolicy(policyId: string, options?: MethodCallingOptions): Promise<{id: string, owner: Address, timestamp: Quantity, title: string}> {
        const __r: any = await this._contractInterface.callViewMethod("getPolicy", [policyId], options || {});
        return {
            id: __r[0],
            owner: __r[1],
            timestamp: __r[2],
            title: __r[3],
        };
    }

    /**
     * Calls View method: isRegistered(string)
     * Controlla se un asset è registrato
     * @param assetId assetId
     * @param options The options for sending the request
     * @returns The result for calling the method
     */
    public async isRegistered(assetId: string, options?: MethodCallingOptions): Promise<boolean> {
        const __r: any = await this._contractInterface.callViewMethod("isRegistered", [assetId], options || {});
        return __r[0];
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
     * Calls Transaction method: modifyAsset(string,string)
     * Modifica titolo di un asset esistente
     * @param assetId assetId
     * @param newTitle newTitle
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async modifyAsset(assetId: string, newTitle: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("modifyAsset", [assetId, newTitle], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: modifyAsset(string,string)
     * Modifica titolo di un asset esistente
     * @param assetId assetId
     * @param newTitle newTitle
     * @returns The details for building the transaction
     */
    public modifyAsset$txBuildDetails(assetId: string, newTitle: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("modifyAsset", [assetId, newTitle]);
    }

    /**
     * Calls Transaction method: modifyDataoffer(string,string)
     * Modifica titolo di un dataoffer
     * @param offerId offerId
     * @param newTitle newTitle
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async modifyDataoffer(offerId: string, newTitle: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("modifyDataoffer", [offerId, newTitle], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: modifyDataoffer(string,string)
     * Modifica titolo di un dataoffer
     * @param offerId offerId
     * @param newTitle newTitle
     * @returns The details for building the transaction
     */
    public modifyDataoffer$txBuildDetails(offerId: string, newTitle: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("modifyDataoffer", [offerId, newTitle]);
    }

    /**
     * Calls Transaction method: modifyPolicy(string,string)
     * Modifica titolo di un policy esistente
     * @param policyId policyId
     * @param newTitle newTitle
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async modifyPolicy(policyId: string, newTitle: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("modifyPolicy", [policyId, newTitle], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: modifyPolicy(string,string)
     * Modifica titolo di un policy esistente
     * @param policyId policyId
     * @param newTitle newTitle
     * @returns The details for building the transaction
     */
    public modifyPolicy$txBuildDetails(policyId: string, newTitle: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("modifyPolicy", [policyId, newTitle]);
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
     * Calls Transaction method: registerAsset(string,string)
     * Registra un nuovo asset
     * @param assetId assetId
     * @param assetTitle assetTitle
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async registerAsset(assetId: string, assetTitle: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("registerAsset", [assetId, assetTitle], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: registerAsset(string,string)
     * Registra un nuovo asset
     * @param assetId assetId
     * @param assetTitle assetTitle
     * @returns The details for building the transaction
     */
    public registerAsset$txBuildDetails(assetId: string, assetTitle: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("registerAsset", [assetId, assetTitle]);
    }

    /**
     * Calls Transaction method: registerDataoffer(string,string)
     * Registra un nuovo Dataoffer
     * @param offerId offerId
     * @param offerTitle offerTitle
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async registerDataoffer(offerId: string, offerTitle: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("registerDataoffer", [offerId, offerTitle], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: registerDataoffer(string,string)
     * Registra un nuovo Dataoffer
     * @param offerId offerId
     * @param offerTitle offerTitle
     * @returns The details for building the transaction
     */
    public registerDataoffer$txBuildDetails(offerId: string, offerTitle: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("registerDataoffer", [offerId, offerTitle]);
    }

    /**
     * Calls Transaction method: registerPolicy(string,string)
     * Registra un nuovo policy
     * @param policyId policyId
     * @param policyTitle policyTitle
     * @param options The options for sending the transaction
     * @returns The transaction result
     */
    public async registerPolicy(policyId: string, policyTitle: string, options: MethodTransactionOptions): Promise<TransactionResult<ExampleContractEventCollection>> {
        const __r = await this._contractInterface.callMutableMethod("registerPolicy", [policyId, policyTitle], options);
    
        if (__r.receipt.status > BigInt(0)) {
            const decodedEvents = this._contractInterface.parseTransactionLogs(__r.receipt.logs);
            return { receipt: __r.receipt, result: new ExampleContractEventCollection(decodedEvents) };
        } else {
            throw new Error("Transaction reverted");
        }
    }
    
    /**
     * Gets details for building a transaction calling the method: registerPolicy(string,string)
     * Registra un nuovo policy
     * @param policyId policyId
     * @param policyTitle policyTitle
     * @returns The details for building the transaction
     */
    public registerPolicy$txBuildDetails(policyId: string, policyTitle: string): TransactionBuildDetails {
        return this._contractInterface.encodeMutableMethod("registerPolicy", [policyId, policyTitle]);
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
export type ExampleContractEventType = "AssetModified" | "AssetRegistered" | "DataTransferApproved" | "DataTransferCompleted" | "DataTransferRejected" | "DataTransferRequested" | "DataofferModified" | "DataofferRegistered" | "Initialized" | "Paused" | "PolicyModified" | "PolicyRegistered" | "Unpaused" | "Upgraded";

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
     * Get an event of type AssetModified(string,string,uint256) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getAssetModifiedEvent(index: number): SmartContractEventWrapper<AssetModifiedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                assetId: __r[0],
                newTitle: __r[1],
                timestamp: __r[2],
            },
        };
    }

    /**
     * Get an event of type AssetRegistered(address,string,uint256,string) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getAssetRegisteredEvent(index: number): SmartContractEventWrapper<AssetRegisteredEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                owner: __r[0],
                assetId: __r[1],
                timestamp: __r[2],
                title: __r[3],
            },
        };
    }

    /**
     * Get an event of type DataTransferApproved(string,address,uint256) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getDataTransferApprovedEvent(index: number): SmartContractEventWrapper<DataTransferApprovedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                transferId: __r[0],
                provider: __r[1],
                timestamp: __r[2],
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
     * Get an event of type DataTransferRejected(string,uint256) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getDataTransferRejectedEvent(index: number): SmartContractEventWrapper<DataTransferRejectedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                transferId: __r[0],
                timestamp: __r[1],
            },
        };
    }

    /**
     * Get an event of type DataTransferRequested(string,string,address,uint256) from the collection
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
            },
        };
    }

    /**
     * Get an event of type DataofferModified(string,string,uint256) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getDataofferModifiedEvent(index: number): SmartContractEventWrapper<DataofferModifiedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                offerId: __r[0],
                newTitle: __r[1],
                timestamp: __r[2],
            },
        };
    }

    /**
     * Get an event of type DataofferRegistered(address,string,uint256,string) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getDataofferRegisteredEvent(index: number): SmartContractEventWrapper<DataofferRegisteredEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                owner: __r[0],
                offerId: __r[1],
                timestamp: __r[2],
                title: __r[3],
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
     * Get an event of type PolicyModified(string,string,uint256) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getPolicyModifiedEvent(index: number): SmartContractEventWrapper<PolicyModifiedEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                policyId: __r[0],
                newTitle: __r[1],
                timestamp: __r[2],
            },
        };
    }

    /**
     * Get an event of type PolicyRegistered(address,string,uint256,string) from the collection
     * @param index Event index in the collection (from 0 to length - 1)
     * @returns The event object
     */
    public getPolicyRegisteredEvent(index: number): SmartContractEventWrapper<PolicyRegisteredEvent> {
        const __r: any = this.events[index].parameters;
        return {
            event: this.events[index],
            data: {
                owner: __r[0],
                policyId: __r[1],
                timestamp: __r[2],
                title: __r[3],
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
 * Event: AssetModified(string,string,uint256)
 */
export interface AssetModifiedEvent {
    assetId: string,

    newTitle: string,

    timestamp: Quantity,
}

/**
 * Event: AssetRegistered(address,string,uint256,string)
 */
export interface AssetRegisteredEvent {
    owner: Address,

    assetId: string,

    timestamp: Quantity,

    title: string,
}

/**
 * Event: DataTransferApproved(string,address,uint256)
 */
export interface DataTransferApprovedEvent {
    transferId: string,

    provider: Address,

    timestamp: Quantity,
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
 * Event: DataTransferRejected(string,uint256)
 */
export interface DataTransferRejectedEvent {
    transferId: string,

    timestamp: Quantity,
}

/**
 * Event: DataTransferRequested(string,string,address,uint256)
 */
export interface DataTransferRequestedEvent {
    transferId: string,

    assetId: string,

    consumer: Address,

    timestamp: Quantity,
}

/**
 * Event: DataofferModified(string,string,uint256)
 */
export interface DataofferModifiedEvent {
    offerId: string,

    newTitle: string,

    timestamp: Quantity,
}

/**
 * Event: DataofferRegistered(address,string,uint256,string)
 */
export interface DataofferRegisteredEvent {
    owner: Address,

    offerId: string,

    timestamp: Quantity,

    title: string,
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
 * Event: PolicyModified(string,string,uint256)
 */
export interface PolicyModifiedEvent {
    policyId: string,

    newTitle: string,

    timestamp: Quantity,
}

/**
 * Event: PolicyRegistered(address,string,uint256,string)
 */
export interface PolicyRegisteredEvent {
    owner: Address,

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
                "indexed": false,
                "internalType": "string",
                "name": "assetId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newTitle",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
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
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "assetId",
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
        "name": "AssetRegistered",
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
                "indexed": true,
                "internalType": "address",
                "name": "provider",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "DataTransferApproved",
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
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "DataTransferRejected",
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
            }
        ],
        "name": "DataTransferRequested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "offerId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newTitle",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
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
                "name": "owner",
                "type": "address"
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
                "name": "title",
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
                "indexed": false,
                "internalType": "string",
                "name": "policyId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newTitle",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
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
                "name": "owner",
                "type": "address"
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
                "internalType": "string",
                "name": "assetId",
                "type": "string"
            }
        ],
        "name": "getAsset",
        "outputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "owner",
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
                "internalType": "address",
                "name": "owner",
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
                "internalType": "address",
                "name": "owner",
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
                "internalType": "string",
                "name": "assetId",
                "type": "string"
            }
        ],
        "name": "isRegistered",
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
                "name": "assetId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newTitle",
                "type": "string"
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
                "internalType": "string",
                "name": "offerId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newTitle",
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
                "internalType": "string",
                "name": "assetId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "assetTitle",
                "type": "string"
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
                "internalType": "string",
                "name": "offerId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "offerTitle",
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
        "inputs": [],
        "name": "unpause",
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
