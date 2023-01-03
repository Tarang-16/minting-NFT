// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract BasicNft is ERC721 {
    string public constant TOKEN_URI =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";
    uint256 private s_tokenCounter;
    
    constructor() ERC721("Dogie","Dog") {
        s_tokenCounter = 0;
    }

    function mintNft() public returns(uint256) {
        s_tokenCounter += 1;
        _safeMint(msg.sender, s_tokenCounter);         // function in ERC721. You can check this in ERC721.sol
        return s_tokenCounter;
    }

    function tokenURI(uint256 /* tokenId */) public pure override returns(string memory) {   // this function exists in ERC721 but we are not using that rather we are writing our own function.
        // require(_exists(tokenId))                                                         // since we are returning the same TOKEN_URI, so tokenId doesn't matter
        return TOKEN_URI;                      
    }

    function getTokenCounter() public view returns(uint256) {
        return s_tokenCounter;
    }
}