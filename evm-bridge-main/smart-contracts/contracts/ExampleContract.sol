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
	
	struct Policy {
        string id;         // ID univoco dell'asset
        address owner;     // Indirizzo che ha registrato l'asset
        uint256 timestamp; // Momento della registrazione
        string title;      // Nuovo campo titolo
    }

    struct Dataoffer {
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
	mapping(string => Policy) private policies;
    mapping(string => Dataoffer) private offers;

    event AssetRegistered(address indexed owner, string assetId, uint256 timestamp, string title);
    event AssetModified(string assetId, string newTitle, uint256 timestamp);
	event PolicyRegistered(address indexed owner, string policyId, uint256 timestamp, string title);
    event PolicyModified(string policyId, string newTitle, uint256 timestamp);
    event DataofferRegistered(address indexed owner, string offerId, uint256 timestamp, string title);
    event DataofferModified(string offerId, string newTitle, uint256 timestamp);

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

    /// @notice Registra un nuovo policy
       function registerPolicy(string memory policyId, string memory policyTitle) external {
        require(bytes(policyId).length > 0, "ID non valido");
        require(policies[policyId].owner == address(0), "Asset gia' registrato");

        policies[policyId] = Asset({
            id: policyId,
            owner: msg.sender,
            timestamp: block.timestamp,
            title: policyTitle
        });

        emit PolicyRegistered(msg.sender, policyId, block.timestamp, policyTitle);
    }

    /// @notice Registra un nuovo Dataoffer
       function registerDataoffer(string memory offerId, string memory offerTitle) external {
        require(bytes(offerId).length > 0, "ID non valido");
        require(offers[offerId].owner == address(0), "Asset gia' registrato");

        offers[offerId] = Asset({
            id: offerId,
            owner: msg.sender,
            timestamp: block.timestamp,
            title: offerTitle
        });

        emit DataofferRegistered(msg.sender, policyId, block.timestamp, policyTitle);
    }

    /// @notice Modifica titolo di un asset esistente
    function modifyAsset(string memory assetId, string memory newTitle) external {
        require(bytes(assetId).length > 0, "ID non valido");
        require(assets[assetId].owner != address(0), "Asset non trovato");

        // Permesso: solo owner o admin
        require(
            msg.sender == assets[assetId].owner,
            "Non autorizzato"
        );

        assets[assetId].title = newTitle;
        assets[assetId].timestamp = block.timestamp;

        emit AssetModified(assetId, newTitle, block.timestamp);
    }

    /// @notice Modifica titolo di un policy esistente
    function modifyPolicy(string memory policyId, string memory newTitle) external {
        require(bytes(policyId).length > 0, "ID non valido");
        require(policies[policyId].owner != address(0), "Asset non trovato");

        // Permesso: solo owner o admin
        require(
            msg.sender == policies[policyId].owner,
            "Non autorizzato"
        );

        policies[policyId].title = newTitle;
        policies[policyId].timestamp = block.timestamp;

        emit PolicyModified(policyId, newTitle, block.timestamp);
    }

    /// @notice Modifica titolo di un dataoffer
    function modifyDataoffer(string memory offerId, string memory newTitle) external {
        require(bytes(offerId).length > 0, "ID non valido");
        require(offers[offerId].owner != address(0), "Asset non trovato");

        // Permesso: solo owner o admin
        require(
            msg.sender == offers[offerId].owner,
            "Non autorizzato"
        );

        offers[offerId].title = newTitle;
        offers[offerId].timestamp = block.timestamp;

        emit DataofferModified(offerId, newTitle, block.timestamp);
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

    /// @notice Restituisce i dettagli di un policy
    function getPolicy(string memory policyId)
        external
        view
        returns (string memory id, address owner, uint256 timestamp, string memory title)
    {
        Policy memory a = policies[policyId];
        require(a.owner != address(0), "policy non trovato");
        return (a.id, a.owner, a.timestamp, a.title);
    }

        /// @notice Restituisce i dettagli di un policy
    function getDataoffer(string memory offerId)
        external
        view
        returns (string memory id, address owner, uint256 timestamp, string memory title)
    {
        Offer memory a = offers[offerId];
        require(a.owner != address(0), "offer non trovato");
        return (a.id, a.owner, a.timestamp, a.title);
    }


    /// @notice Controlla se un asset è registrato
    function isRegistered(string memory assetId) external view returns (bool) {
        return assets[assetId].owner != address(0);
    }
}
