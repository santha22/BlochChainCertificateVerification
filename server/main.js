// main.js
const { calculateSHA256Hash } = require('./sha256');
const { generateKeyPair, signWithPrivateKey } = require('./elliptic');


// Example data (replace this with actual certificate information)
// const certificateData = ``;
const certificateData = "StudentName: John Doe, Course: Blockchain";

// Calculate SHA256 hash
const sha256Hash = calculateSHA256Hash(certificateData);
// 708006f10f0476bf15d95b02be1e894c5ffd0ad3a22ad7f7ef62566758ad6234

// Generate key pair
const keyPair = generateKeyPair();

// Sign the SHA256 hash with the private key
const signature = signWithPrivateKey(keyPair.getPrivate('hex'), sha256Hash);

// Log the results
console.log("SHA256 Hash:", sha256Hash);
console.log("Signature:", signature);

module.exports = {signature, certificateData, sha256Hash};
