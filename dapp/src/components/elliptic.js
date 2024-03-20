
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');  // 'secp256k1' is commonly used for Bitcoin

// Generate key pair
function generateKeyPair() {
 return ec.genKeyPair();

}
    
function signWithPrivateKey(privateKey, sha256Hash) {
    const key = ec.keyFromPrivate(privateKey, 'hex');
    const signature = key.sign(sha256Hash);
    return signature.toDER('hex');
  }

function verifyWithPublicKey(publicKey, sha256Hash, signature) {
    const key = ec.keyFromPublic(publicKey, 'hex');
    return key.verify(sha256Hash, signature);
}

module.exports = { generateKeyPair, signWithPrivateKey, verifyWithPublicKey };

// const { ec } = require('elliptic');

// // Create an elliptic curve object using the secp256k1 curve (used in Bitcoin)
// const curve = new ec('secp256k1');

// // Function to generate a key pair (public key and private key)
// function generateKeyPair() {
//   const keyPair = curve.genKeyPair();
//   return {
//     publicKey: keyPair.getPublic('hex'),
//     privateKey: keyPair.getPrivate().toString(16) // Convert the private key to hexadecimal string
//   };
// }


// // Function to sign a message using the private key
// function signWithPrivateKey(privateKeyHex, message) {
//   const key = curve.keyFromPrivate(privateKeyHex, 'hex');
//   const signature = key.sign(message);
//   return signature.toDER('hex');
// }

// module.exports = { generateKeyPair, signWithPrivateKey };

