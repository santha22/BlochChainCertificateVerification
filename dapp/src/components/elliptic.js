
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

// function verifyWithPublicKey(publicKey, sha256Hash, signature) {
//     const key = ec.keyFromPublic(publicKey, 'hex');
//     return key.verify(sha256Hash, signature);
// }

function verifyWithPublicKey(publicKey, sha256Hash, signature) {
  try {
      // Parse the signature string into an object
      const parsedSignature = JSON.parse(signature);
        
      // Extract 'r' and 's' from the parsed signature
      const { r, s } = parsedSignature;

      console.log(r,s, parsedSignature);
      // Ensure both 'r' and 's' components are present
      if (!r || !s) {
          throw new Error('Invalid signature: Signature must have both "r" and "s" components');
      }

      // Create a public key object from the provided hex string
      const pubKey = ec.keyFromPublic(publicKey, 'hex');

      // Verify the signature using the public key
      return pubKey.verify(sha256Hash, { r, s });
  } catch (error) {
      console.error('Error verifying signature:', error);
      return false; // Return false if there's any error during verification
  }
}

function getPublicKey(keyPair) {
  return keyPair.getPublic('hex');
}

module.exports = { generateKeyPair, signWithPrivateKey, verifyWithPublicKey, getPublicKey };
