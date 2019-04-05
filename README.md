# CONTRACT ABSTRACTIONS MANAGER

## About the contract abstractions manager

This package contains a thin manager of contract abstractions. It is used a.o. in npm packages 
[nahmii-contract-abstractions](https://github.com/hubiinetwork/nahmii-contract-abstractions.git) and 
[nahmii-contract-abstractions-ropsten](https://github.com/hubiinetwork/nahmii-contract-abstractions-ropsten.git) 
hosting contract abstractions from the deployment of 
[nahmii-contracts](https://github.com/hubiinetwork/nahmii-contracts.git) to the Ethereum 
mainnet and to Ropsten testnet, respectively. 

## Prerequisites

* To use this software you need a modern version of **NodeJS and NPM**.
  We recommend having the current LTS version (v10.x) installed, or
  later, and updating NPM to the latest available version.

## Installation

To install the SDK into your project, simply run:

```
npm install contract-abstractions-manager
```

## Dummy data

The package includes dummy directories `build/contracts` and `event` that respectively contain the 
actual contract abstractions and recorded events from smart contract functions. Thus when a test manager
is instantiated it uses these two directories for reading contract abstractions and event samples.

However, when the manager is imported into client project (e.g. 
[nahmii-contract-abstractions](https://github.com/hubiinetwork/nahmii-contract-abstractions.git))
the manager instance is initialized with the client project's home directory as manager _data root 
directory_, one that contains `build/contracts` and `event` sub-directories.

## Contract abstractions

The contract abstractions may be required into Node.js scripts and used 
in contexts of [web3](https://web3js.readthedocs.io/en/latest/), 
[ethers](https://ethers.io) or [Truffle](https://truffleframework.com/).

A contract abstraction may be required as
```
const Manager = require('contract-abstractions-manager');

const manager = new Manager();

console.log(manager.getAbstraction('MyContract'));
// { contractName: 'MyContract',
//   abi:
//    [ { constant: false,
//        inputs: [Array],
//        name: 'foo',
//        outputs: [],
//        payable: false,
//        stateMutability: 'nonpayable',
//        type: 'function' },
// ...
```

The full set of names of contract abstractions may be obtained as
```
console.log(manager.getAbstractionNames());
// [ 'MyContractA',
//   'MyContractB',
//   'MyContractC',
// ...
``` 

## Event samples

As with contract abstractions an event may be required as
```
const myEvent = manager.getEvent('MyContract', 'MyEvent');
```
