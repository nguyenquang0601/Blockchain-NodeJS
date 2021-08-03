import BlockChain from './blockchain'
import Block from '../block/block'
describe('Blockchain', () => {
  let blockchain: BlockChain;
  beforeEach(() => {
    blockchain = new BlockChain();
  })

  it("containts a chain Array  instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true)

  })
  it("starts with the genesis block ", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis())
  })
  it("Add new block to blockchan", () => {
    const newData = 'foo-bar';
    blockchain.addBlock({ data: newData })
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
  })
  describe("isValidation", () => {
    it("returns false", () => {
      blockchain.chain[0] = { data: 'fake-genesis' }
      expect(BlockChain.isValidChain(blockchain.chain)).toBe(false)
    })
  })
  describe("when the chain  starts with the genesis block and has mutiple blocks", () => {
    beforeEach(() => {
      blockchain.addBlock({ data: "Bears" })
      blockchain.addBlock({ data: "Bears" })
      blockchain.addBlock({ data: "Battlestar Galatica" })
    })
    describe("and a lastHash reference has changed", () => {
      it("return false", () => {
        blockchain.chain[2].lastHash = "broken-lastHash"
        expect(BlockChain.isValidChain(blockchain.chain)).toBe(false)
      })
    })
    describe("and the chain contiants  a block with an invalid field", () => {
      it('return false', () => {
        blockchain.chain[2].data = "some-bad-and-evid-dataa"
        expect(BlockChain.isValidChain(blockchain.chain)).toBe(false)
      })

    })
    describe("and the chain  does not contain any valid blocks", () => {
      it("return true", () => {
        expect(BlockChain.isValidChain(blockchain.chain)).toBe(true)
      })
    })
  })
})