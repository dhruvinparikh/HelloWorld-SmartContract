pragma solidity ^0.4.24;

contract HelloWorld {
    bytes32 message;
    constructor (bytes32 myMessage) public {
        message = myMessage;
    }

    function getMessage() returns(bytes32) {
        return message;
    }
}
