// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Votes {
    uint constant MINIMUM_DELAY = 10;
    uint constant MAXIMUM_DELAY = 1000;
    address public owner;

    mapping(bytes32 => bool) public queue;

    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    event Queued(bytes32 txId);

    function addToQueue(
        address _to,
        string calldata _func,
        bytes calldata _data,
        uint _value,
        uint _timestamp
    ) external onlyOwner returns (bytes32) {
        require(
            _timestamp > block.timestamp + MINIMUM_DELAY &&
                _timestamp < block.timestamp + MAXIMUM_DELAY,
            "invalid timestamp"
        );
        bytes32 txId = keccak256(
            abi.encode(_to, _func, _data, _value, _timestamp)
        );

        require(!queue[txId], "already queued");

        queue[txId] = true;
        emit Queued(txId);

        return txId;
    }
}
