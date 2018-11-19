var Web3 = require("web3");
var solc = require("solc");
var fs = require("fs");
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myAcc = "0xd12917a8d0f0645e8499ab6658d861a821f741f8";
const password = "password";
var compiledContract = solc.compile(
  fs.readFileSync("./HelloWorld.sol").toString()
);
var abi = compiledContract.contracts[":HelloWorld"].interface;
// This is optional
fs.writeFileSync("./abi.json", abi, err => {
  if (err) throw err;
});
var bytecode = compiledContract.contracts[":HelloWorld"].bytecode;
// This is optional
fs.writeFileSync("./bytecode.txt", bytecode, err => {
  if (err) throw err;
});
web3.eth.personal.unlockAccount(myAcc, password, 20000).then(() => {
  console.log("Account unlocked!");
  var HelloWorld = new web3.eth.Contract(JSON.parse(abi), {
    data: "0x" + bytecode
  });
  HelloWorld.deploy({
    data: `0x${bytecode}`,
    arguments: [web3.utils.asciiToHex("Hello")]
  })
    .send({
      from: myAcc,
      gas: 1000000
    })
    .on("error", function(error) {
      console.log("error", error);
    })
    .on("transactionHash", function(transactionHash) {
      console.log("transaction hash", transactionHash);
    })
    .on("receipt", function(receipt) {
      console.log(receipt.contractAddress); // contains the new contract address
    })
    .then(function(newContractInstance) {
      console.log(newContractInstance.options.address);
    });
});
