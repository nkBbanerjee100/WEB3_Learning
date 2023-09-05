const { ethers, run, network } = require("hardhat")
// run allows us to run any hardhat project
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage"
  );
  console.log("Deploying Contract ....");
  const simpleStorage = await SimpleStorageFactory.deploy(
  );
  await simpleStorage.deployed();
  console.log(`contract deployed in ${simpleStorage.address}`);
  // console.log(network.config);
  if (network.config.chainId === 1 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(7);
    await verify(simpleStorage.address, [])
    // console.log("verified");
  }
  const currValue = await simpleStorage.retrieve()
  console.log(`curent value is ${currValue}`);
  // updating curr value
  const transactionResponce = await simpleStorage.store(7);
  await transactionResponce.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated value is ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("verifying Contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  }
  catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    }
    else {
      console.log(e);
    }
  }
}
// main func calling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  // yarn hardhat console --nwteok name