// const { network, ethers } = require("hardhat")

// module.exports = async function ({ getNamedAccounts }) {
//     const { deployer } = await getNamedAccounts()
//     const chainId = network.config.chainId

//     // Basic NFT
//     const basicNft = await ethers.getContract("BasicNft", deployer)
//     const basicMintTx = await basicNft.mintNft()
//     await basicMintTx.wait(1)
//     console.log(`Basic NFT index 0 tokenURI: ${await basicNft.tokenURI(0)}`)

//     // Random IPFS NFT
//     const randomIpfsNft = await ethers.getContract("RandomIpfsNft", deployer)
//     const mintFee = await randomIpfsNft.getMintFee()
//     const randomIpfsNftResponse = await randomIpfsNft.requestNft({ value: mintFee.toString() })
//     const randomIpfsNftReceipt = await randomIpfsNftResponse.wait(1)

//     await new Promise(async (resolve, reject) => {
//         setTimeout(resolve, 300000)
//         randomIpfsNft.once("NftMinted", async function () {
//             resolve()
//         })

//         if (chainId == 31337) {
//             const requestId = randomIpfsNftReceipt.events[1].args.requestId.toString()
//             const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
//             await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, randomIpfsNft.address)
//         }
//     })
//     console.log(`Random IPFS NFT index 0 tokenURI : ${await randomIpfsNft.tokenURI(0)}`)

//     // Dynamic SVG NFT
//     const highValue = ethers.utils.parseEther("4000")
//     const dynamicSvgNft = await ethers.getContract("DynamicSvgNft", deployer)
//     const dynamicSvgNftMintTx = await dynamicSvgNft.mintNft(highValue)
//     await dynamicSvgNftMintTx.wait(1)
//     console.log(`Dynamic SGV NFT index 0 tokenURI : ${await dynamicSvgNft.tokenURI(0)}`)
// }

// module.exports.tags = ["all", "mint"]
