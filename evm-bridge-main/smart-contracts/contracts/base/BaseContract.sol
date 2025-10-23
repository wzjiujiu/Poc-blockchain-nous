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

import "../interfaces/IUpgradeControl.sol";
import "../interfaces/IRoleManager.sol";
import "../utils/UUPSUpgradeable.sol";
import "../utils/Initializable.sol";
import "../utils/IPausable.sol";

/**
 * Base smart contract
 * Implements the common functions of all the smart contracts
 * Also provides utility modifiers and functions
 */
contract BaseContract is UUPSUpgradeable, Initializable, IPausable {
    /* Contract data */

    /**
     * Reference to the UpgradeControl contract
     * Checks for upgrades
     */
    IUpgradeControl internal _upgradeControl;

    /**
     * Reference to the RoleManager contract
     * Checks for permissions
     */
    IRoleManager internal _roleManager;

    /**
     * Paused status
     */
    bool private _paused;

    /* Modifiers */

    /**
     * Checks if the sender has the role ADMIN
     */
    modifier onlyAdmin() {
        require(_roleManager.isAdmin(msg.sender), "Must be ADMIN");
        _;
    }

    /**
     * Checks if the sender has certain role
     * @param role The role to check for
     */
    modifier onlyRole(ROLES role) {
        require(_roleManager.hasRole(msg.sender, role), "Sender lacks the required role");
        _;
    }

    /**
     * Modifier to make a function callable only when the contract is not paused.
     */
    modifier whenNotPaused() {
        require(!_paused, "Pausable: paused");
        _;
    }

    /**
     * Modifier to make a function callable only when the contract is paused.
     */
    modifier whenPaused() {
        require(_paused, "Pausable: not paused");
        _;
    }

    /* Initializer functions */

    /**
     * Initializes the base smart contract
     * @param roleManagerAddress The address of the role manager smart contract
     * @param upgradeControlAddress The address of the upgrade control smart contract
     */
    function _initialize_base(
        address roleManagerAddress,
        address upgradeControlAddress
    ) internal onlyInitializing {
        _roleManager = IRoleManager(roleManagerAddress);
        _upgradeControl = IUpgradeControl(upgradeControlAddress);
    }

    /* View functions */

    /**
     * Checks if the smart contract is paused
     * @return bool True if paused, false otherwise
     */
    function paused() public view virtual override returns (bool) {
        return _paused;
    }

    /* Transaction functions */

    /**
     * Pauses the smart contract
     * Requires ADMIN role
     */
    function pause() public virtual override onlyAdmin whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    /**
     * Unpauses the smart contract
     * Requires ADMIN role
     */
    function unpause() public virtual override onlyAdmin whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }

    /* Internal functions */

    /// @inheritdoc UUPSUpgradeable
    function _authorizeUpgrade(
        address newImplementation
    ) internal view override {
        require(newImplementation != address(0), "Invalid address");
        require(msg.sender == address(_upgradeControl), "Not allowed");
    }
}
