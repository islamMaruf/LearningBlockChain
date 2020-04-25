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

    hasValidTransaction() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
            return true;
        }
    }
}

module.exports = Block;
