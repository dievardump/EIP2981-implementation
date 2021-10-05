// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

import './IERC2981Royalties.sol';

/// @dev This is a contract used to add ERC2981 support to ERC721 and 1155
abstract contract ERC2981Base is ERC165, IERC2981Royalties {
    /// @inheritdoc	ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            interfaceId == type(IERC2981Royalties).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /// @notice Uses Bitpacking to encode royalties into one bytes32 (saves gas)
    /// @return the bytes32 representation
    function encodeRoyalties(address recipient, uint256 amount)
        public
        pure
        returns (bytes32)
    {
        require(amount <= 10000, '!WRONG_AMOUNT!');
        return bytes32((uint256(uint160(recipient)) << 96) + amount);
    }

    /// @notice Uses Bitpacking to decode royalties from a bytes32
    /// @return recipient and amount
    function decodeRoyalties(bytes32 royalties)
        public
        pure
        returns (address recipient, uint256 amount)
    {
        recipient = address(uint160(uint256(royalties) >> 96));
        amount = uint256(uint96(uint256(royalties)));
    }
}
