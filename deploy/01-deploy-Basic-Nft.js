const { network, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    const chainId = network.config.chainId
    const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")

    log("-------------------------------")

    args = []

    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    // if (chainId == 31337) {
    //     await vrfCoordinatorV2Mock.addConsumer(subscriptionId, randomIpfsNft.address)
    // }

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...........")
        await verify(basicNft.address, args)
    }
    log("-----------------------------")
}

module.exports.tags = ["all", "basicNft", "main"]
