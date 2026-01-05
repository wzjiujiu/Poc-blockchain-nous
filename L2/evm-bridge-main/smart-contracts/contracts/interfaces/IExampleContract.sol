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
 * Test contract (interface)
 */
interface IExampleContract {
    /**
     * TestEvent - An example event
     * @param exampleValue1 Example value 1
     * @param exampleValue2 Example value 2
     * @param exampleValue3 Example value 3
     */
    event TestEvent(
        uint256 indexed exampleValue1,
        string exampleValue2,
        address exampleValue3
    );

    /**
     * Gets the current test values
     * @return exampleValue1 Example value 1
     * @return exampleValue2 Example value 2
     * @return exampleValue3 Example value 3
     */
    function getTestValues()
        external
        view
        returns (
            uint256 exampleValue1,
            string memory exampleValue2,
            address exampleValue3
        );

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
    ) external;
}
