import React, { useState } from 'react'
import { generateKeyPair, verifyWithPublicKey, getPublicKey } from './elliptic';

const Verify = () => {

    const [sha256Hash, setSha256Hash] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    // const [signature, setSignature] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // d2820a7023577d2c9fe7c7877f3eebce813854aada0ff5b906e5926385b6fafd

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Fetch the signature corresponding to the entered ID
            const response = await fetch(`http://localhost:5000/api/auth/signature/${sha256Hash}`,{
                method:"POST"
            });

            if (response.ok) {
                const { message } = await response.json();
                setVerificationResult(true);
                setErrorMessage('');
            } else {
                setVerificationResult(false);
                const { message } = await response.json();
                setErrorMessage(message);
            }

            // if (response.ok) {
            //     const { signature } = await response.json();
            //     console.log("SIGNATURE",signature);
            //     setSignature(signature);

            //     // Generate key pair
            //     const keyPair = generateKeyPair();

            //     // Perform signature verification
            //     const publicKey = getPublicKey(keyPair); // Get the public key of the certificate issuer
            //     console.log("Public Key:", publicKey);
            //     const isSignatureValid = verifyWithPublicKey(publicKey, sha256Hash, signature);
            //     console.log("Is Signature Valid:", isSignatureValid);

            //     // Update verification result state
            //     setVerificationResult(isSignatureValid);

            // } else {
            //     setVerificationResult(false);
            //     setSignature(null);
            // }

            // const { signature } = await response.json();

            // Calculate SHA256 hash for the entered ID
            // const sha256Hash = calculateSHA256Hash(id);

            // // Extract r and s from the signature
            // const { r, s } = parseDERSignature(signature);

            // // Get the public key
            // const keyPair = generateKeyPair();
            // const publicKey = getPublicKey(keyPair);

            // // Verify the signature with the public key
            // const isSignatureValid = verifyWithPublicKey(publicKey, sha256Hash, { r, s });

            // // Update verification result state
            // setVerificationResult(isSignatureValid);
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to verify certificate');
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
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input
                        className='rounded-2 form-control'
                        style={{ maxWidth: "500px" }}
                        type="search"
                        placeholder="Enter the Hash ID"
                        aria-label="Search"
                        value={sha256Hash}
                        onChange={(e) => setSha256Hash(e.target.value)}
                    />
                    <button className="btn btn-outline-info mx-2" type="submit">Search</button>
                </form>
            </div>
            {verificationResult !== null && (
                <div className="text-center mt-3">
                    {verificationResult ? (
                        <>
                            <h2 className="text-warning">Verification successful: The certificate is authentic.</h2>
                            {/* {signature && <p className="text-white">Signature: {signature}</p>} */}
                        </>
                    ) : (
                        <h2 className="text-danger">Verification failed: The certificate may be tampered with or is not authentic.</h2>
                    )}
                </div>
            )}

        </div>
    )
}

export default Verify;
