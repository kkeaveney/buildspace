require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  //defaultNetwork: "rinkeby",
  paths: {
    // artifacts: './src/artifacts',
  },
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/Qr_S4sFVDIxb9D0bkHB55RWSFFrVDBqj",
      accounts: ['a04a5d6be50d5efb73dc1ffe9bbba078f0c26ece9f70daa947a2b4bd17b8afc6'],
    },
  },
};






