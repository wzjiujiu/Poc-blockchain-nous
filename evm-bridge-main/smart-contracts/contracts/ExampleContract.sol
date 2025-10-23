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

import "./base/BaseContract.sol";
import "./interfaces/IExampleContract.sol";

/**
 * This is an example smart contract
 */
contract ExampleContract is IExampleContract, BaseContract {
    /* Contract data */

    uint256 private _exampleValue1;
    string private _exampleValue2;
    address private _exampleValue3;

    /* Constructor */

    constructor() {}

    /* Initializer */

    /**
     * Initializes the smart contract
     * @param roleManagerAddress The address of the role manager smart contract
     * @param upgradeControlAddress The address of the upgrade control smart contract
     */
    function initialize(
        address roleManagerAddress,
        address upgradeControlAddress
    ) public reinitializer(1) {
        _initialize_base(roleManagerAddress, upgradeControlAddress);
    }

    /* View functions */

    /**
     * Gets the current test values
     * @return exampleValue1 Example value 1
     * @return exampleValue2 Example value 2
     * @return exampleValue3 Example value 3
     */
    function getTestValues()
        public
        view
        override
        returns (
            uint256 exampleValue1,
            string memory exampleValue2,
            address exampleValue3
        )
    {
        return (_exampleValue1, _exampleValue2, _exampleValue3);
    }

    /* Transaction functions */

    /**
     * Sets some test values
     * Requires role: TEST_ROLE
     * @param exampleValue1 Example value 1
     * @param exampleValue2 Example value 2
     * @param exampleValue3 Example value 3
     */
    function setTestValues(
        uint256 exampleValue1,
        string memory exampleValue2,
        address exampleValue3
    ) public override onlyRole(ROLES.TEST_ROLE) {
        _exampleValue1 = exampleValue1;
        _exampleValue2 = exampleValue2;
        _exampleValue3 = exampleValue3;

        emit TestEvent(exampleValue1, exampleValue2, exampleValue3);
    }
}
