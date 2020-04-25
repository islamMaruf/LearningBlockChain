const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const key = ec.genKeyPair();
const privateKey = key.getPrivate("hex")
const publicKey = key.getPublic("hex")
module.exports = {
    key: key,
    walletNumber: publicKey,
    privateKey: privateKey
}