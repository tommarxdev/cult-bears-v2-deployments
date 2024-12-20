import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'

import type { OAppEdgeConfig, OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const fujiContract: OmniPointHardhat = {
    eid: EndpointId.AVALANCHE_V2_TESTNET,
    contractName: 'CultBearsV2Avalanche',
}

const baseSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.BASESEP_V2_TESTNET,
    contractName: 'CultBearsV2Base',
}

const sonicTestnetContract: OmniPointHardhat = {
    eid: EndpointId.SONIC_V2_TESTNET,
    contractName: 'CultBearsV2',
}

const seiTestnetContract: OmniPointHardhat = {
    eid: EndpointId.SEI_V2_TESTNET,
    contractName: 'CultBearsV2',
}

const DEFAULT_EDGE_CONFIG: OAppEdgeConfig = {
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
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: fujiContract,
        },
        {
            contract: baseSepoliaContract,
        },
        {
            contract: sonicTestnetContract,
        },
        {
            contract: seiTestnetContract,
        },
    ],
    connections: [
        {
            from: fujiContract,
            to: baseSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: fujiContract,
            to: sonicTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: fujiContract,
            to: seiTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: baseSepoliaContract,
            to: fujiContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: baseSepoliaContract,
            to: sonicTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: baseSepoliaContract,
            to: seiTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: sonicTestnetContract,
            to: baseSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: sonicTestnetContract,
            to: fujiContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: sonicTestnetContract,
            to: seiTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: seiTestnetContract,
            to: baseSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: seiTestnetContract,
            to: fujiContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: seiTestnetContract,
            to: sonicTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
    ],
}

export default config
