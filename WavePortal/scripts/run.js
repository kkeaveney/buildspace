async function main () {
    //const  [owner, randPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1")});
    await waveContract.deployed()
    console.log('Contract address:', waveContract.address)

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance))

    let waveTxn = await waveContract.wave('Yes Blud!');
    await waveTxn.wait();

    waveTxn = await waveContract.wave('Yes Fam!');
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance))

    }

    main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })