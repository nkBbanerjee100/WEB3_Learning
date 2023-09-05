const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
describe("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorage
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("it should start with a fav num of 0", async function () {
    const currValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currValue.toString(), expectedValue)
  })
  it("should update when we call store", async function () {
    const expectedValue = "7"
    const transactionResponce = await simpleStorage.store(expectedValue)
    await transactionResponce.wait(1)

    const currValue = await simpleStorage.retrieve()
    assert.equal(currValue.toString(), expectedValue)

  })
  // it.only() only runs that it()

})
// by writing yarn hardhat test --grep ____
// in the ___ i can write any keyword from the given string that i had given n it will run only that it