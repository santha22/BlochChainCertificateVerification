import React, { useState } from 'react'
import { calculateSHA256Hash } from './sha256';
import { verifyWithPublicKey, generateKeyPair, getPublicKey } from './elliptic';

const Verify = () => {

    const [id, setId] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    // d2820a7023577d2c9fe7c7877f3eebce813854aada0ff5b906e5926385b6fafd
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Fetch the signature corresponding to the entered ID
            const response = await fetch(`http://localhost:5000/api/signature/${id}`);
            const { signature } = await response.json();

            // Calculate SHA256 hash for the entered ID
            const sha256Hash = calculateSHA256Hash(id);

            // Extract r and s from the signature
            const { r, s } = parseDERSignature(signature);

            // Get the public key
            const keyPair = generateKeyPair();
            const publicKey = getPublicKey(keyPair);

            // Verify the signature with the public key
            const isSignatureValid = verifyWithPublicKey(publicKey, sha256Hash, { r, s });

            // Update verification result state
            setVerificationResult(isSignatureValid);
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., display an error message)
        }
    }

    const parseDERSignature = (signature) => {
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



    return (
        <div className='container'>
            <h1 className='text-white d-flex justify-content-center align-items-center mb-5'>Verify Your Certificate</h1>
            <div className='d-flex justify-content-center align-items-center'>
                <form className="d-flex">
                    <input 
                        className='rounded-2 form-control' 
                        style={{ maxWidth: "500px" }} 
                        type="search" 
                        placeholder="Enter the ID" 
                        aria-label="Search" 
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button className="btn btn-outline-info mx-2" type="submit">Search</button>
                </form>
            </div>
            {verificationResult !== null && (
                <div className="text-center mt-3">
                    {verificationResult ? (
                        <p className="text-success">Verification successful: The certificate is authentic.</p>
                    ) : (
                        <p className="text-danger">Verification failed: The certificate may be tampered with or is not authentic.</p>
                    )}
                </div>
            )}

        </div>
    )
}

export default Verify;
