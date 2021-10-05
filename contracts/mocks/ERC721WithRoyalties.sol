//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

import '../ERC2981PerTokenRoyalties.sol';

/// @title Example of ERC721 contract with ERC2981
/// @author Simon Fremaux (@dievardump)
/// @notice This is a mock, mint and mintBatch are not protected. Please do not use as-is in production
contract ERC721WithRoyalties is ERC721, ERC2981PerTokenRoyalties {
    uint256 nextTokenId;

    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {}

    /// @inheritdoc	ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC2981Base)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /// @notice Mint one token to `to`
    /// @param to the recipient of the token
    /// @param royaltyRecipient the recipient for royalties (if royaltyValue > 0)
    /// @param royaltyValue the royalties asked for (EIP2981)
    function mint(
        address to,
        address royaltyRecipient,
        uint256 royaltyValue
    ) external {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId, '');

        if (royaltyValue > 0) {
            _setTokenRoyalty(tokenId, royaltyRecipient, royaltyValue);
        }

        nextTokenId = tokenId + 1;
    }

    /// @notice Mint several tokens at once
    /// @param recipients an array of recipients for each token
    /// @param royaltyRecipients an array of recipients for royalties (if royaltyValues[i] > 0)
    /// @param royaltyValues an array of royalties asked for (EIP2981)
    function mintBatch(
        address[] memory recipients,
        address[] memory royaltyRecipients,
        uint256[] memory royaltyValues
    ) external {
        uint256 tokenId = nextTokenId;
        require(
            recipients.length == royaltyRecipients.length &&
                recipients.length == royaltyValues.length,
            'ERC721: Arrays length mismatch'
        );

        for (uint256 i; i < recipients.length; i++) {
            _safeMint(recipients[i], tokenId, '');
            if (royaltyValues[i] > 0) {
                _setTokenRoyalty(
                    tokenId,
                    royaltyRecipients[i],
                    royaltyValues[i]
                );
            }
            tokenId++;
        }

        nextTokenId = tokenId;
    }
}
