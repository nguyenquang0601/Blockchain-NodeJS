import cryptHhash from './crypto-hash'

describe("cryptoHash", ()=> {
  it("generates a SHA-256 hashed output", ()=> {
    expect(cryptHhash('foo')).toEqual("2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae")
  })
  it("produces the same hash with the same input arguments in any order", ()=> {
    expect(cryptHhash("one","two","three")).toEqual(cryptHhash("three","one","two"))
  })

})