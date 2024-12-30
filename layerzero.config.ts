import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'

import type { OAppEdgeConfig, OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

// -- EVM  --

// AVAX
// BASE
// SONIC
// ETH
// BNB
// ARB
// POL
// OP

// SEI -- Issue during deployment

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

const bscTestnetContract: OmniPointHardhat = {
    eid: EndpointId.BSC_V2_TESTNET,
    contractName: 'CultBearsV2',
}

const ethereumSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'CultBearsV2',
}

const arbitrumSepoliaContract: OmniPointHardhat = {
    eid: 40231,
    contractName: 'CultBearsV2',
}

const optimismSepoliaContract: OmniPointHardhat = {
    eid: 40232,
    contractName: 'CultBearsV2',
}

const polygonAmoyContract: OmniPointHardhat = {
    eid: EndpointId.AMOY_V2_TESTNET,
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
            contract: bscTestnetContract,
        },
        {
            contract: ethereumSepoliaContract,
        },
        {
            contract: arbitrumSepoliaContract,
        },
        {
            contract: optimismSepoliaContract,
        },
        {
            contract: polygonAmoyContract,
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
            to: bscTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: fujiContract,
            to: ethereumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: fujiContract,
            to: arbitrumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: fujiContract,
            to: optimismSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: fujiContract,
            to: polygonAmoyContract,
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
            to: bscTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: baseSepoliaContract,
            to: ethereumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: baseSepoliaContract,
            to: arbitrumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: baseSepoliaContract,
            to: optimismSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: baseSepoliaContract,
            to: polygonAmoyContract,
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
            to: bscTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: sonicTestnetContract,
            to: ethereumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: sonicTestnetContract,
            to: arbitrumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: sonicTestnetContract,
            to: optimismSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: sonicTestnetContract,
            to: polygonAmoyContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: bscTestnetContract,
            to: baseSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: bscTestnetContract,
            to: fujiContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: bscTestnetContract,
            to: sonicTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: bscTestnetContract,
            to: ethereumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: bscTestnetContract,
            to: arbitrumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: bscTestnetContract,
            to: optimismSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: bscTestnetContract,
            to: polygonAmoyContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: ethereumSepoliaContract,
            to: fujiContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: ethereumSepoliaContract,
            to: baseSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: ethereumSepoliaContract,
            to: sonicTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: ethereumSepoliaContract,
            to: bscTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: ethereumSepoliaContract,
            to: arbitrumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: ethereumSepoliaContract,
            to: optimismSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: ethereumSepoliaContract,
            to: polygonAmoyContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: arbitrumSepoliaContract,
            to: fujiContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: arbitrumSepoliaContract,
            to: baseSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: arbitrumSepoliaContract,
            to: sonicTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: arbitrumSepoliaContract,
            to: bscTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: arbitrumSepoliaContract,
            to: ethereumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: arbitrumSepoliaContract,
            to: optimismSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: arbitrumSepoliaContract,
            to: polygonAmoyContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: optimismSepoliaContract,
            to: fujiContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: optimismSepoliaContract,
            to: baseSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: optimismSepoliaContract,
            to: sonicTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: optimismSepoliaContract,
            to: bscTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: optimismSepoliaContract,
            to: ethereumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: optimismSepoliaContract,
            to: arbitrumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: optimismSepoliaContract,
            to: polygonAmoyContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: polygonAmoyContract,
            to: fujiContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: polygonAmoyContract,
            to: baseSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: polygonAmoyContract,
            to: sonicTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: polygonAmoyContract,
            to: bscTestnetContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: polygonAmoyContract,
            to: ethereumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: polygonAmoyContract,
            to: arbitrumSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
        {
            from: polygonAmoyContract,
            to: optimismSepoliaContract,
            config: DEFAULT_EDGE_CONFIG,
        },
    ],
}

export default config
