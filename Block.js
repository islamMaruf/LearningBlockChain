import sha256 from 'crypto-js/sha256';

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
export default Block;