/* eslint-disable prettier/prettier */
import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const baseContract: OmniPointHardhat = {
    eid: EndpointId.BASESEP_V2_TESTNET,
    contractName: 'CultBearsV2Base',
}

const opContract: OmniPointHardhat = {
    eid: EndpointId.OPTSEP_V2_TESTNET,
    contractName: 'CultBearsV2',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: baseContract,
        },
        {
            contract: opContract,
        }
    ],
    connections: [
        {
            from: baseContract,
            to: opContract,
            config: {
              
                  sendLibrary: "0xc1868e054425d378095a003ecba3823a5d0135c9",
                  receiveLibraryConfig: {
                    receiveLibrary: "0x9284fd59B95b9143AF0b9795CAC16eb3C723C9Ca",
                    gracePeriod: BigInt(0)
                  },
                  receiveLibraryTimeoutConfig: {
                    lib: "0x0000000000000000000000000000000000000000",
                    expiry: BigInt(0),
                  },
                  sendConfig: {
                    executorConfig: {
                      maxMessageSize: 10000,
                      executor: "0x8A3D588D9f6AC041476b094f97FF94ec30169d3D",
                    },
                    ulnConfig: {
                      confirmations: BigInt(1),
                      requiredDVNs: ["0xe1a12515f9ab2764b887bf60b923ca494ebbb2d6", "0xd9222cc3ccd1df7c070d700ea377d4ada2b86eb5"],
                      optionalDVNs: [],
                      optionalDVNThreshold: 0,
                    },
                  },
                  receiveConfig: {
                    ulnConfig: {
                      confirmations: BigInt(1),
                      requiredDVNs: ["0xd680ec569f269aa7015f7979b4f1239b5aa4582c", "0x2d15d4e61558480a9300632772e68d8b5e7cc7e5"],
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

// npx hardhat lz:oapp:wire --oapp-config layerzero.base-op.config.ts