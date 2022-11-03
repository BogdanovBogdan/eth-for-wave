// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;
  
  constructor() {
      console.log("Hi, it's smart contract!");
  }

  // mapping(address => uint) public wavesPerSender;

  // function recordSender() public {
  //   if (wavesPerSender[msg.sender] > 0) {
  //     wavesPerSender[msg.sender] = wavesPerSender[msg.sender] + 1;
  //   } else {
  //     wavesPerSender[msg.sender] = 1;
  //   }
  // }

  // function getSenders() public view returns (address[] memory) {
  //   address[] memory tmp = new address[]()
  //   console.log("That is senders: %w", wavesPerSender);
  //   return wavesPerSender;
  // }
  
//   function getAll() public view returns (address[] memory){
//     uint256 totalSenders = wavesPerSender.length;
//     address[] memory ret = new address[](totalSenders);
//     for (uint i = 0; i < totalSenders; i++) {
//         ret[i] = wavesPerSender[i];
//     }
//     return ret;
// }

  function wave() public {
    totalWaves += 1;
    console.log("%s has waved!", msg.sender);
    // recordSender();
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }
}