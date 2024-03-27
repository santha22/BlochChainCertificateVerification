
// const EC = require('elliptic').ec;
// const ec = new EC('secp256k1');  // 'secp256k1' is commonly used for Bitcoin

// // Generate key pair
// function generateKeyPair() {
//  return ec.genKeyPair();

// }
    
// function signWithPrivateKey(privateKey, sha256Hash) {
//     const key = ec.keyFromPrivate(privateKey, 'hex');
//     const signature = key.sign(sha256Hash);
//     return signature.toDER('hex');
//   }

// function verifyWithPublicKey(publicKey, sha256Hash, signature) {
//     const key = ec.keyFromPublic(publicKey, 'hex');
//     return key.verify(sha256Hash, signature);
// }

//   module.exports = { generateKeyPair, signWithPrivateKey, verifyWithPublicKey };


// // Sign the SHA256 hash with the private key
// // const signature = key.sign(sha256Hash);
// // const derSign = signature.toDER('hex');


// const EC = require('elliptic').ec;
// const crypto = require('crypto');

// Function to generate key pair
// function generateKeyPair() {
//     const ec = new EC('secp256k1');
//     return ec.genKeyPair();
// }

// // Function to sign data with private key using ECDSA
// function signWithPrivateKey(privateKey, data) {
//     const ec = new EC('secp256k1');
//     const key = ec.keyFromPrivate(privateKey, 'hex');
//     const signature = key.sign(data);
//     return {
//         r: signature.r.toString('hex'),
//         s: signature.s.toString('hex')
//     };
// }

// In elliptic.js


const { ec } = require('elliptic');

// Create an elliptic curve object using the secp256k1 curve (commonly used in blockchain)
const curve = new ec('secp256k1');

// Function to generate key pair (public key and private key)
const generateKeyPair = () => {
    return curve.genKeyPair();
};

// Function to get the public key from the key pair
const getPublicKey = (keyPair) => {
    return keyPair.getPublic('hex');
};

// Function to verify signature with the public key
const verifyWithPublicKey = (publicKey, sha256Hash, signature) => {
    // Create a public key object from the provided hex string
    const pubKey = curve.keyFromPublic(publicKey, 'hex');
    
    // Verify the signature using the public key
    return pubKey.verify(sha256Hash, signature);
};

module.exports = { generateKeyPair, getPublicKey, verifyWithPublicKey };
