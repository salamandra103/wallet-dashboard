// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Erc.sol";
import "./IERC20.sol";

contract CustomToken is ERC20 {
    constructor(address shop) ERC20("CustomToken", "CT", 20, shop) {}
}

contract CustomShop {
    IERC20 public token;

    address payable public owner;
    event Bought(uint _amount, address indexed _buyer);
    event Sold(uint _amount, address indexed _seller);

    constructor() {
        token = new CustomToken(address(this));
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner!");
        _;
    }

    function sell(uint _amountToSell) external {
        require(
            _amountToSell > 0 && token.balanceOf(msg.sender) >= _amountToSell,
            "incorrect amount!"
        );

        uint allowance = token.allowance(msg.sender, address(this));
        require(allowance >= _amountToSell, "check allowance!");

        token.transferFrom(msg.sender, address(this), _amountToSell);

        payable(msg.sender).transfer(_amountToSell);

        emit Sold(_amountToSell, msg.sender);
    }

    receive() external payable {
        uint tokensToBuy = msg.value; // 1 wei = 1 token
        require(tokensToBuy > 0, "not enought funds!");

        require(tokenBalance() >= tokensToBuy, "not enought tokens!");

        token.transfer(msg.sender, tokensToBuy);
        emit Bought(tokensToBuy, msg.sender);
    }

    function tokenBalance() public view returns (uint) {
        return token.balanceOf(address(this));
    }
}
