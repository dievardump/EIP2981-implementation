# EIP-2981 Example

## Disclaimer

[EIP 2981](https://eips.ethereum.org/EIPS/eip-2981) is not in its final state, which means it is possible that the signature of the function changes until it's finalised. This is an example repository with only mocks that are not made for production.

**Only use if you really know what you are doing**.


## Resume

Simple example of implementation of upcoming EIP-2981.

In all implementations, royalties are expected to be from 0 to 10000 which allows to define royalties with 2 decimals.

### Contract wide royalties

The contract `ERC2981ContractWideRoyalties.sol` implements ERC2981 with every token having the same royalties recipient

- `./contracts/mocks/ERC1155WithContractWideRoyalties.sol`

shows how to set royalties "contract wide" meaning each and every token have the same recipient and royalties amount set to them.

### Per Token royalties

The contract `ERC2981PerTokenRoyalties.sol` implements ERC2981 with every token having different royalties

The contracts

- `./contracts/mocks/ERC721WithRoyalties.sol`
- `./contracts/mocks/ERC1155WithRoyalties.sol`

show how to extend ERC2981 to set royalties at minting time.

## Installation

Clone this repository using your favorite tool (i.e: `git clone git@github.com:dievardump/EIP2981-implementation.git`)

In the directory of installation:

`npm install`

## Compilation

`npm run compile`

## Tests

`npm run test`
