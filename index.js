const sha256 = require('crypto-js/sha256');

class Block {
    constructor(data, previousHash = null) {
        this.data = data;
        this.previousHash = previousHash;
        this.timestamps = Date.now();
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return sha256(
            this.timestamps + JSON.stringify(this.data) + this.previousHash
        ).toString()
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
    }

    generateGenesisBlock() {
        return new Block("GENSIS", "00000");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isBlockChainValid() {
        for (let i = 0; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if( currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            return true;
        }
    }

}


let data = {name: 'maruf', age: 56};
let block = new Block(data);
let jossCoin = new BlockChain();
jossCoin.addBlock(block);
jossCoin.addBlock(new Block({name: 'maruf islam', 'age': 56}))
console.log(jossCoin);