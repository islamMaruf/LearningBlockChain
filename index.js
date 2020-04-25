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
        this.pendingTransactions = [];
    }

    generateGenesisBlock() {
        return new Block(Date.now(),[],'0000');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction)
    }

    minePendingTransaction(){
        let block = new Block(Date.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = [];

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
    getAddressOfBalance(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.ammount
                } if(trans.toAddress === address){
                    balance += trans.ammount
                }
            }
        }
        return balance;
    }


}

console.time('execution timer');
let crossCoin = new BlockChain();
crossCoin.createTransaction(new Transcation("address","address2",100))
crossCoin.createTransaction(new Transcation("address","address2",100))
crossCoin.minePendingTransaction();
console.log(crossCoin);

crossCoin.createTransaction("address1");
crossCoin.getAddressOfBalance("address2");
console.timeEnd('execution timer');