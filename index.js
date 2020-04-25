const sha256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

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

    hasValidTransaction(){
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
            return  true;
        }
    }
}

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;

    }

    calculateHash() {
        return sha256(this.fromAddress + this.toAddress + this.amount)
    }

    signTransaction(key) {
        if (key.getPublic("hex") !== this.fromAddress) {
            throw new Error("You don't have access")
        }
        const hashTx = this.calculateHash();
        const signature = key.sign(hashTx, "base64");
        this.signature = signature.toDER();

    }

    isValid() {
        if (this.fromAddress === null) {
            return true;
        }
        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature found")
        }
        const key = ec.keyFromPublic(this.fromAddress,"hex")
        key.verify(this.calculateHash(),this.signature)

    }


}

class BlockChain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
        this.difficulty = 1;
        this.pendingTransactions = [];
        this.miningReward = 10;
    }

    generateGenesisBlock() {
        return new Block(Date.now(), [], '0000');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction)
    }

    minePendingTransaction(minerAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, minerAddress, this.miningReward)
        ];

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

    getAddressOfBalance(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount
                }
                if (trans.toAddress === address) {
                    balance += trans.amount
                }
            }
        }
        return balance;
    }


}

console.time('execution timer');
let crossCoin = new BlockChain();
crossCoin.createTransaction(new Transaction("address", "address2", 100))
crossCoin.createTransaction(new Transaction("address", "address2", 50))
crossCoin.minePendingTransaction("maruf-address");
console.log(crossCoin.getAddressOfBalance("maruf-address"));
crossCoin.minePendingTransaction("maruf-address");
console.log(crossCoin.getAddressOfBalance("maruf-address"));
console.timeEnd('execution timer');