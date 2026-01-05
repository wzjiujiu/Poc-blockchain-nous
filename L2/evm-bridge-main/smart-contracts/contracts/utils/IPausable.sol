// SPDX-License-Identifier: MIT
// License-From: OpenZeppelin Contracts
//
// The MIT License (MIT)
// 
// Copyright (c) 2016-2025 Zeppelin Group Ltd
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
 * Pausable interface
 */
interface IPausable {
    /**
     * Paused - The smart contract was paused
     * @param by The administrator who paused the smart contract
     */
    event Paused(address by);

    /**
     * Paused - The smart contract was paused
     * @param by The administrator who paused the smart contract
     */
    event Unpaused(address by);

    /**
     * Checks if the smart contract is paused
     * @return bool True if paused, false otherwise
     */
    function paused() external view returns (bool);

    /**
     * Pauses the smart contract
     */
    function pause() external;

    /**
     * Unpauses the smart contract
     */
    function unpause() external;
}
