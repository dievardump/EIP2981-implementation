# EIP-2981 Example

## Resume

Simple example of implementation of EIP-2981.

In all implementations, royalties are expected to be from 0 to 10000 which allows to define royalties with 2 decimals.

### Contract wide royalties

The contract `ERC2981ContractWideRoyalties.sol` implements ERC2981 with every token having the same royalties recipient and amount.


`./contracts/mocks/ERC721WithContractWideRoyalties.sol` is an example of ERC721 that would work on a contract-wide royalty base.


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
