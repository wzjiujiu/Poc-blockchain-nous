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
 * List of roles
 * Each role refers to a permission
 * An account can have multiple roles in case it is necessary
 * The ADMIN role has all the permissions, effectively having all the roles
 * Add roles below if more are needed
 */
enum ROLES {
    ADMIN, // 0 - Admin role (has all permissions)
    ROLE_MANAGER, // 1 - Role manager role (can set other roles, except the ADMIN role)
    TEST_ROLE // 2 - A example test role, add more roles as you need
}

/**
 * Role manager (Interface)
 */
interface IRoleManager {
    /**
     * RoleAssigned - A role was assigned to an account
     * @param account - The account
     * @param role - The role
     * @param by - The address of the administrator who set the role
     */
    event RoleAssigned(address account, ROLES role, address by);

    /**
     * RoleRevoked - A role was revoked
     * @param account The account
     * @param role The role
     * @param by The address of the administrator who revoked the role
     */
    event RoleRevoked(address account, ROLES role, address by);

    /**
     * Checks if an account has a role (or has the role ADMIN)
     * @param account The account address
     * @param role The role to assign
     * @return assigned True in case the role is assigned, false if the role is not assigned to the account
     */
    function hasRole(
        address account,
        ROLES role
    ) external view returns (bool assigned);

    /**
     * Checks if an account has a role (explicit, won't check for ADMIN role)
     * @param account The account address
     * @param role The role to assign
     * @return assigned True in case the role is assigned, false if the role is not assigned to the account
     */
    function hasRoleExplicit(
        address account,
        ROLES role
    ) external view returns (bool assigned);

    /**
     * Checks if an account has the ADMIN role
     * @param account The account address
     * @return admin True is the account has the ADMIN role
     */
    function isAdmin(
        address account
    ) external view returns (bool admin);

    /**
     * Assigns a role to an account
     * Can only be called by accounts with the ADMIN role
     * @param account The account address
     * @param role The role to assign
     * @return assigned True in case the role was assigned, false in case the account already had the role
     */
    function assignRole(
        address account,
        ROLES role
    ) external returns (bool assigned);

    /**
     * Revokes a role from an account
     * Can only be called by accounts with the ADMIN role
     * @param account The account address
     * @param role The role to revoke
     * @return revoked True in case the role was revoked, false in case the account did not have the role
     */
    function revokeRole(
        address account,
        ROLES role
    ) external returns (bool revoked);
}
