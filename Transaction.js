const sha256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash() {
        return sha256(this.fromAddress + this.toAddress + this.amount).toString();
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
        const key = ec.keyFromPublic(this.fromAddress, "hex");
        return key.verify(this.calculateHash(), this.signature)
    }
}

module.exports = Transaction;