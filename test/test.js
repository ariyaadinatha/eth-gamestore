const { assert } = require('chai')
const { contracts_build_directory } = require('../truffle-config')

const GameStore = artifacts.require('./GameStore.sol')

require('chai').use(require('chai-as-promised')).should()

contract('GameStore', ([deployer, ,owner, buyer]) => {
    let gamestore

    before(async() => {
        gamestore = await GameStore.deployed()
    })

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = await gamestore.address
            // Not empty
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a gameCount', async() => {
            const gamecount = await gamestore.gameCount()
            assert.equal(gamecount, 0)
        })
    })

    describe('create game', async() => {
        let result, gameCount

        before(async() => {
            result = await gamestore.createGame("Elder Scroll VI", 2042, 1, {from : owner})
            gameCount = await gamestore.gameCount()
        })

        it('create game', async() => {
            // let game = await gamestore.games(1)
            assert.equal(gameCount, 1)
            const event = result.logs[0].args
            //console.log(gameCount)
            assert.equal(event.id.toNumber(), gameCount, 'Id is correct')
            assert.equal(event.title, "Elder Scroll VI", 'Title is correct')
            assert.equal(event.year, 2042, 'Year is correct')
            assert.equal(event.price, 1, 'Price is correct')
            assert.equal(event.storeId, owner, 'StoreId is correct')
            assert.equal(event.ownedCount, 0, 'OwnedCount is correct')
        })

        it('lists games', async() => {
            // Struct check
            const game = await gamestore.games(gameCount)
            assert.equal(game.id, 1, 'Id is correct')
            assert.equal(game.title, "Elder Scroll VI", 'Title is correct')
            assert.equal(game.year, 2042, 'Year is correct')
            assert.equal(game.price, 1, 'Price is correct')
            assert.equal(game.storeId, owner, 'StoreId is correct')
            assert.equal(game.ownedCount, 0, 'OwnedCount is correct')
        })

        it('allow user to buy game', async() => {
            let oldOwnerBalance
            oldOwnerBalance = await web3.eth.getBalance(owner)
            oldOwnerBalance = new web3.utils.BN(oldOwnerBalance)

            result = await gamestore.payment(1, {from: buyer, value: web3.utils.toWei('1', 'Ether')})
            // console.log(result)

            const event = result.logs[0].args
            assert.equal(event.id, 1, 'Id is correct')
            assert.equal(event.title, "Elder Scroll VI", 'Title is correct')
            assert.equal(event.year, 2042, 'Year is correct')
            assert.equal(event.price, 1, 'Price is correct')
            assert.equal(event.storeId, owner, 'StoreId is correct')
            assert.equal(event.ownedCount, 1, 'OwnedCount is correct')

            // check transfer
            let newOwnerBalance
            newOwnerBalance = await web3.eth.getBalance(owner)
            newOwnerBalance = new web3.utils.BN(newOwnerBalance)

            let payment
            payment = web3.utils.toWei('1', 'Ether')
            payment = new web3.utils.BN(payment)

            // Check balance after payment
            const expectedBalance = oldOwnerBalance.add(payment)
            // console.log(payment)
            // console.log(expectedBalance)
            // console.log(newOwnerBalance)
            assert.equal(newOwnerBalance.toString(), expectedBalance.toString())

            // Fail, incorrect ID
            await gamestore.payment(0, {from: buyer}).should.be.rejected
            await gamestore.payment(10, {from: buyer}).should.be.rejected

        })
    })

})