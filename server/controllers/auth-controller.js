const User = require("../models/user-model");
const Certificate = require("../models/certificate-model");
const bcrypt = require("bcryptjs");
const { calculateSHA256Hash } = require('../sha256');
const { generateKeyPair, signWithPrivateKey, getPublicKey, verifyWithPublicKey } = require('../elliptic');

const home = async (req, res) => {
    try {
        
        res.status(200).send("Welcome to mern series santha using controller");
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body);
        const {orgName, email, password} = req.body;

        const userExist = await User.findOne({email});

        if (userExist) {
            return res.status(400).json({ message: "Email already exists"});
        }
        
    
        const userCreated = await User.create({orgName, email, password});

        res.status(201).send({
            message: "registration successful", 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString(),
        });

    } catch (error) {
        // res.status(400).send({msg: "Internal server error"});
        next(error);
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email});
        // console.log(userExist);

        if(!userExist) {
            return res.status(400).json({message: "Invalid Credential"})
        }

        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);
        
        if (user) {
            res.status(200).send({
                message: "login successful", 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(),
            });
        }

        else {
            res.status(401).json({message: "Invalid email or password"});
        }
        
    } catch (error) {
        // res.status(400).send({msg: "Internal server error"});
        next(error);
    }
}

const certificate = async (req, res) => {
    try {
        const response = req.body;

        // Calculate SHA256 hash
        const sha256Hash = calculateSHA256Hash(JSON.stringify(response));

        // Generate key pair
        const keyPair = generateKeyPair();

        // Get the public key from the key pair
        const publicKey = getPublicKey(keyPair);    // added


        // Sign the SHA256 hash with the private key
        const signature = signWithPrivateKey(keyPair.getPrivate('hex'), sha256Hash);

        // Convert signature object to string
        const signatureString = JSON.stringify(signature);

        await Certificate.create({
            firstname: response.firstname,
            lastname: response.lastname,
            orgName: response.orgName,
            courseName: response.courseName,
            assignDate: response.assignDate,
            duration: response.duration,
            email: response.email,
            publicKey: publicKey, // Store the public key added
            signature: signatureString,   // Store signature as string
            sha256Hash: sha256Hash
        });
        return res.status(200).json({message: "Certificate data stored successfully",sha256Hash});

        
    } catch (error) {
        console.error("Error storing certificate data:", error);
        return res.status(500).json({message: "Failed to store certificate data"});
        
    }
}

// const getSignatureById = async (req, res) => {
//     try {
//         const { shaId } = req.params;
//         const certificate = await Certificate.findOne({ sha256Hash:shaId });
//         if (!certificate) {
//             return res.status(404).json({ message: "Certificate not found" });
//         }
//         return res.status(200).json({ signature: certificate.signature });
//     } catch (error) {
//         return res.status(500).json({ message: "Failed to retrieve signature" });
//     }
// }

const getPublicKeyOfIssuer = async (orgName) => {
    // Assuming you have a database where public keys are stored along with issuer information
    const issuer = await Certificate.findOne({ orgName }); // Assuming Issuer is your model representing certificate issuers
    console.log("ISSUER", issuer);
    if (!issuer) {
        throw new Error('Issuer not found');
    }
    return issuer.publicKey; // Assuming publicKey is the field in your Issuer model storing the public key
};


const getSignatureById = async (req, res) => {
    try {
        const { shaId } = req.params;
        // console.log("SHAID", shaId);
        const certificate = await Certificate.findOne({ sha256Hash: shaId });
        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }
        
        // Retrieve the public key of the certificate issuer
        const publicKey = certificate.publicKey;

        console.log("PUBLIC KEY", publicKey);
        // Retrieve the public key of the certificate issuer
        // const publicKey = await Certificate.findOne(certificate.publicKey);
        // const publicKey = await getPublicKeyOfIssuer(certificate.orgName); // Modify this based on how you store and retrieve public keys
        // console.log("PUBLIC KEY", publicKey);
        // Verify the signature using the retrieved public key

        const isSignatureValid = verifyWithPublicKey(publicKey, certificate.sha256Hash, certificate.signature);
        console.log('SECOND PUBLIC KEY', certificate.publicKey);

        if (isSignatureValid) {
            return res.status(200).json({ message: "Signature verified successfully" });
        } else {
            return res.status(401).json({ message: "Signature verification failed" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve signature or verify" });
    }
}


module.exports = {home, register, login, certificate,getSignatureById};