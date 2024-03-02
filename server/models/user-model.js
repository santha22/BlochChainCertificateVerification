const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    orgName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: String,
        require: true,
    }
});

// secure password with bcrypt
userSchema.pre('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) {
        next();
    }

    try {
        const slatRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, slatRound);
        user.password = hash_password;
        
    } catch (error) {
        next(error);
    }

})


// compare password
userSchema.methods.comparePassword = async function(password) {
    // console.log(password, "this is password");
    return  bcrypt.compare(password, this.password);
}

// json web token
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        )
    } catch (error) {
        console.error(error);
    }

}

// define model 
const User = new mongoose.model("User", userSchema);

module.exports = User;