// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./base/BaseContract.sol";
import "./interfaces/IExampleContract.sol";

/**
 * Example smart contract for a blockchain-backed dataspace registry
 */
contract ExampleContract is BaseContract {

    /* =====================================================
                            ENUMS
       ===================================================== */

    enum TransferStatus {
        Requested,
        Approved,
        Completed,
        Rejected
    }

    /* =====================================================
                            STRUCTS
       ===================================================== */

    struct Asset {
        string id;              // local asset id (node-scoped)
        bytes32 nodeId;         // logical node identifier
        address registrar;      // relayer that registered it
        uint256 timestamp;
        string title;
    }

    struct Policy {
        string id;              // local policy id (node-scoped)
        bytes32 nodeId;         // logical node identifier
        address registrar;      // relayer that registered it
        uint256 timestamp;
        string title;
    }

    struct Dataoffer {
        string id;              // local offer id (node-scoped)
        bytes32 nodeId;         // logical node identifier
        address registrar;      // relayer that registered it
        uint256 timestamp;
        string accessPolicyId;
        string contractPolicyId;
        string assetSelector;
    }

    struct Contratto {
        string id;
        bytes32 nodeId;
        address registrar;      // relayer that registered it
        string counterpartyid;
        string contractnegotiationid;
        uint256 timestamp;
        uint256 createdat;
        string state;
    }

    struct DataTransfer {
        string id;
        bytes32 providerNodeId;
        bytes32 consumerNodeId;
        string assetId;
        string offerId;
        bytes32 dataHash;
        TransferStatus status;
        uint256 timestamp;
    }

    /* =====================================================
                            INIT
       ===================================================== */

    function initialize(
        address roleManagerAddress,
        address upgradeControlAddress
    )
        public
        reinitializer(1)
    {
        _initialize_base(roleManagerAddress, upgradeControlAddress);
    }

    /* =====================================================
                            STORAGE
       ===================================================== */

    // nodeId => localId => entity
    mapping(bytes32 => mapping(string => Asset)) private assets;
    mapping(bytes32 => mapping(string => Policy)) private policies;
    mapping(bytes32 => mapping(string => Dataoffer)) private offers;
    mapping(bytes32 => mapping(string => Contratto)) private contratti;

    // transferId => transfer
    mapping(string => DataTransfer) private transfers;

    /* =====================================================
                            EVENTS
       ===================================================== */

    event AssetRegistered(
        address indexed registrar,
        bytes32 indexed nodeId,
        string assetId,
        uint256 timestamp,
        string title
    );

    event AssetModified(
        bytes32 indexed nodeId,
        string assetId,
        uint256 timestamp,
        string newTitle
    );

    event PolicyRegistered(
        address indexed registrar,
        bytes32 indexed nodeId,
        string policyId,
        uint256 timestamp,
        string title
    );

    event PolicyModified(
        bytes32 indexed nodeId,
        string policyId,
        uint256 timestamp,
        string newTitle
    );

    event DataofferRegistered(
        address indexed registrar,
        bytes32 indexed nodeId,
        string offerId,
        uint256 timestamp,
        string accessPolicyId,
        string contractPolicyId,
        string assetSelector
    );

    event DataofferModified(
        bytes32 indexed nodeId,
        string offerId,
        uint256 timestamp,
        string newAccessPolicyId,
        string newContractPolicyId,
        string newAssetSelector
    );

    event ContrattoRegistered(
        address indexed registrar,
        bytes32 indexed nodeId,
        string contractNegotiationId,
        string counterpartyId,
        uint256 createdAt,
        string state
    );

    event ContrattoStateUpdated(
        bytes32 indexed nodeId,
        string contractNegotiationId,
        uint256 timestamp,
        string newState
    );

    event DataTransferRequested(
        string transferId,
        string assetId,
        address indexed consumer,
        uint256 timestamp
    );

    event DataTransferApproved(
        string transferId,
        address indexed provider,
        uint256 timestamp
    );

    event DataTransferCompleted(
        string transferId,
        bytes32 dataHash,
        uint256 timestamp
    );

    event DataTransferRejected(
        string transferId,
        uint256 timestamp
    );

    /* =====================================================
                            ASSET
       ===================================================== */

    function registerAsset(
        bytes32 nodeId,
        string memory assetId,
        string memory assetTitle
    )
        external
    {
        require(bytes(assetId).length > 0, "ID non valido");
        require(
            assets[nodeId][assetId].registrar == address(0),
            "Asset gia' registrato per questo nodo"
        );

        assets[nodeId][assetId] = Asset({
            id: assetId,
            nodeId: nodeId,
            registrar: msg.sender,
            timestamp: block.timestamp,
            title: assetTitle
        });

        emit AssetRegistered(
            msg.sender,
            nodeId,
            assetId,
            block.timestamp,
            assetTitle
        );
    }

    function modifyAsset(
        bytes32 nodeId,
        string memory assetId,
        string memory newTitle
    )
        external
    {
        Asset storage a = assets[nodeId][assetId];
        require(a.registrar != address(0), "Asset non trovato");
        require(msg.sender == a.registrar, "Non autorizzato");

        a.title = newTitle;
        a.timestamp = block.timestamp;

        emit AssetModified(nodeId, assetId, block.timestamp, newTitle);
    }

    function getAsset(
        bytes32 nodeId,
        string memory assetId
    )
        external
        view
        returns (
            string memory id,
            bytes32 nId,
            address registrar,
            uint256 timestamp,
            string memory title
        )
    {
        Asset memory a = assets[nodeId][assetId];
        require(a.registrar != address(0), "Asset non trovato");

        return (a.id, a.nodeId, a.registrar, a.timestamp, a.title);
    }

    function assetExists(
        bytes32 nodeId,
        string memory assetId
    )
        external
        view
        returns (bool)
    {
        return assets[nodeId][assetId].registrar != address(0);
    }

    /* =====================================================
                            POLICY
       ===================================================== */

    function registerPolicy(
        bytes32 nodeId,
        string memory policyId,
        string memory policyTitle
    )
        external
    {
        require(bytes(policyId).length > 0, "ID non valido");
        require(
            policies[nodeId][policyId].registrar == address(0),
            "Policy gia' registrata per questo nodo"
        );

        policies[nodeId][policyId] = Policy({
            id: policyId,
            nodeId: nodeId,
            registrar: msg.sender,
            timestamp: block.timestamp,
            title: policyTitle
        });

        emit PolicyRegistered(
            msg.sender,
            nodeId,
            policyId,
            block.timestamp,
            policyTitle
        );
    }

    function modifyPolicy(
        bytes32 nodeId,
        string memory policyId,
        string memory newTitle
    )
        external
    {
        Policy storage p = policies[nodeId][policyId];
        require(p.registrar != address(0), "Policy non trovata");
        require(msg.sender == p.registrar, "Non autorizzato");

        p.title = newTitle;
        p.timestamp = block.timestamp;

        emit PolicyModified(nodeId, policyId, block.timestamp, newTitle);
    }

    function getPolicy(
        bytes32 nodeId,
        string memory policyId
    )
        external
        view
        returns (
            string memory id,
            bytes32 nId,
            address registrar,
            uint256 timestamp,
            string memory title
        )
    {
        Policy memory p = policies[nodeId][policyId];
        require(p.registrar != address(0), "Policy non trovata");

        return (p.id, p.nodeId, p.registrar, p.timestamp, p.title);
    }

    function policyExists(
        bytes32 nodeId,
        string memory policyId
    )
        external
        view
        returns (bool)
    {
        return policies[nodeId][policyId].registrar != address(0);
    }

    /* =====================================================
                          DATA OFFER
       ===================================================== */

    function registerDataoffer(
        bytes32 nodeId,
        string memory offerId,
        string memory offerAccessPolicyId,
        string memory offerContractPolicyId,
        string memory offerAssetSelector
    )
        external
    {
        require(bytes(offerId).length > 0, "ID non valido");
        require(
            offers[nodeId][offerId].registrar == address(0),
            "Dataoffer gia' registrato per questo nodo"
        );

        offers[nodeId][offerId] = Dataoffer({
            id: offerId,
            nodeId: nodeId,
            registrar: msg.sender,
            timestamp: block.timestamp,
            accessPolicyId: offerAccessPolicyId,
            contractPolicyId: offerContractPolicyId,
            assetSelector: offerAssetSelector
        });

        emit DataofferRegistered(
            msg.sender,
            nodeId,
            offerId,
            block.timestamp,
            offerAccessPolicyId,
            offerContractPolicyId,
            offerAssetSelector
        );
    }

    function modifyDataoffer(
        bytes32 nodeId,
        string memory offerId,
        string memory newAccessPolicyId,
        string memory newContractPolicyId,
        string memory newAssetSelector
    )
        external
    {
        Dataoffer storage d = offers[nodeId][offerId];
        require(d.registrar != address(0), "Dataoffer non trovato");
        require(msg.sender == d.registrar, "Non autorizzato");

        d.accessPolicyId = newAccessPolicyId;
        d.contractPolicyId = newContractPolicyId;
        d.assetSelector = newAssetSelector;
        d.timestamp = block.timestamp;

        emit DataofferModified(
            nodeId,
            offerId,
            block.timestamp,
            newAccessPolicyId,
            newContractPolicyId,
            newAssetSelector
        );
    }

    function getDataoffer(
        bytes32 nodeId,
        string memory offerId
    )
        external
        view
        returns (
            string memory id,
            bytes32 nId,
            address registrar,
            uint256 timestamp,
            string memory accessPolicyId,
            string memory contractPolicyId,
            string memory assetSelector
        )
    {
        Dataoffer memory d = offers[nodeId][offerId];
        require(d.registrar != address(0), "Dataoffer non trovato");

        return (
            d.id,
            d.nodeId,
            d.registrar,
            d.timestamp,
            d.accessPolicyId,
            d.contractPolicyId,
            d.assetSelector
        );
    }

    function dataofferExists(
        bytes32 nodeId,
        string memory offerId
    )
        external
        view
        returns (bool)
    {
        return offers[nodeId][offerId].registrar != address(0);
    }

    /* =====================================================
                          CONTRATTO
       ===================================================== */

    function registerContratto(
        bytes32 nodeId,
        string memory contractNegotiationId,
        string memory counterpartyId,
        uint256 createdAt,
        string memory state
    )
        external
    {
        require(bytes(contractNegotiationId).length > 0, "ID non valido");
        require(
            contratti[nodeId][contractNegotiationId].timestamp == 0,
            "Contratto gia' registrato per questo nodo"
        );

        contratti[nodeId][contractNegotiationId] = Contratto({
            id: contractNegotiationId,
            nodeId: nodeId,
            registrar: msg.sender,
            counterpartyid: counterpartyId,
            contractnegotiationid: contractNegotiationId,
            timestamp: block.timestamp,
            createdat: createdAt,
            state: state
        });

        emit ContrattoRegistered(
            msg.sender,
            nodeId,
            contractNegotiationId,
            counterpartyId,
            createdAt,
            state
        );
    }

    function updateContrattoState(
        bytes32 nodeId,
        string memory contractNegotiationId,
        string memory newState
    )
        external
    {
        Contratto storage c = contratti[nodeId][contractNegotiationId];
        require(c.timestamp != 0, "Contratto non trovato");
        require(msg.sender == c.registrar, "Non autorizzato");

        c.state = newState;
        c.timestamp = block.timestamp;

        emit ContrattoStateUpdated(
            nodeId,
            contractNegotiationId,
            block.timestamp,
            newState
        );
    }

    function getContratto(
        bytes32 nodeId,
        string memory contractNegotiationId
    )
        external
        view
        returns (
            string memory id,
            bytes32 nId,
            string memory counterpartyId,
            uint256 timestamp,
            uint256 createdAt,
            string memory state
        )
    {
        Contratto memory c = contratti[nodeId][contractNegotiationId];
        require(c.timestamp != 0, "Contratto non trovato");

        return (
            c.id,
            c.nodeId,
            c.counterpartyid,
            c.timestamp,
            c.createdat,
            c.state
        );
    }


    function contrattoExists(
    bytes32 nodeId,
    string memory contractNegotiationId
    )
    external
    view
    returns (bool)
     {
         return contratti[nodeId][contractNegotiationId].timestamp != 0;
     }


}
