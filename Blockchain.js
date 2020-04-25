const Block = require('./Block');
const Transaction = require('./Transaction');

class BlockChain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
        this.difficulty = 0;
        this.pendingTransactions = [];
        this.miningReward = 10;
    }

    generateGenesisBlock() {
        return new Block(Date.now(), [], '0000');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Can not precess transaction")
        }
        if (!transaction.isValid()) {
            throw new Error("Transaction invalid")
        }
        if (transaction.amount < 0) {
            throw new Error("Invalid transaction amount")
        }
        if (transaction.amount > this.getBalanceOfAddress(transaction.fromAddress)) {
            throw new Error("Not enough balance")
        }
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
            if (!currentBlock.hasValidTransaction()) {
                return false;
            }
            return true;
        }
    }

    getBalanceOfAddress(address) {
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

module.exports = BlockChain;