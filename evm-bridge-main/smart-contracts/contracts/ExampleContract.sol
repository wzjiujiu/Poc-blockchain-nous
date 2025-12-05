// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./base/BaseContract.sol";
import "./interfaces/IExampleContract.sol";

/**
 * This is an example smart contract
 */
contract ExampleContract is BaseContract {
    
    struct Asset {
        string id;         // ID univoco dell'asset
        address owner;     // Indirizzo che ha registrato l'asset
        uint256 timestamp; // Momento della registrazione
        string title;      // Nuovo campo titolo
    }

    function initialize(
        address roleManagerAddress,
        address upgradeControlAddress
    ) public reinitializer(1) {
        _initialize_base(roleManagerAddress, upgradeControlAddress);
    }

    mapping(string => Asset) private assets;

    event AssetRegistered(address indexed owner, string assetId, uint256 timestamp, string title);
    event AssetModified(string assetId, string newTitle, uint256 timestamp);

    /// @notice Registra un nuovo asset
    function registerAsset(string memory assetId, string memory assetTitle) external {
        require(bytes(assetId).length > 0, "ID non valido");
        require(assets[assetId].owner == address(0), "Asset gia' registrato");

        assets[assetId] = Asset({
            id: assetId,
            owner: msg.sender,
            timestamp: block.timestamp,
            title: assetTitle
        });

        emit AssetRegistered(msg.sender, assetId, block.timestamp, assetTitle);
    }

    /// @notice Modifica titolo di un asset esistente
    function modifyAsset(string memory assetId, string memory newTitle) external {
        require(bytes(assetId).length > 0, "ID non valido");
        require(assets[assetId].owner != address(0), "Asset non trovato");

        // Permesso: solo owner o admin
        require(
            msg.sender == assets[assetId].owner || hasRole(msg.sender, ROLE_ADMIN),
            "Non autorizzato"
        );

        assets[assetId].title = newTitle;
        assets[assetId].timestamp = block.timestamp;

        emit AssetModified(assetId, newTitle, block.timestamp);
    }

    /// @notice Restituisce i dettagli di un asset
    function getAsset(string memory assetId)
        external
        view
        returns (string memory id, address owner, uint256 timestamp, string memory title)
    {
        Asset memory a = assets[assetId];
        require(a.owner != address(0), "Asset non trovato");
        return (a.id, a.owner, a.timestamp, a.title);
    }

    /// @notice Controlla se un asset è registrato
    function isRegistered(string memory assetId) external view returns (bool) {
        return assets[assetId].owner != address(0);
    }
}
