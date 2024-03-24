const User = require("../models/user-model");
const Certificate = require("../models/certificate-model");
const bcrypt = require("bcryptjs");
const { calculateSHA256Hash } = require('../sha256');
const { generateKeyPair, signWithPrivateKey } = require('../elliptic');

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
            signature: signatureString,   // Store signature as string
            sha256Hash: sha256Hash
        });
        return res.status(200).json({message: "Certificate data stored successfully",sha256Hash});

        
    } catch (error) {
        console.error("Error storing certificate data:", error);
        return res.status(500).json({message: "Failed to store certificate data"});
        
    }
}

const getSignatureById = async (req, res) => {
    try {
        const { id } = req.params;
        const certificate = await Certificate.findOne({ id });
        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }
        return res.status(200).json({ signature: certificate.signature });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve signature" });
    }
}


module.exports = {home, register, login, certificate};