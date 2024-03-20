

// sha256 algorithm
const CryptoJS = require("crypto-js");

function calculateSHA256Hash(data) {
    // const vai = CryptoJS.SHA256(data).toString();
    // console.log(vai);
    return CryptoJS.SHA256(data).toString();
}


module.exports = {calculateSHA256Hash};


