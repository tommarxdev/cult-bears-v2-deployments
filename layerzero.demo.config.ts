/* eslint-disable prettier/prettier */
import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const sepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'CultBearsV2',
}

const bscContract: OmniPointHardhat = {
    eid: EndpointId.BSC_V2_TESTNET,
    contractName: 'CultBearsV2',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: sepoliaContract,
        },
        {
            contract: bscContract,
        }
    ],
    connections: [
        {
            from: sepoliaContract,
            to: bscContract,
            config: {
              // Required Send Library Address on Ethereum Sepolia
              sendLibrary: "0xcc1ae8Cf5D3904Cef3360A9532B477529b177cCE",
              receiveLibraryConfig: {
                // Required Receive Library Address on Ethereum Sepolia
                receiveLibrary: "0xdAf00F5eE2158dD58E0d3857851c432E34A3A851",
                // Optional Grace Period for Switching Receive Library Address on Ethereum Sepolia
                gracePeriod: BigInt(0),
              },
              // Optional Receive Library Timeout for when the Old Receive Library Address will no longer be valid on Ethereum Sepolia
              receiveLibraryTimeoutConfig: {
                lib: "0x0000000000000000000000000000000000000000",
                expiry: BigInt(0),
              },
              // Optional Send Configuration
              // @dev Controls how the `from` chain sends messages to the `to` chain.
              sendConfig: {
                executorConfig: {
                  maxMessageSize: 10000,
                  // The configured Executor address on Ethereum Sepolia
                  executor: "0x718B92b5CB0a5552039B593faF724D182A881eDA",
                },
                ulnConfig: {
                  // The number of block confirmations to wait on Ethereum Sepolia before emitting the message from the source chain (Ethereum Sepolia).
                  confirmations: BigInt(6),
                  // The address of the DVNs you will pay to verify a sent message on the source chain (Ethereum Sepolia).
                  // The destination tx will wait until ALL `requiredDVNs` verify the message.
                  requiredDVNs: ["0x8eebf8b423b73bfca51a1db4b7354aa0bfca9193"],
                  // The address of the DVNs you will pay to verify a sent message on the source chain (Ethereum Sepolia).
                  // The destination tx will wait until the configured threshold of `optionalDVNs` verify a message.
                  optionalDVNs: [],
                  // The number of `optionalDVNs` that need to successfully verify the message for it to be considered Verified.
                  optionalDVNThreshold: 0,
                },
              },
              // Optional Receive Configuration
              // @dev Controls how the `from` chain receives messages from the `to` chain.
              receiveConfig: {
                ulnConfig: {
                  // The number of block confirmations to expect from the `to` chain (Sonic Blaze).
                  confirmations: BigInt(1),
                  // The address of the DVNs your `receiveConfig` expects to receive verifications from on the `from` chain (Ethereum Sepolia).
                  // The `from` chain's OApp will wait until the configured threshold of `requiredDVNs` verify the message.
                  // Enter requiredDVN from destinationChain
                  requiredDVNs: ["0x0ee552262f7b562efced6dd4a7e2878ab897d405"],
                  // The address of the `optionalDVNs` you expect to receive verifications from on the `from` chain (Avalanche Fuji).
                  // The destination tx will wait until the configured threshold of `optionalDVNs` verify the message.
                  optionalDVNs: [],
                  // The number of `optionalDVNs` that need to successfully verify the message for it to be considered Verified.
                  optionalDVNThreshold: 0,
                },
              },
              // Optional Enforced Options Configuration
              // @dev Controls how much gas to use on the `to` chain, which the user pays for on the source `from` chain.
              enforcedOptions: [
                {
                  msgType: 1,
                  optionType: ExecutorOptionType.LZ_RECEIVE,
                  gas: 100_000,
                  value: 0,
              },
              {
                  msgType: 2,
                  optionType: ExecutorOptionType.COMPOSE,
                  index: 0,
                  gas: 100_000,
                  value: 0,
              },
              ],
            },
        },
        {
            from: bscContract,
            to: sepoliaContract,
            config: {
                  sendLibrary: "0x55f16c442907e86D764AFdc2a07C2de3BdAc8BB7",
                  receiveLibraryConfig: {
                    receiveLibrary: "0x188d4bbCeD671A7aA2b5055937F79510A32e9683",
                    gracePeriod: BigInt(0),
                  },
                  receiveLibraryTimeoutConfig: {
                    lib: "0x0000000000000000000000000000000000000000",
                    expiry: BigInt(0),
                  },
                  sendConfig: {
                    executorConfig: {
                      maxMessageSize: 10000,
                      executor: "0x31894b190a8bAbd9A067Ce59fde0BfCFD2B18470",
                    },
                    ulnConfig: {
                      confirmations: BigInt(6),
                      requiredDVNs: ["0x31894b190a8bAbd9A067Ce59fde0BfCFD2B18470"],
                      optionalDVNs: [],
                      optionalDVNThreshold: 0,
                    },
                  },
                  receiveConfig: {
                    ulnConfig: {
                      confirmations: BigInt(1),
                      requiredDVNs: ["0x8eebf8b423b73bfca51a1db4b7354aa0bfca9193"],
                      optionalDVNs: [],
                      optionalDVNThreshold: 0,
                    },
                  },
                  enforcedOptions: [
                    {
                      msgType: 1,
                      optionType: ExecutorOptionType.LZ_RECEIVE,
                      gas: 100_000,
                      value: 0,
                  },
                  {
                      msgType: 2,
                      optionType: ExecutorOptionType.COMPOSE,
                      index: 0,
                      gas: 100_000,
                      value: 0,
                  },
                  ],
            },
        },
    ],
}

export default config