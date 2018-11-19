var Web3 = require("web3");
var solc = require("solc");
var fs = require("fs");
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const contractAddress = "0x32b580cA7A8D01E43e63a1B4F024570D664ecbE7";
const myAcc = "0xd12917a8d0f0645e8499ab6658d861a821f741f8";
const password = "password";
var compiledContract = solc.compile(
  fs.readFileSync("./HelloWorld.sol").toString()
);
var abi = compiledContract.contracts[":HelloWorld"].interface;
var bytecode = compiledContract.contracts[":HelloWorld"].bytecode;
web3.eth.personal.unlockAccount(myAcc, password, 20000).then(() => {
  console.log("account unlocked");
  var HelloWorld = new web3.eth.Contract(JSON.parse(abi), contractAddress, {
    data: `0x${bytecode}`
  });
  HelloWorld.methods.getMessage().call({ from: myAcc }, (err, res) => {
    console.log(web3.utils.hexToAscii(res));
  });
});
