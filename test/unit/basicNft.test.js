const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { network, ethers, getNamedAccounts, deployments } = require("hardhat")
const { assert } = require("chai")

!developmentChains.includes(network.name)
    ? descibe.skip
    : describe("BasicNft test", () => {
          let basicNft
          const chainId = network.config.chainId

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["all"])
              basicNft = await ethers.getContract("BasicNft", deployer)
          })

          describe("constructor", function () {
              it("initializes the basicNft", async function () {
                  const tokenCounter = await basicNft.getTokenCounter()
                  const name = await basicNft.name()
                  const symbol = await basicNft.symbol()
                  assert.equal(name, "Dogie")
                  assert.equal(symbol, "Dog")
                  assert.equal(tokenCounter.toString(), "0")
              })
          })

          describe("mintNft", function () {
              it("mints the new nft and updates the token counter", async function () {
                  const tokenURI = await basicNft.tokenURI(0)
                  const tokenCounterBeforeMint = await basicNft.getTokenCounter()
                  await basicNft.mintNft()
                  const tokenCounterAfterMint = await basicNft.getTokenCounter()
                  assert.equal(
                      tokenCounterAfterMint.toString(),
                      tokenCounterBeforeMint.add(1).toString()
                  )
                  assert.equal(tokenURI, await basicNft.TOKEN_URI())
              })

              // No idea why this has been written as i couldn't guess this from the function
              it("Show the correct balance and owner of an NFT", async function () {
                  const tx = await basicNft.mintNft()
                  tx.wait(1)

                  const deployerAddress = deployer.address
                  const deployerBalance = await basicNft.balanceOf(deployerAddress)
                  const owner = await basicNft.ownerOf("0")

                  assert.equal(deployerBalance.toString(), "1")
                  assert.equal(owner, deployerAddress)
              })
          })
      })
