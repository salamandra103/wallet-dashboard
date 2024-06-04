const hre = require('hardhat')
const ethers = hre.ethers

async function main() {
    const [signer] = await ethers.getSigners()
    console.log(signer);
    const Erc = await ethers.getContractFactory("CustomShop", signer)
    const erc = await Erc.deploy()
    erc.deploymentTransaction()

    console.log(erc.address);
    console.log(await erc.getAddress());
}

main().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1)
})