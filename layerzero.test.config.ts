/* eslint-disable prettier/prettier */
import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const fujiContract: OmniPointHardhat = {
    eid: EndpointId.AVALANCHE_V2_TESTNET,
    contractName: 'CultBearsV2Avalanche',
}

const sonicTestnetContract: OmniPointHardhat = {
    eid: EndpointId.SONIC_V2_TESTNET,
    contractName: 'CultBearsV2',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: fujiContract,
        },
        {
            contract: sonicTestnetContract,
        }
    ],
    connections: [
        {
            from: fujiContract,
            to: sonicTestnetContract,
            config: {
              // Required Send Library Address on Avalanche Fuji
              sendLibrary: "0x69BF5f48d2072DfeBc670A1D19dff91D0F4E8170",
              receiveLibraryConfig: {
                // Required Receive Library Address on Avalanche Fuji
                receiveLibrary: "0x819F0FAF2cb1Fba15b9cB24c9A2BDaDb0f895daf",
                // Optional Grace Period for Switching Receive Library Address on Avalanche Fuji
                gracePeriod: BigInt(0),
              },
              // Optional Receive Library Timeout for when the Old Receive Library Address will no longer be valid on Avalanche Fuji
              receiveLibraryTimeoutConfig: {
                lib: "0x0000000000000000000000000000000000000000",
                expiry: BigInt(0),
              },
              // Optional Send Configuration
              // @dev Controls how the `from` chain sends messages to the `to` chain.
              sendConfig: {
                executorConfig: {
                  maxMessageSize: 10000,
                  // The configured Executor address on Avalanche Fuji
                  executor: "0xa7BFA9D51032F82D649A501B6a1f922FC2f7d4e3",
                },
                ulnConfig: {
                  // The number of block confirmations to wait on Avalanche Fuji before emitting the message from the source chain (Avalanche Fuji).
                  confirmations: BigInt(6),
                  // The address of the DVNs you will pay to verify a sent message on the source chain (Avalanche Fuji).
                  // The destination tx will wait until ALL `requiredDVNs` verify the message.
                  requiredDVNs: ["0x9f0e79aeb198750f963b6f30b99d87c6ee5a0467"],
                  // The address of the DVNs you will pay to verify a sent message on the source chain (Avalanche Fuji).
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
                  // The address of the DVNs your `receiveConfig` expects to receive verifications from on the `from` chain (Avalanche Fuji).
                  // The `from` chain's OApp will wait until the configured threshold of `requiredDVNs` verify the message.
                  requiredDVNs: ["0x88b27057a9e00c5f05dda29241027aff63f9e6e0"],
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
            from: sonicTestnetContract,
            to: fujiContract,
            config: {
                  sendLibrary: "0xd682ECF100f6F4284138AA925348633B0611Ae21",
                  receiveLibraryConfig: {
                    receiveLibrary: "0xcF1B0F4106B0324F96fEfcC31bA9498caa80701C",
                    gracePeriod: BigInt(0),
                  },
                  receiveLibraryTimeoutConfig: {
                    lib: "0x0000000000000000000000000000000000000000",
                    expiry: BigInt(0),
                  },
                  sendConfig: {
                    executorConfig: {
                      maxMessageSize: 10000,
                      executor: "0x9dB9Ca3305B48F196D18082e91cB64663b13d014",
                    },
                    ulnConfig: {
                      confirmations: BigInt(6),
                      requiredDVNs: ["0x88b27057a9e00c5f05dda29241027aff63f9e6e0"],
                      optionalDVNs: [],
                      optionalDVNThreshold: 0,
                    },
                  },
                  receiveConfig: {
                    ulnConfig: {
                      confirmations: BigInt(1),
                      requiredDVNs: ["0x9f0e79aeb198750f963b6f30b99d87c6ee5a0467"],
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