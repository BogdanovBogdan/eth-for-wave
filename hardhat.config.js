require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: process.env.STAGING_QUICKNODE_URL,
      accounts: [process.env.MM_GOERLI_PRIVATE_KEY],
    },
  },
};
