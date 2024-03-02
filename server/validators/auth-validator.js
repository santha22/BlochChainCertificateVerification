const {z} = require("zod");

// creating object schema
const signupSchema = z.object({
    orgName: z 
      .string({required_error: "Organiation Name is required"})
      .trim()
      .min(3, {message: "Organiation Name must be at least of 3 characters"})
      .max(255, {message: "Organiation Name must not be more than 255 characters"}),

    email: z 
      .string({required_error: "Email is required"})
      .trim()
      .email({message: "Invalid email address"})
      .min(3, {message: "Email must be at least of 3 characters"})
      .max(255, {message: "Email must not be more than 255 characters"}),

    password: z 
      .string({required_error: "Password is required"})
      .min(6, {message: "Password must be at least of 6 characters"})
      .max(1024, {message: "Password must not be more than 1024 characters"}),

});

const loginSchema = z.object({
    email: z
      .string({required_error: "Email is required"})
      .trim()
      .email({message: "Invalid email address"})
      .min(3, {message: "Email must be exactly of 3 characters"})
      .max(255, {message: "Email must not be more than 255 characters"}),
    
    password: z
      .string({required_error: "Password is required"})
      .min(7, {message: "Password must atleast be of 6 characters"})
      .max(1024, {message: "Password can't be greater than 1024 characters"}),
      
});

module.exports = {signupSchema, loginSchema};