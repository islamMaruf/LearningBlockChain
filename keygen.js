const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const key = ec.genKeyPair();
const privateKey = key.getPrivate("hex");
const publicKey = key.getPublic("hex");
const key2 = ec.genKeyPair();
const privateKey2 = key2.getPrivate("hex");
const publicKey2 = key2.getPublic("hex");

module.exports = {
    key: key,
    walletNumber: publicKey,
    privateKey: privateKey,
    key2: key2,
    walletNumber2: publicKey2,
    privateKey2: privateKey2,
}