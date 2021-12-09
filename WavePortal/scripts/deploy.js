//const { ethers } = require('ethers');
const fs = require('fs');
let waveContract

async function main() {
    const [deployer] = await hre.ethers.getSigners()
    console.log('Deploying contracts with the account:', deployer.address);
    console.log("Account balance: ", (await deployer.getBalance()).toString());

    const waveContractFactory = await ethers.getContractFactory("WavePortal")
    waveContract = await waveContractFactory.deploy({value: ethers.utils.parseEther("0.1")});
    await waveContract.deployed()

    console.log("WavePortal address:", waveContract.address);

    saveFrontendFiles()
}

function saveFrontendFiles() {
    const contractsDir = __dirname + "/../src/contracts"
    const abisDir = __dirname + "/../src/contracts/abis"
    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
        fs.mkdirSync(abisDir);
      }
    fs.writeFileSync(
        contractsDir + "/contracts-address.json",
        JSON.stringify({
            WavePortal: waveContract.address,
        }, undefined, 2)
    )

    const WavePortalArt = artifacts.readArtifactSync("WavePortal");
    fs.writeFileSync(contractsDir + "/abis/Token.json",JSON.stringify(WavePortalArt, null, 2));

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })