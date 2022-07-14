const { expect } = require("chai");
const { ethers } = require("hardhat")



describe("NFTMAtcher setup", function () {

    before(async function () {
        Finder = await hre.ethers.getContractFactory("NFTFinder");
        finder = await Finder.deploy()

    })

    it("Should update registry", async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        await finder.register({ tknAddress: owner.address, tknId: 15, amount: 10, listingLength: 50 })
        await finder.register({ tknAddress: owner.address, tknId: 16, amount: 10, listingLength: 50 })

        await finder.register({ tknAddress: addr1.address, tknId: 17, amount: 10, listingLength: 50 })


        await finder.updateMatch({ tknAddress: owner.address, tknId: 15, amount: 10, listingLength: 50 }, owner.address, 16)
        await finder.updateMatch({ tknAddress: owner.address, tknId: 15, amount: 10, listingLength: 50 }, owner.address, 17)


        expect(await finder.getMatchTknId({ tknAddress: owner.address, tknId: 15, amount: 10, listingLength: 50 })).to.equal(17)

    });



});