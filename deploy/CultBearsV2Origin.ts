import assert from 'assert'

import { type DeployFunction } from 'hardhat-deploy/types'

const contractName = 'CultBearsV2Avalanche'

const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    assert(deployer, 'Missing named deployer account')

    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)

    const endpointV2Deployment = await hre.deployments.get('EndpointV2')

    const { address } = await deploy(contractName, {
        from: deployer,
        args: [
            'Cult Bears', // name
            'CBEARS', // symbol
            endpointV2Deployment.address, // LayerZero's EndpointV2 address
            deployer, // owner and delegate
            'https://arweave.net/EBRFxtP5XQa6cOO2Hbn4dUa2RQl2KBbf8y0FyXTG5co/', // initial baseUri
            deployer // initial treasuryWallet


        ],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

deploy.tags = [contractName]

export default deploy
