import Block from "../block/block"
import cryptoHash from "../crypto-hash/crypto-hash"

class BlockChain {
  chain: Block[]
  constructor() {
    this.chain = [Block.genesis()]
  }
  async addBlock({ data }: any) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    })
    this.chain.push(newBlock)
  }
  static isValidChain(chain: Block[]){
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false
    for(let index= 1; index<chain.length;index++) {
      const block = chain[index]
      const actuaLastHash = chain[index-1].hash
      if (actuaLastHash !== block.lastHash) {
        return false
      }
      const validatedHash = cryptoHash(block.timestamp,block.lastHash,block.data)
      if (block.hash !== validatedHash) return false
    }
    return true
  }

}
export default BlockChain