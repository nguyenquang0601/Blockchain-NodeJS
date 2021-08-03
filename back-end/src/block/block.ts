import GENESIS_DATA from "./../config";
import cryptoHash from "../crypto-hash/crypto-hash";

class Block {
  timestamp?: string | number;
  lastHash?: string;
  data?: string | string[];
  hash?: string[] | string;
  constructor({timestamp, lastHash, hash, data}: any){
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
  }
  static genesis(){
    return new this(GENESIS_DATA)
  }
  static mineBlock({ lastBlock, data}: any){
    const timestamp = Date.now()
    const lastHash = lastBlock.hash
    return new this({
      timestamp,
      lastHash,
      data,
      hash: cryptoHash(timestamp,lastHash, data)
    })
  }
}
export default Block
// const block1 = new Block('01/01/01','fooHash','foo-hash','data-hash')