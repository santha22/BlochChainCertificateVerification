const {Schema, model} = require("mongoose");

const certificateSchema = new Schema({
    firstname: { 
        type: String, require: true},

    lastname: { 
        type: String, require: true},

    orgName: { 
        type: String, require: true},

    courseName: { 
        type: String, require: true},

    assignDate: { 
        type: Date, require: true},

    duration: { 
        type: String, require: true},

    email: { 
        type: String, require: true},
});

// create a model or  a collection 
const Certificate = new model("Certificate", certificateSchema);


module.exports = Certificate;