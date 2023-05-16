# VerifyMsg

VerifyMsg is a Solidity smart contract that provides functions for verifying a signed message. It allows you to check if a specific signer's address corresponds to the provided message and signature.

## Prerequisites

- Solidity version >=0.4.22 <0.9.0

## License

This code is licensed under the MIT License.

## Contract Details

### `VerifyMsg` Contract

The `VerifyMsg` contract contains the following functions:

#### `constructor()`

The constructor function is empty and does not have any parameters.

#### `verify(string memory _message, address _signer, bytes memory _signature)`

The `verify` function takes a message, signer address, and signature as input parameters. It verifies whether the provided signer address corresponds to the signed message.

- `string memory _message`: The message that was signed.
- `address _signer`: The address of the expected signer.
- `bytes memory _signature`: The signature generated for the message.

It returns a boolean value indicating whether the signer matches the provided address.

#### `getHashedMsg(string memory _message)`

The `getHashedMsg` function takes a message as input and returns its hashed value.

- `string memory _message`: The message to be hashed.

It returns a `bytes32` value representing the hashed message.

#### `getEthSignedHashedMsg(bytes32 _hashedMsg)`

The `getEthSignedHashedMsg` function takes a hashed message as input and returns the Ethereum signed hashed message. It prepends the hashed message with the Ethereum signed message prefix.

- `bytes32 _hashedMsg`: The hashed message.

It returns a `bytes32` value representing the Ethereum signed hashed message.

#### `recoverSigner(bytes32 _ethSignedHashedMsg, bytes memory _signature)`

The `recoverSigner` function takes the Ethereum signed hashed message and signature as input and recovers the signer's address.

- `bytes32 _ethSignedHashedMsg`: The Ethereum signed hashed message.
- `bytes memory _signature`: The signature generated for the message.

It returns the address of the signer.

#### `splitSignature(bytes memory _signature)`

The `splitSignature` function takes a signature as input and splits it into its components: `r`, `s`, and `v`.

- `bytes memory _signature`: The signature to be split.

It returns `r` as `bytes32`, `s` as `bytes32`, and `v` as `uint8`.

## Usage

To use the `VerifyMsg` contract, follow these steps:

1. Deploy the contract to the Ethereum network using a Solidity compiler compatible with version `>=0.4.22 <0.9.0`.
2. Call the `verify` function, passing the message, expected signer address, and signature as arguments. It will return a boolean value indicating whether the signer matches the provided address.

Please note that this contract does not provide a mechanism for message signing. You need to sign the message using an external tool or library and pass the message and its signature to the `verify` function for verification.
