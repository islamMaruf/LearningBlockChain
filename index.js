const sha256 = require('crypto-js/sha256');

class Block {
    constructor(timestamps, transactions, previousHash = null) {
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.timestamps = timestamps;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    mineBlock(difficulty) {
        //   while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0"))
        while (this.nonce < 4) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Mining done \n Hash: " + this.hash)
    }

    calculateHash() {
        return sha256(
            this.timestamps + JSON.stringify(this.transactions) + this.previousHash
        ).toString()
    }
}

class Transcation {
    constructor(fromAddress,toAddress,amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;

    }


}

class BlockChain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
        this.difficulty = 1;
    }

    generateGenesisBlock() {
        return new Block("GENSIS", "00000");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isBlockChainValid() {
        for (let i = 0; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            return true;
        }
    }

}


let data = {name: 'maruf', age: 56};
let block = new Block(Date.now(), data);
let jossCoin = new BlockChain();
console.time('execution timer');
jossCoin.addBlock(block);
console.timeEnd('execution timer');
