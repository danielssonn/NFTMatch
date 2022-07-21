// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/*
Structure representing NFTListing for a Lender
*/
struct NFTListing {
    address tknAddress;
    uint256 tknId;
    uint256 amount;
    uint256 listingLength;
    string compliance;
}

struct NFTCollateral {
    uint256 amount;
}
