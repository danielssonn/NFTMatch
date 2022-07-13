const ethers = require('ethers');
const https = require('https');

require('dotenv').config({ path: '../.env' })

// blockchain provider config
const providerURL = process.env.ALCHEMY_URL_MAINNET
const provider = new ethers.providers.JsonRpcProvider(providerURL);

// API provider config
const options = {
    hostname: process.env.NFT_PORT_URL,
    port: 443,
    path: process.env.NFT_PORT_MATCH,
    method: 'GET',
    accept: 'application/json',
    query: { chain: 'ethereum' },
    headers: {
        Authorization: process.env.NFT_PORT_KEY
    },
};

// Add these to your .env and delete from here
// NFT_PORT_KEY = "6e1a58fb-550c-4dd4-92db-1508572bc92b"
// NFT_PORT_URL = "api.nftport.xyz"
// NFT_PORT_MATCH = "/v0/search?"


/**
 * Accept and persist the NFT to be registered for matching.
 * @param {*} input 
 * @param {*} callback 
 */
const handleNFTRegistration = async (input, callback) => {

    // find some good persistence provider tha will not lock us in on any given platform
    // define persistence model that lends itself well towards eventual distributed deployment
    // persist the NFT there ...
    callback(200, { message: "No registration provider implemented, go do it :-)!" });
}



/**
 * Retrieve the token URI
 * @param {*} input 
 * @param {*} callback 
 */
const handleURIRequest = async (input, callback) => {

    const token_uri = await getTokenURI(input.contract_address, input.token_id)
    let responseBody = {
        message: "Retrieved",
        token_uri: token_uri
    };

    let response = {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };
    callback(200, response);

}
/**
 * Retrieve via API search
 * @param {*} input 
 * @param {*} callback 
 */
const handleMatchRequest = async (input, callback) => {

    options.path = options.path + 'chain=ethereum&text=' + input.text + '&' + input.chain + '&filter_by_contract_address=' + input.contract_address;
    console.log(options.path);
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
        let data;
        res.on('data', d => {
            data = data + d

        });
        res.on('end', function () {
            callback(200, data);
        });
    });

    req.on('error', error => {
        console.log('ERROR', error);
    });

    req.end();

}

const getTokenURI = async function (nft_contract_address, token_id) {

    const nftContract = new ethers.Contract(nft_contract_address, abiErc721, provider);
    const token_uri = await nftContract.tokenURI(token_id)
    return { token_uri: token_uri }
}

const abiErc721 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function tokenURI(uint256 tokenId) external view returns (string memory)"
];

const updateFinderContract = async function (nft_contract_address, token_id) {

    const finderContract = new ethers.Contract(finder_contract_address, abiFinderContract, provider);
    await finderContract.updateMatch({ tknAddress: nft_contract_address, tknId: 15, amount: 1, listingLength: 1 }, nft_contract_address, token_id);
}

const abiFinderContract = []

/**
 * Lambda function wrapper for the service
 */
exports.handler = (event, context, callback) => {


    handleURIRequest(event, (statusCode, data) => {
        callback(null, {
            statusCode: statusCode,

            isBase64Encoded: false
        })
    })
}

// Should we want to run straight up vs. as a lambda
module.exports.handleURIRequest = handleURIRequest
module.exports.handleMatchRequest = handleMatchRequest
module.exports.handleNFTRegistration = handleNFTRegistration