const { task } = require("hardhat/config")
task("block-num", "Prints the curr block num")
    .setAction(
        async (taskArg, hre) => {
            const blockNumber = await hre.ethers.provider.getBlockNumber();
            console.log(`Block Number: ${blockNumber}`);
        }
    )
module.exports = {}