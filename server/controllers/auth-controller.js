const User = require("../models/user-model");
const Certificate = require("../models/certificate-model");
const bcrypt = require("bcryptjs");

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
        
        // hash password
        // const slatRound = 10;
        // const hash_password = await bcrypt.hash(password, slatRound);
        
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
        await Certificate.create(response);
        return res.status(200).json({message: "certificate send successfully"});

        
    } catch (error) {
        return res.status(500).json({message: "certificate not send"});
        
    }
}

module.exports = {home, register, login, certificate};