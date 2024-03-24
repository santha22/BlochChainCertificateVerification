// const CryptoJS = require("crypto-js");

// function calculateSHA256Hash(data) {
//     // const vai = CryptoJS.SHA256(data).toString();
//     // console.log(vai);
//     return CryptoJS.SHA256(data).toString();
// }


// module.exports = {calculateSHA256Hash};


const crypto = require('crypto');

// Function to calculate SHA256 hash
function calculateSHA256Hash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}

module.exports = { calculateSHA256Hash };
