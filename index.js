const sha256 =  require('crypto-js/sha256');
class Block {
    constructor(data, previousHash) {
        this.data = data;
        this.previousHash = previousHash;
        this.timestamps = Date.now();
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return sha256(
            this.timestamps + JSON.stringify(this.data) + this.previousHash
        ).toString()
    }
}
let data = {name:'maruf',age:56};
let block = new Block(data,null);
console.log(block);
