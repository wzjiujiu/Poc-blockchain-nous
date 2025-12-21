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

// API definitions (Auto generated)

"use strict"

export interface WalletInfo {
    /**
     * Wallet ID
     */
    id: string;

    /**
     * Wallet name
     */
    name?: string;

    /**
     * Wallet address
     */
    address?: string;
}

export interface WalletCreateBody {
    /**
     * Wallet name (max 80 chars)
     */
    name: string;

    /**
     * Password to protect the wallet
     */
    password: string;

    /**
     * Private key (HEX). If not provided, a random one is generated.
     */
    private_key?: string;
}

export interface WalletCreateBadRequest {
    /**
     * Error Code:
     *  - INVALID_NAME: Invalid wallet name
     *  - TOO_MANY_WALLETS: You have too many wallets
     *  - WEAK_PASSWORD: Password too weak
     *  - INVALID_PRIVATE_KEY: Invalid private key provided
     */
    code: string;
}

export interface WalletEditBody {
    /**
     * Wallet name (max 80 chars)
     */
    name: string;
}

export interface WalletEditBadRequest {
    /**
     * Error Code:
     *  - INVALID_NAME: Invalid wallet name
     */
    code: string;
}

export interface WalletChangePasswordBody {
    /**
     * Current password
     */
    password: string;

    /**
     * New password
     */
    new_password: string;
}

export interface WalletChangePasswordBadRequest {
    /**
     * Error Code:
     *  - WEAK_PASSWORD: Password too weak
     *  - WRONG_PASSWORD: Wrong current password
     */
    code: string;
}

export interface WalletExportBody {
    /**
     * Current password
     */
    password: string;
}

export interface WalletExportBadRequest {
    /**
     * Error Code:
     *  - WRONG_PASSWORD: Wrong current password
     */
    code: string;
}

export interface WalletExportResponse {
    /**
     * Private key (HEX)
     */
    private_key: string;
}

export interface TxBadRequest {
    /**
     * Error Code:
     *  - INVALID_PARAMETERS: Invalid smart contract function parameters
     *  - INVALID_VALUE: Invalid transaction value
     */
    code: string;
}

export interface TxSigningOptions {
    /**
     * Mode for signing the transaction. Can be return_data(do not sign, return the transaction data), wallet(use a wallet) or private_key (use a private key) 
     */
    mode: "return_data" | "wallet" | "private_key";

    /**
     * ID of the wallet to use
     */
    walletId?: string;

    /**
     * Password to unlock the wallet
     */
    walletPassword?: string;

    /**
     * Private key to sign the transaction (hexadecimal)
     */
    privateKey?: string;
}

export interface TxSigningForbiddenResponse {
    /**
     * Error Code:
     *  - ACCESS_DENIED: Access denied to the API
     *  - WALLET_NOT_FOUND: Wallet not found
     *  - INVALID_WALLET_PASSWORD: Invalid wallet password
     *  - INVALID_PRIVATE_KEY: Invalid private key provided
     */
    code: string;
}

export interface TransactionData {
    /**
     * Destination address of the transaction
     */
    to?: string;

    /**
     * Transaction data (hexadecimal)
     */
    data: string;

    /**
     * Transaction value (hexadecimal with 0x prefix)
     */
    value: string;
}

export interface TxResponse {
    sendResult?: SendSignedTransactionResponse;

    transactionData?: TransactionData;
}

export interface AccountTransactionState {
    /**
     * Next transaction nonce (hexadecimal with 0x prefix)
     */
    nonce: string;

    /**
     * Chain ID
     */
    chainId: number;
}

export interface GasEstimationRequest {
    /**
     * Destination address of the transaction
     */
    to?: string;

    /**
     * Sender address
     */
    from: string;

    /**
     * Transaction data (hexadecimal)
     */
    data: string;

    /**
     * Transaction value (hexadecimal with 0x prefix)
     */
    value: string;
}

export interface GasEstimationBadRequest {
    /**
     * Error Code:
     *  - INVALID_TO: Invalid to address
     *  - INVALID_FROM: Invalid from address
     *  - INVALID_DATA: Invalid transaction data
     *  - INVALID_VALUE Invalid transaction value
     */
    code: string;
}

export interface GasEstimationResponse {
    /**
     * True if the estimation was successful
     */
    success: boolean;

    /**
     * Estimated mount of gas (hexadecimal with 0x prefix)
     */
    gas?: string;

    /**
     * Error message if the estimation failed
     */
    error?: string;
}

export interface SendSignedTransactionRequest {
    /**
     * Account sending the transaction
     */
    account: string;

    /**
     * Signed transaction (hex)
     */
    tx: string;

    /**
     * The transaction nonce
     */
    nonce: string;
}

export interface SendSignedTransactionBadRequest {
    /**
     * Error Code:
     *  - INVALID_ACCOUNT - Invalid account address
     *  - INVALID_NONCE - Invalid nonce
     *  - INVALID_TX - Invalid transaction
     */
    code: string;
}

export interface SendSignedTransactionResponse {
    /**
     * True if success
     */
    success: boolean;

    /**
     * Error message
     */
    error?: string;

    /**
     * Transaction hash
     */
    txHash?: string;

    /**
     * EVM Execution status (1 = OK, 0 = ERROR)
     */
    status?: number;

    /**
     * Deployed contract address
     */
    contract?: string;
}

export interface SendArbitraryTransactionBody {
    /**
     * Destination address 
     */
    to: string;

    /**
     * The transaction value (wei) 
     */
    value: string;

    /**
     * The transaction data (hexadecimal) 
     */
    data: string;

    txSign: TxSigningOptions;
}

export interface SendArbitraryTransactionBadRequest {
    /**
     * Error Code:
     *  - INVALID_TO: Invalid to address provided
     *  - INVALID_VALUE: Invalid transaction value provided
     *  - INVALID_DATA: Invalid transaction data provided
     */
    code: string;
}

export interface AbiEntryType {
    /**
     * Name 
     */
    name?: string;

    /**
     * Type 
     */
    type?: string;

    /**
     * Internal type 
     */
    internalType?: string;

    /**
     * If the event parameter is indexed.
     */
    indexed?: boolean;

    components?: AbiEntryType[];
}

export interface AbiEntry {
    /**
     * Entry name 
     */
    name?: string;

    /**
     * Entry type 
     */
    type?: string;

    /**
     * If the event is anonymous.
     */
    anonymous?: boolean;

    /**
     * If the function is payable.
     */
    payable?: boolean;

    /**
     * If the function is constant.
     */
    constant?: boolean;

    /**
     *  The mutability state of the function. 
     */
    stateMutability?: string;

    /**
     * The gas limit to use when sending a transaction for this function. 
     */
    gas?: string;
}

export interface DeploySmartContractBody {
    abi: AbiEntry[];

    /**
     * Smart contract bytecode (hexadecimal) 
     */
    bytecode: string;

    constructorParameters: string[];

    /**
     * The transaction value (wei) 
     */
    value: string;

    txSign: TxSigningOptions;
}

export interface DeploySmartContractBadRequest {
    /**
     * Error Code:
     *  - INVALID_VALUE: Invalid transaction value provided
     *  - INVALID_ABI: Invalid ABI provided
     *  - INVALID_BYTECODE: Invalid bytecode
     */
    code: string;
}

export interface SendSmartContractTransactionBody {
    /**
     * Smart contract address
     */
    contractAddress: string;

    abi: AbiEntry[];

    /**
     * Name of the contract method to invoke
     */
    method: string;

    parameters: string[];

    /**
     * The transaction value (wei) 
     */
    value: string;

    txSign: TxSigningOptions;
}

export interface SendSmartContractTransactionBadRequest {
    /**
     * Error Code:
     *  - INVALID_CONTRACT_ADDRESS: Invalid smart contract address
     *  - INVALID_VALUE: Invalid transaction value provided
     *  - INVALID_ABI_OR_PARAMETERS: Invalid ABI or parameters provided
     */
    code: string;
}

export interface SmartContractInformation {
    /**
     * Smart contract address 
     */
    address: string;

    abi: AbiEntry[];

    /**
     * Block number for the first found event
     */
    firstEventBlock?: number;

    /**
     * Block number for the last synced event
     */
    lastSyncedEventBlock?: number;
}

export interface BlockInformation {
    /**
     * Block number
     */
    number: number;

    /**
     * Block hash
     */
    hash: string;

    /**
     * Mix hash
     */
    mixHash: string;

    /**
     * Parent hash
     */
    parentHash: string;

    /**
     * Transactions root
     */
    transactionsRoot: string;

    /**
     * Block timestamp
     */
    timestamp: number;

    /**
     * Nonce
     */
    nonce?: string;

    /**
     * sha3Uncles
     */
    sha3Uncles?: string;

    /**
     * Logs bloom
     */
    logsBloom?: string;

    /**
     * State root
     */
    stateRoot?: string;

    /**
     * Receipts root
     */
    receiptsRoot?: string;

    /**
     * Miner address
     */
    miner?: string;

    /**
     * Difficulty
     */
    difficulty?: number;

    /**
     * Total difficulty
     */
    totalDifficulty?: number;

    /**
     * Extra data
     */
    extraData?: string;

    /**
     * Block size
     */
    size?: number;

    /**
     * Gas limit
     */
    gasLimit?: number;

    /**
     * Gas used
     */
    gasUsed?: number;

    /**
     * Base fee per gas
     */
    baseFeePerGas?: number;

    transactions?: string[];
}

export interface AccountInformation {
    /**
     * Account balance
     */
    balance?: number;

    /**
     * Total transactions
     */
    totalTransactions?: number;

    /**
     * True if address is a contract, false if not
     */
    isContract?: boolean;
}

export interface TransactionLogInformation {
    /**
     * Log index
     */
    index: number;

    /**
     * Contract address 
     */
    address: string;

    topics: string[];

    /**
     * Log data 
     */
    data: string;
}

export interface TransactionInformation {
    /**
     * Transaction hash
     */
    hash: string;

    /**
     * Transaction type
     */
    type: number;

    /**
     * From address
     */
    from: string;

    /**
     * Block hash
     */
    blockHash?: string;

    /**
     * Block number
     */
    blockNumber?: number;

    /**
     * Transaction index
     */
    transactionIndex?: number;

    /**
     * Chain ID
     */
    chainId?: string;

    /**
     * Gas
     */
    gas?: number;

    /**
     * Gas price
     */
    gasPrice?: number;

    /**
     * Max priority fee per gas
     */
    maxPriorityFeePerGas?: number;

    /**
     * Max fee per gas
     */
    maxFeePerGas?: number;

    /**
     * Transaction input
     */
    input?: string;

    /**
     * Nonce
     */
    nonce: string;

    /**
     * To address
     */
    to?: string;

    /**
     * Transaction value
     */
    value?: number;

    /**
     * y parity
     */
    yParity?: number;

    /**
     * V (signature part)
     */
    v?: string;

    /**
     * R (signature part)
     */
    r?: string;

    /**
     * S (signature part)
     */
    s?: string;

    /**
     * True if transaction succeeded, false if reverted
     */
    success?: boolean;

    /**
     * Address of the deployed smart contract
     */
    deployedContract?: string;

    logs?: TransactionLogInformation[];
}

export interface CallSmartContractBody {
    abi: AbiEntry[];

    /**
     * Name of the contract method to invoke
     */
    method: string;

    parameters: string[];
}

export interface CallSmartContractBadRequest {
    /**
     * Error Code:
     *  - INVALID_CONTRACT_ADDRESS: Invalid smart contract address
     *  - INVALID_ABI_OR_PARAMETERS: Invalid ABI or parameters provided
     *  - INVALID_ABI_RESULT: INvalid ABI. Cannot parse the call result using it.
     */
    code: string;
}

export interface CallSmartContractResponse {
    /**
     * True if the call was successful, false otherwise
     */
    success: boolean;

    result?: string[];

    /**
     * Error message, in case success is false
     */
    error?: string;
}

export interface TxParamsUpgradeControlInitialize {
    /**
     * The address of the role manager smart contract 
     */
    roleManagerAddress: string;
}

export interface TxRequestUpgradeControlInitialize {
    parameters: TxParamsUpgradeControlInitialize;

    txSign: TxSigningOptions;
}

export interface TxRequestUpgradeControlPause {
    txSign: TxSigningOptions;
}

export interface TxRequestUpgradeControlUnpause {
    txSign: TxSigningOptions;
}

export interface TxParamsUpgradeControlUpgradeContract {
    /**
     * The address of the proxy contract 
     */
    proxy: string;

    /**
     * The address of the implementation contract 
     */
    implementation: string;
}

export interface TxRequestUpgradeControlUpgradeContract {
    parameters: TxParamsUpgradeControlUpgradeContract;

    txSign: TxSigningOptions;
}

export interface TxParamsUpgradeControlUpgradeContractAndCall {
    /**
     * The address of the proxy contract 
     */
    proxy: string;

    /**
     * The address of the implementation contract 
     */
    implementation: string;

    /**
     * The callData of the re-initializer 
     */
    callData: string;
}

export interface TxRequestUpgradeControlUpgradeContractAndCall {
    parameters: TxParamsUpgradeControlUpgradeContractAndCall;

    txSign: TxSigningOptions;
}

export interface TxParamsUpgradeControlUpgradeToAndCall {
    /**
     * newImplementation 
     */
    newImplementation: string;

    /**
     * data 
     */
    data: string;
}

export interface TxRequestUpgradeControlUpgradeToAndCall {
    parameters: TxParamsUpgradeControlUpgradeToAndCall;

    txSign: TxSigningOptions;
}

export interface EventParamsUpgradeControlContractUpgraded {
    /**
     * The address of the proxy contract 
     */
    proxy: string;

    /**
     * The address of the implementation contract 
     */
    implementation: string;

    /**
     * The address of the administrator who made the upgrade 
     */
    by: string;
}

export interface EventItemUpgradeControlContractUpgraded {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsUpgradeControlContractUpgraded;
}

export interface EventListUpgradeControlContractUpgraded {
    events: EventItemUpgradeControlContractUpgraded[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsUpgradeControlInitialized {
    /**
     * version 
     */
    version: string;
}

export interface EventItemUpgradeControlInitialized {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsUpgradeControlInitialized;
}

export interface EventListUpgradeControlInitialized {
    events: EventItemUpgradeControlInitialized[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsUpgradeControlPaused {
    /**
     * The administrator who paused the smart contract 
     */
    by: string;
}

export interface EventItemUpgradeControlPaused {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsUpgradeControlPaused;
}

export interface EventListUpgradeControlPaused {
    events: EventItemUpgradeControlPaused[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsUpgradeControlUnpaused {
    /**
     * The administrator who paused the smart contract 
     */
    by: string;
}

export interface EventItemUpgradeControlUnpaused {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsUpgradeControlUnpaused;
}

export interface EventListUpgradeControlUnpaused {
    events: EventItemUpgradeControlUnpaused[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsUpgradeControlUpgraded {
    /**
     * implementation 
     */
    implementation: string;
}

export interface EventItemUpgradeControlUpgraded {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsUpgradeControlUpgraded;
}

export interface EventListUpgradeControlUpgraded {
    events: EventItemUpgradeControlUpgraded[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface CallResponseUpgradeControlUPGRADE_INTERFACE_VERSION {
    /**
     * _0
     */
    _0: string;
}

export interface CallResponseUpgradeControlGetInitializedVersion {
    /**
     * The current initialized version 
     */
    v: string;
}

export interface CallResponseUpgradeControlPaused {
    /**
     * bool True if paused, false otherwise
     */
    _0: boolean;
}

export interface CallResponseUpgradeControlProxiableUUID {
    /**
     * _0 
     */
    _0: string;
}

export interface TxParamsRoleManagerAssignRole {
    /**
     * The account address 
     */
    account: string;

    /**
     * The role to assign 
     */
    role: string;
}

export interface TxRequestRoleManagerAssignRole {
    parameters: TxParamsRoleManagerAssignRole;

    txSign: TxSigningOptions;
}

export interface TxParamsRoleManagerInitialize {
    /**
     * The address of the upgrade control smart contract 
     */
    upgradeControlAddress: string;
}

export interface TxRequestRoleManagerInitialize {
    parameters: TxParamsRoleManagerInitialize;

    txSign: TxSigningOptions;
}

export interface TxRequestRoleManagerPause {
    txSign: TxSigningOptions;
}

export interface TxParamsRoleManagerRevokeRole {
    /**
     * The account address 
     */
    account: string;

    /**
     * The role to revoke 
     */
    role: string;
}

export interface TxRequestRoleManagerRevokeRole {
    parameters: TxParamsRoleManagerRevokeRole;

    txSign: TxSigningOptions;
}

export interface TxRequestRoleManagerUnpause {
    txSign: TxSigningOptions;
}

export interface TxParamsRoleManagerUpgradeToAndCall {
    /**
     * newImplementation 
     */
    newImplementation: string;

    /**
     * data 
     */
    data: string;
}

export interface TxRequestRoleManagerUpgradeToAndCall {
    parameters: TxParamsRoleManagerUpgradeToAndCall;

    txSign: TxSigningOptions;
}

export interface EventParamsRoleManagerInitialized {
    /**
     * version 
     */
    version: string;
}

export interface EventItemRoleManagerInitialized {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsRoleManagerInitialized;
}

export interface EventListRoleManagerInitialized {
    events: EventItemRoleManagerInitialized[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsRoleManagerPaused {
    /**
     * The administrator who paused the smart contract 
     */
    by: string;
}

export interface EventItemRoleManagerPaused {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsRoleManagerPaused;
}

export interface EventListRoleManagerPaused {
    events: EventItemRoleManagerPaused[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsRoleManagerRoleAssigned {
    /**
     * - The account 
     */
    account: string;

    /**
     * - The role 
     */
    role: string;

    /**
     * - The address of the administrator who set the role 
     */
    by: string;
}

export interface EventItemRoleManagerRoleAssigned {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsRoleManagerRoleAssigned;
}

export interface EventListRoleManagerRoleAssigned {
    events: EventItemRoleManagerRoleAssigned[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsRoleManagerRoleRevoked {
    /**
     * The account 
     */
    account: string;

    /**
     * The role 
     */
    role: string;

    /**
     * The address of the administrator who revoked the role 
     */
    by: string;
}

export interface EventItemRoleManagerRoleRevoked {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsRoleManagerRoleRevoked;
}

export interface EventListRoleManagerRoleRevoked {
    events: EventItemRoleManagerRoleRevoked[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsRoleManagerUnpaused {
    /**
     * The administrator who paused the smart contract 
     */
    by: string;
}

export interface EventItemRoleManagerUnpaused {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsRoleManagerUnpaused;
}

export interface EventListRoleManagerUnpaused {
    events: EventItemRoleManagerUnpaused[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsRoleManagerUpgraded {
    /**
     * implementation 
     */
    implementation: string;
}

export interface EventItemRoleManagerUpgraded {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsRoleManagerUpgraded;
}

export interface EventListRoleManagerUpgraded {
    events: EventItemRoleManagerUpgraded[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface CallResponseRoleManagerUPGRADE_INTERFACE_VERSION {
    /**
     * _0
     */
    _0: string;
}

export interface CallResponseRoleManagerGetInitializedVersion {
    /**
     * The current initialized version 
     */
    v: string;
}

export interface CallRequestRoleManagerHasRole {
    /**
     * The account address 
     */
    account: string;

    /**
     * The role to assign 
     */
    role: string;
}

export interface CallResponseRoleManagerHasRole {
    /**
     * True in case the role is assigned, false if the role is not assigned to the account
     */
    assigned: boolean;
}

export interface CallRequestRoleManagerHasRoleExplicit {
    /**
     * The account address 
     */
    account: string;

    /**
     * The role to assign 
     */
    role: string;
}

export interface CallResponseRoleManagerHasRoleExplicit {
    /**
     * True in case the role is assigned, false if the role is not assigned to the account
     */
    assigned: boolean;
}

export interface CallRequestRoleManagerIsAdmin {
    /**
     * The account address 
     */
    account: string;
}

export interface CallResponseRoleManagerIsAdmin {
    /**
     * True is the account has the ADMIN role
     */
    admin: boolean;
}

export interface CallResponseRoleManagerPaused {
    /**
     * bool True if paused, false otherwise
     */
    _0: boolean;
}

export interface CallResponseRoleManagerProxiableUUID {
    /**
     * _0 
     */
    _0: string;
}

export interface TxParamsExampleInitialize {
    /**
     * roleManagerAddress 
     */
    roleManagerAddress: string;

    /**
     * upgradeControlAddress 
     */
    upgradeControlAddress: string;
}

export interface TxRequestExampleInitialize {
    parameters: TxParamsExampleInitialize;

    txSign: TxSigningOptions;
}

export interface TxParamsExampleModifyAsset {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * assetId
     */
    assetId: string;

    /**
     * newTitle
     */
    newTitle: string;
}

export interface TxRequestExampleModifyAsset {
    parameters: TxParamsExampleModifyAsset;

    txSign: TxSigningOptions;
}

export interface TxParamsExampleModifyDataoffer {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * offerId
     */
    offerId: string;

    /**
     * newofferaccessPolicyId
     */
    newofferaccessPolicyId: string;

    /**
     * newoffercontractPolicyId
     */
    newoffercontractPolicyId: string;

    /**
     * newofferassetSelector
     */
    newofferassetSelector: string;
}

export interface TxRequestExampleModifyDataoffer {
    parameters: TxParamsExampleModifyDataoffer;

    txSign: TxSigningOptions;
}

export interface TxParamsExampleModifyPolicy {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * policyId
     */
    policyId: string;

    /**
     * newTitle
     */
    newTitle: string;
}

export interface TxRequestExampleModifyPolicy {
    parameters: TxParamsExampleModifyPolicy;

    txSign: TxSigningOptions;
}

export interface TxRequestExamplePause {
    txSign: TxSigningOptions;
}

export interface TxParamsExampleRegisterAsset {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * assetId
     */
    assetId: string;

    /**
     * assetTitle
     */
    assetTitle: string;
}

export interface TxRequestExampleRegisterAsset {
    parameters: TxParamsExampleRegisterAsset;

    txSign: TxSigningOptions;
}

export interface TxParamsExampleRegisterDataoffer {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * offerId
     */
    offerId: string;

    /**
     * offeraccessPolicyId
     */
    offeraccessPolicyId: string;

    /**
     * offercontractPolicyId
     */
    offercontractPolicyId: string;

    /**
     * offerassetSelector
     */
    offerassetSelector: string;
}

export interface TxRequestExampleRegisterDataoffer {
    parameters: TxParamsExampleRegisterDataoffer;

    txSign: TxSigningOptions;
}

export interface TxParamsExampleRegisterPolicy {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * policyId
     */
    policyId: string;

    /**
     * policyTitle
     */
    policyTitle: string;
}

export interface TxRequestExampleRegisterPolicy {
    parameters: TxParamsExampleRegisterPolicy;

    txSign: TxSigningOptions;
}

export interface TxRequestExampleUnpause {
    txSign: TxSigningOptions;
}

export interface TxParamsExampleUpgradeToAndCall {
    /**
     * newImplementation 
     */
    newImplementation: string;

    /**
     * data 
     */
    data: string;
}

export interface TxRequestExampleUpgradeToAndCall {
    parameters: TxParamsExampleUpgradeToAndCall;

    txSign: TxSigningOptions;
}

export interface EventParamsExampleAssetModified {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * assetId
     */
    assetId: string;

    /**
     * timestamp 
     */
    timestamp: string;

    /**
     * newTitle
     */
    newTitle: string;
}

export interface EventItemExampleAssetModified {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleAssetModified;
}

export interface EventListExampleAssetModified {
    events: EventItemExampleAssetModified[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExampleAssetRegistered {
    /**
     * registrar 
     */
    registrar: string;

    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * assetId
     */
    assetId: string;

    /**
     * timestamp 
     */
    timestamp: string;

    /**
     * title
     */
    title: string;
}

export interface EventItemExampleAssetRegistered {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleAssetRegistered;
}

export interface EventListExampleAssetRegistered {
    events: EventItemExampleAssetRegistered[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExampleDataTransferApproved {
    /**
     * transferId
     */
    transferId: string;

    /**
     * provider 
     */
    provider: string;

    /**
     * timestamp 
     */
    timestamp: string;
}

export interface EventItemExampleDataTransferApproved {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleDataTransferApproved;
}

export interface EventListExampleDataTransferApproved {
    events: EventItemExampleDataTransferApproved[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExampleDataTransferCompleted {
    /**
     * transferId
     */
    transferId: string;

    /**
     * dataHash 
     */
    dataHash: string;

    /**
     * timestamp 
     */
    timestamp: string;
}

export interface EventItemExampleDataTransferCompleted {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleDataTransferCompleted;
}

export interface EventListExampleDataTransferCompleted {
    events: EventItemExampleDataTransferCompleted[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExampleDataTransferRejected {
    /**
     * transferId
     */
    transferId: string;

    /**
     * timestamp 
     */
    timestamp: string;
}

export interface EventItemExampleDataTransferRejected {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleDataTransferRejected;
}

export interface EventListExampleDataTransferRejected {
    events: EventItemExampleDataTransferRejected[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExampleDataTransferRequested {
    /**
     * transferId
     */
    transferId: string;

    /**
     * assetId
     */
    assetId: string;

    /**
     * consumer 
     */
    consumer: string;

    /**
     * timestamp 
     */
    timestamp: string;
}

export interface EventItemExampleDataTransferRequested {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleDataTransferRequested;
}

export interface EventListExampleDataTransferRequested {
    events: EventItemExampleDataTransferRequested[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExampleDataofferModified {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * offerId
     */
    offerId: string;

    /**
     * timestamp 
     */
    timestamp: string;

    /**
     * newaccessPolicyId
     */
    newaccessPolicyId: string;

    /**
     * newcontractPolicyId
     */
    newcontractPolicyId: string;

    /**
     * newassetSelector
     */
    newassetSelector: string;
}

export interface EventItemExampleDataofferModified {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleDataofferModified;
}

export interface EventListExampleDataofferModified {
    events: EventItemExampleDataofferModified[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExampleDataofferRegistered {
    /**
     * registrar 
     */
    registrar: string;

    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * offerId
     */
    offerId: string;

    /**
     * timestamp 
     */
    timestamp: string;

    /**
     * accessPolicyId
     */
    accessPolicyId: string;

    /**
     * contractPolicyId
     */
    contractPolicyId: string;

    /**
     * assetSelector
     */
    assetSelector: string;
}

export interface EventItemExampleDataofferRegistered {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleDataofferRegistered;
}

export interface EventListExampleDataofferRegistered {
    events: EventItemExampleDataofferRegistered[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExampleInitialized {
    /**
     * version 
     */
    version: string;
}

export interface EventItemExampleInitialized {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleInitialized;
}

export interface EventListExampleInitialized {
    events: EventItemExampleInitialized[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExamplePaused {
    /**
     * The administrator who paused the smart contract 
     */
    by: string;
}

export interface EventItemExamplePaused {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExamplePaused;
}

export interface EventListExamplePaused {
    events: EventItemExamplePaused[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExamplePolicyModified {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * policyId
     */
    policyId: string;

    /**
     * timestamp 
     */
    timestamp: string;

    /**
     * newTitle
     */
    newTitle: string;
}

export interface EventItemExamplePolicyModified {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExamplePolicyModified;
}

export interface EventListExamplePolicyModified {
    events: EventItemExamplePolicyModified[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExamplePolicyRegistered {
    /**
     * registrar 
     */
    registrar: string;

    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * policyId
     */
    policyId: string;

    /**
     * timestamp 
     */
    timestamp: string;

    /**
     * title
     */
    title: string;
}

export interface EventItemExamplePolicyRegistered {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExamplePolicyRegistered;
}

export interface EventListExamplePolicyRegistered {
    events: EventItemExamplePolicyRegistered[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExampleUnpaused {
    /**
     * The administrator who paused the smart contract 
     */
    by: string;
}

export interface EventItemExampleUnpaused {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleUnpaused;
}

export interface EventListExampleUnpaused {
    events: EventItemExampleUnpaused[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface EventParamsExampleUpgraded {
    /**
     * implementation 
     */
    implementation: string;
}

export interface EventItemExampleUpgraded {
    /**
     * Event ID 
     */
    id: string;

    /**
     * Block number 
     */
    block: number;

    /**
     * Event index in the block 
     */
    eventIndex: number;

    /**
     * Transaction hash 
     */
    tx: string;

    /**
     * Event timestamp (Unix seconds) 
     */
    timestamp: string;

    parameters: EventParamsExampleUpgraded;
}

export interface EventListExampleUpgraded {
    events: EventItemExampleUpgraded[];

    /**
     * Continuation token 
     */
    continuationToken?: string;
}

export interface CallResponseExampleUPGRADE_INTERFACE_VERSION {
    /**
     * _0
     */
    _0: string;
}

export interface CallRequestExampleAssetExists {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * assetId
     */
    assetId: string;
}

export interface CallResponseExampleAssetExists {
    /**
     * _0
     */
    _0: boolean;
}

export interface CallRequestExampleDataofferExists {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * offerId
     */
    offerId: string;
}

export interface CallResponseExampleDataofferExists {
    /**
     * _0
     */
    _0: boolean;
}

export interface CallRequestExampleGetAsset {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * assetId
     */
    assetId: string;
}

export interface CallResponseExampleGetAsset {
    /**
     * id
     */
    id: string;

    /**
     * nId 
     */
    nId: string;

    /**
     * registrar 
     */
    registrar: string;

    /**
     * timestamp 
     */
    timestamp: string;

    /**
     * title
     */
    title: string;
}

export interface CallRequestExampleGetDataoffer {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * offerId
     */
    offerId: string;
}

export interface CallResponseExampleGetDataoffer {
    /**
     * id
     */
    id: string;

    /**
     * nId 
     */
    nId: string;

    /**
     * registrar 
     */
    registrar: string;

    /**
     * timestamp 
     */
    timestamp: string;

    /**
     * accessPolicyId
     */
    accessPolicyId: string;

    /**
     * contractPolicyId
     */
    contractPolicyId: string;

    /**
     * assetSelector
     */
    assetSelector: string;
}

export interface CallResponseExampleGetInitializedVersion {
    /**
     * The current initialized version 
     */
    v: string;
}

export interface CallRequestExampleGetPolicy {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * policyId
     */
    policyId: string;
}

export interface CallResponseExampleGetPolicy {
    /**
     * id
     */
    id: string;

    /**
     * nId 
     */
    nId: string;

    /**
     * registrar 
     */
    registrar: string;

    /**
     * timestamp 
     */
    timestamp: string;

    /**
     * title
     */
    title: string;
}

export interface CallResponseExamplePaused {
    /**
     * bool True if paused, false otherwise
     */
    _0: boolean;
}

export interface CallRequestExamplePolicyExists {
    /**
     * nodeId 
     */
    nodeId: string;

    /**
     * policyId
     */
    policyId: string;
}

export interface CallResponseExamplePolicyExists {
    /**
     * _0
     */
    _0: boolean;
}

export interface CallResponseExampleProxiableUUID {
    /**
     * _0 
     */
    _0: string;
}

