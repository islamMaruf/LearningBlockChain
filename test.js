const {walletNumber, privateKey, key} = require('./keygen');
const Block = require('./Block');
const BlockChain = require('./Blockchain');
const Transaction = require('./Transaction');

console.time('execution timer');
const alphaCoin = new BlockChain();
const transactionOne = new Transaction(walletNumber, "random-address", 100);
transactionOne.signTransaction(key);
alphaCoin.addTransaction(transactionOne);
alphaCoin.minePendingTransaction(walletNumber);
console.log(alphaCoin.getBalanceOfAddress(walletNumber));
alphaCoin.minePendingTransaction(walletNumber);
console.log(alphaCoin.getBalanceOfAddress(walletNumber));
console.timeEnd('execution timer');