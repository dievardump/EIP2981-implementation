# EIP-2981 Example

## Disclaimer

[EIP 2981](https://eips.ethereum.org/EIPS/eip-2981) is not in its final state, which means it is possible that the signature of the function changes until it's finalised. This is an example repository with only mocks that are not made for production.

**Only use if you really know what you are doing**.


## Resume

Simple example of implementation of upcoming EIP-2981.

The contracts

- `./contracts/mocks/ERC721WithRoyalties.sol`
- `./contracts/mocks/ERC1155WithRoyalties.sol`

shows how to extend ERC2981 to set royalties at minting time.

In this implementation, royalties are expected to be from 0 to 10000 which allows to define royalties with 2 decimals.

## Installation

Clone this repository using your favorite tool (i.e: `git clone git@github.com:dievardump/EIP2981-implementation.git`)

In the directory of installation:

`npm install`

## Compilation

`npm run compile`

## Tests

`npm run test`
