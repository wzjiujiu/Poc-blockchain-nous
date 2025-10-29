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
contract ExampleContract is  BaseContract {
    /* Contract data */

    struct Asset {
        string id;         // ID univoco dell'asset (es. UUID, codice interno, hash, ecc.)
        address owner;     // Indirizzo che ha registrato l'asset
        uint256 timestamp; // Momento della registrazione
    }
	
	 function initialize(
        address roleManagerAddress,
        address upgradeControlAddress
    ) public reinitializer(1) {
        _initialize_base(roleManagerAddress, upgradeControlAddress);
    }


    // Mapping: id asset → dati dell'asset
    mapping(string => Asset) private assets;

    // Evento per il frontend / monitoraggio
    event AssetRegistered(address indexed owner, string assetId, uint256 timestamp);

    /// @notice Registra un nuovo asset sulla blockchain
    /// @param assetId L'identificatore univoco dell'asset (stringa)
    function registerAsset(string memory assetId) external {
        require(bytes(assetId).length > 0, "ID non valido");
        require(assets[assetId].owner == address(0), "Asset gia' registrato");

        assets[assetId] = Asset({
            id: assetId,
            owner: msg.sender,
            timestamp: block.timestamp
        });

        emit AssetRegistered(msg.sender, assetId, block.timestamp);
    }

    /// @notice Restituisce i dettagli di un asset
    /// @param assetId L'identificatore dell'asset
    function getAsset(string memory assetId)
        external
        view
        returns (string memory id, address owner, uint256 timestamp)
    {
        Asset memory a = assets[assetId];
        require(a.owner != address(0), "Asset non trovato");
        return (a.id, a.owner, a.timestamp);
    }

    /// @notice Verifica se un asset e' gia' registrato
    /// @param assetId L'identificatore dell'asset
    function isRegistered(string memory assetId) external view returns (bool) {
        return assets[assetId].owner != address(0);
    }
}
