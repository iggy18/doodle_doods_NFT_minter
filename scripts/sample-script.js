const hre = require("hardhat");

async function main() {
  const DoodleMinter = await hre.ethers.getContractFactory("DoodleMinter");
  const doodle_minter = await DoodleMinter.deploy("doodle", "ddld");

  await doodle_minter.deployed();

  console.log("DoodleMinter deployed to:", doodle_minter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
