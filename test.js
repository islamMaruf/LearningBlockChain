const {walletNumber,key,walletNumber2,key2} = require('./keygen');

const BlockChain = require('./Blockchain');
const Transaction = require('./Transaction');

console.time('execution timer');
const alphaCoin = new BlockChain();
console.log(alphaCoin.isBlockChainValid());
const transactionOne = new Transaction(walletNumber, walletNumber2, 100);
transactionOne.signTransaction(key);
alphaCoin.addTransaction(transactionOne);
alphaCoin.minePendingTransaction(walletNumber);
console.log(alphaCoin.getBalanceOfAddress(walletNumber));
console.log(alphaCoin.getBalanceOfAddress(walletNumber2));
alphaCoin.minePendingTransaction(walletNumber2);

const transactionTwo = new Transaction(walletNumber2, walletNumber, 50);
transactionTwo.signTransaction(key2);
alphaCoin.addTransaction(transactionTwo);
alphaCoin.minePendingTransaction(walletNumber);
console.log(alphaCoin.getBalanceOfAddress(walletNumber));
console.log(alphaCoin.getBalanceOfAddress(walletNumber2));
alphaCoin.minePendingTransaction(walletNumber2);

console.timeEnd('execution timer');