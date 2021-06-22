# EIP-2981 Example

Simple example of implementation of upcoming EIP-2981

The contract `./contracts/mocks/ERC721WithRoyalties.sol` shows how to extend ERC2981 and how to set royalties at minting time.

In this implementation, royalties are expected to be from 0 to 10000 which allows to define royalties with 2 decimals.

# Installation

Clone this repository using your favorite tool (i.e: `git clone git@github.com:dievardump/EIP2981-implementation.git`)

In the directory of installation:

`npm install`

# Compilation

`npm run compile`

# Tests

`npm run test`
