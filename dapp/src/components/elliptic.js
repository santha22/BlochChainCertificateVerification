
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

function getPublicKey(keyPair) {
  return keyPair.getPublic('hex');
}

module.exports = { generateKeyPair, signWithPrivateKey, verifyWithPublicKey, getPublicKey };
