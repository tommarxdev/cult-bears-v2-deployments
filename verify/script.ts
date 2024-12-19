
import { run } from "hardhat";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function main() {
    // Deployed Contract Address
    const contractAddress = "0x66fF7f6Fa24A73fFe916071FF8FDac0C6A2118dd";

    // Provided Constructor Arguments at Deployment
    const constructorArgs = [
        "Cult Bears", // Name
        "CBEARS", // Symbol
        "0x6EDCE65403992e310A62460808c4b910D972f10f", // LayerZero Endpoint Address
        "0xC0fFea512d7683A7088b3D7Be2afE69546D0498B", // Delegate
        "https://arweave.net/EBRFxtP5XQa6cOO2Hbn4dUa2RQl2KBbf8y0FyXTG5co/", // baseUri
        "0xC0fFea512d7683A7088b3D7Be2afE69546D0498B" // TreasuryWallet
    ];

    // Contract Path 
    const contractPath = "contracts/CultBearsV2Avalanche.sol:CultBearsV2Avalanche"; 

    console.log(`Verifying contract at address: ${contractAddress}`);
    console.log(`Constructor arguments: ${constructorArgs.join(", ")}`);

    try {
        const verifyArgs: any = {
            address: contractAddress,
            constructorArguments: constructorArgs,
            contract: contractPath,
        };

        await run("verify:verify", verifyArgs);
        console.log("Verification successful!");
    } catch (error: any) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Contract is already verified.");
        } else {
            console.error("Verification failed:", error);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error in verification script:", error);
        process.exit(1);
    });
