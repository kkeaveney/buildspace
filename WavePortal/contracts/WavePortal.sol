// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint totalWaves;
    uint private seed;
    mapping(address => uint) lastWavedAt;

    event NewWave(address indexed from, uint timestamp, string message);
    struct Wave {
        address waver;
        string message;
        uint timestamp;
    }

    Wave[] waves;

    constructor() payable {
        console.log("Yo yo I am a contract and I am smart");
    }

    function wave(string memory _message) public {
        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Wait 15m");
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log('%s is waved w/ message %s', msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);

        // Generate a PSEUDI random number
        uint randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: #s", randomNumber);

        // Set the generated random number as the seed for the next wave
        seed = randomNumber;

        // Give user 50% chane to win prize
        if(randomNumber < 50) {
            console.log("%s won!", msg.sender);
            uint prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "Contract does not have enough funds");
            (bool success,) = (msg.sender).call{ value:prizeAmount }("");
            require(success, "Failed to withdraw money from contract");
        }
    }

    function getAllWaves() view public returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() view public returns (uint) {
        console.log('We have %s total waves', totalWaves);
        return totalWaves;
    }

}