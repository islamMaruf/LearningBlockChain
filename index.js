


console.time('execution timer');
let crossCoin = new BlockChain();
crossCoin.addTransaction(new Transaction("address", "address2", 100))
crossCoin.addTransaction(new Transaction("address", "address2", 50))
crossCoin.minePendingTransaction("maruf-address");
console.log(crossCoin.getAddressOfBalance("maruf-address"));
crossCoin.minePendingTransaction("maruf-address");
console.log(crossCoin.getAddressOfBalance("maruf-address"));
console.timeEnd('execution timer');