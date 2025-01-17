// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        'avalanche-testnet': {
            eid: EndpointId.AVALANCHE_V2_TESTNET,
            url: process.env.FUJI_RPC_URL,
            accounts,
        },
        'baseSepolia-testnet': {
            eid: EndpointId.BASESEP_V2_TESTNET,
            url: process.env.BASE_SEPOLIA_RPC_URL,
            accounts,
        },
        'sonic-testnet': {
            eid: EndpointId.SONIC_V2_TESTNET,
            url: process.env.SONIC_TESTNET_RPC_URL,
            accounts,
        },
        'sepolia-testnet': {
            eid: EndpointId.SEPOLIA_V2_TESTNET,
            url: process.env.SEPOLIA_TESTNET_RPC_URL,
            accounts,
        },
        'bsc-testnet': {
            eid: EndpointId.BSC_V2_TESTNET,
            url: process.env.BSC_TESTNET_RPC_URL,
            accounts,
        },
        'arbitrum-testnet': {
            eid: 40231,
            url: process.env.ARB_TESTNET_RPC_URL,
            accounts,
        },
        'optimism-testnet': {
            eid: 40232,
            url: process.env.OP_TESTNET_RPC_URL,
            accounts,
        },
        'polygon-testnet': {
            eid: EndpointId.AMOY_V2_TESTNET,
            url: process.env.POL_TESTNET_RPC_URL,
            accounts,
        },
        'soneium-testnet': {
            eid: EndpointId.MINATO_V2_TESTNET,
            url: process.env.MINATO_TESTNET_RPC_URL,
            accounts,
        },
        hardhat: {
            // Need this for testing because TestHelperOz5.sol is exceeding the compiled contract size limit
            allowUnlimitedContractSize: true,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
}

export default config
