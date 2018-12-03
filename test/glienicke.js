// Copyright (c) 2016-2018 Clearmatics Technologies Ltd
// SPDX-License-Identifier: LGPL-3.0+

const glienicke = artifacts.require("Glienicke");

contract('Gliniecke', accounts => {
  it('Add Enode', async () => {
    const enode = '0xabcd'
    const instance = await glienicke.deployed()
    const enodeExistsBefore = await instance.IsAllowed.call(enode)
    assert(!enodeExistsBefore, 'node shouldn\'t exist')
    await instance.addEnode(enode, "name", { from: accounts[0] })
    const enodeExistsAfter = await instance.IsAllowed.call(enode)
    assert(enodeExistsAfter, 'node should exist')

    // Check the enode_arr
    const enodeIdx = await instance.getEnodeIdx.call(enode)
    const enodeResult = await instance.getEnodes.call(enodeIdx)
    assert.equal("0xabcd", enodeResult[0])
    assert.equal("name", enodeResult[1])

    assert(await instance.IsAllowed.call(enode))
  })

  it('Remove Enode', async () => {
    const enode1 = '0xabcd'
    const enode2 = '0xefgh'
    const enode3 = '0xijkl'
    const instance = await glienicke.deployed()
    await instance.addEnode(enode1, "name", { from: accounts[0] })
    await instance.addEnode(enode2, "name", { from: accounts[0] })
    await instance.addEnode(enode3, "name", { from: accounts[0] })

    // Now remove enode2
    await instance.removeEnode(enode2, { from: accounts[0] })
    assert(await instance.IsAllowed.call(enode1))
    assert(!await instance.IsAllowed.call(enode2))
    assert(await instance.IsAllowed.call(enode3))

  })

  it('Check Getters', async () => {
    const enode1 = '0xabcd'
    const enode2 = '0xefgh'
    const enode3 = '0xijkl'
    const instance = await glienicke.deployed()
    await instance.addEnode(enode1, "name2", { from: accounts[0] })
    await instance.addEnode(enode2, "name3", { from: accounts[0] })
    await instance.addEnode(enode3, "name4", { from: accounts[0] })

    // Check length
    assert.equal(await instance.getTotalEnodes.call(), 3)
    assert.equal(await instance.getEnodeIdx.call(enode1), 0)
    const enodeResult = await instance.getEnodes.call(2)
    assert.equal(enodeResult[0], "0xefgh")
    assert.equal(enodeResult[1], "name3")

  })

  it.only('Check getEnodeData', async () => {
    const enode1 = '0xabcd'
    const enode2 = '0xefgh'
    const enode3 = '0xijkl'
    const instance = await glienicke.deployed()
    await instance.addEnode(enode1, "name2", { from: accounts[0] })
    await instance.addEnode(enode2, "name3", { from: accounts[0] })
    await instance.addEnode(enode3, "name4", { from: accounts[0] })

    // Check length
    const enodeResult = await instance.getEnodeData({ from: accounts[0] })
    console.log(enodeResult)

  })

  it('should add elements', async () => {
    const instance = await glienicke.deployed()

    const enode_arr = ['abc','def','ghi','jkm']
    const name_arr = ['name1','name2','name3','name4']
    const addPromise = enode_arr.map((enode, index) => instance.addEnode(enode, name_arr[index], { from: accounts[0] }))
    const addTx = await Promise.all(addPromise)

    const totalEnodes = await instance.getTotalEnodes.call()
    assert(totalEnodes == enode_arr.length, `unexpected length of enodes added ${enode_arr.length} != ${totalEnodes}`)
    const assertPromise = enode_arr.map(async (enode, idx) => {
      const result = await instance.getEnodes.call(idx)
      assert(enode === result[0], `unexpected enode at position ${idx}`)
    })
    await Promise.all(assertPromise)

    const oldSize = enode_arr.length
    const addPromiseAgain = enode_arr.map((enode, index) => instance.addEnode(enode, name_arr[index], { from: accounts[0] }))
    const addTxAgain = await Promise.all(addPromiseAgain)
    const totalEnodesAgain = await instance.getTotalEnodes.call()
    assert(oldSize == totalEnodesAgain, `unexpected length of enodes added ${oldSize} != ${totalEnodesAgain} after adding the same nodes`)
  })

})
