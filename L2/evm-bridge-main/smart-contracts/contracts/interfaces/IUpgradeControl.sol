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

pragma solidity ^0.8.24;

/**
 * Upgrade control (Interface)
 */
interface IUpgradeControl {
    /**
     * ContractUpgraded - A smart contract was upgraded
     * @param proxy The address of the proxy contract
     * @param implementation The address of the implementation contract
     * @param by The address of the administrator who made the upgrade
     */
    event ContractUpgraded(address proxy, address implementation, address by);

    /**
     * Upgrades a smart contract
     * Requires ADMIN role
     * @param proxy The address of the proxy contract
     * @param implementation The address of the implementation contract
     */
    function upgradeContract(address proxy, address implementation) external;

    /**
     * Upgrades a smart contract and calls a re-initializer
     * Requires ADMIN role
     * @param proxy The address of the proxy contract
     * @param implementation The address of the implementation contract
     * @param callData The callData of the re-initializer
     */
    function upgradeContractAndCall(address proxy, address implementation, bytes memory callData) external;
}
