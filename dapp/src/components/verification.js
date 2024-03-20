// const { signature, originalStudentDetails } = require('./main');
const { calculateSHA256Hash } = require('./sha256');
const {verifyWithPublicKey } = require('./elliptic');

// const signature = '3045022100fd36c...'; // Your provided signature
const { r, s } = parseDERSignature(signature);
// console.log(signature)

function parseDERSignature(signature) {
  // Ensure the signature starts with the DER prefix (0x30)
  if (signature[0] !== 0x30) {
      throw new Error('Invalid DER-encoded signature format');
  }

  // Extract the length of the signature
  const totalLength = signature.length;
  let index = 2; // Start after the DER prefix (0x30) and length byte

  // Extract r value
  const rType = signature[index++];
  if (rType !== 0x02) {
      throw new Error('Invalid DER-encoded signature format for r');
  }
  const rLength = signature[index++];
  const rEnd = index + rLength;
  const r = signature.slice(index, rEnd).toString('hex');
  index = rEnd;

  // Extract s value
  const sType = signature[index++];
  if (sType !== 0x02) {
      throw new Error('Invalid DER-encoded signature format for s');
  }
  const sLength = signature[index++];
  const sEnd = index + sLength;
  const s = signature.slice(index, sEnd).toString('hex');

  return { r, s };
}



console.log('r:', r);
console.log('s:', s);


const recalculatedHash = calculateSHA256Hash(originalStudentDetails);

const isSignatureValid = verifyWithPublicKey(publicKey, recalculatedHash, { r, s });

function verifyWithPublicKey(publicKey, sha256Hash, { r, s }) {
  const key = ec.keyFromPublic(publicKey, 'hex');
  return key.verify(sha256Hash, { r, s });
}


if (isSignatureValid) {
    console.log("Verification successful: The certificate is authentic.");
  } else {
    console.log("Verification failed: The certificate may be tampered with or is not authentic.");
  }
  