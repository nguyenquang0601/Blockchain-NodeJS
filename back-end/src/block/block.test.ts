import Block from './block'
import GENESIS_DATA from './../config';
import cryptoHash from './../crypto-hash/crypto-hash';
describe('Block', ()=> {
  const timestamp = 'a-date';
  const lastHash= 'foo-hash';
  const hash =  'bar-hash';
  const data = ['block chain','data']
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data
  })
  it('has a timestamp. lashHash , hash, data property', ()=> {
    expect(block.timestamp).toEqual(timestamp)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.hash).toEqual(hash)
    expect(block.data).toEqual(data)
  })
})
describe("genesis()", ()=> {
    const genesisBlock  = Block.genesis();
    it("returns Block instance", ()=> {
      expect(genesisBlock instanceof Block).toBe(true)
    })
    it("return the genesis data",()=> {
      expect(genesisBlock).toEqual(GENESIS_DATA)
    })
})
describe("mineBlock", ()=> {
  const lastBlock = Block.genesis()
  const data = 'mine-data'
  const minedBlock  = Block.mineBlock({ lastBlock, data})
  it("return a Block instance", ()=> {
    expect(minedBlock instanceof Block).toBe(true)
  })
  it("set   the lastHash to be the hash of the Block", ()=> {
    expect(minedBlock.lastHash).toEqual(lastBlock.hash)
  })
  it("set the data", ()=> {
    expect(minedBlock.data).toEqual(data)
  })
  it("set the data", ()=> {
    expect(minedBlock.timestamp).not.toEqual(undefined)
  })
  it("creates a SHA-256 hash base on the proper inputs", ()=> {
    expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp,lastBlock.hash,data))
  })
})