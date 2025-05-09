import express from "express";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Render signup page
router.get("/signup", (req, res) => {
  res.render("signup");

router.post("/signup", async (req, res) => {
    try {
      const { fullname, email, password, passwordConfirm } = req.body;
  
      // Log received data to debug
      console.log('Received:', req.body);
  
      // Check if passwordConfirm is missing or empty
      if (!passwordConfirm) {
        return res.render("signup", { message: "Please confirm your password", type: "error" });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render("signup", { message: "User already exists", type: "error" });
      }
  
      // Check if password and passwordConfirm match
      if (password !== passwordConfirm) {
        return res.render("signup", { message: "Passwords do not match", type: "error" });
      }
  
      // Create a new user instance (password will be hashed in the model)
      const newUser = new User({
        fullname,
        email,
        password, // password will be hashed in the model
        passwordConfirm, // Send passwordConfirm for validation (it won't be saved)
      });
  
      // Save the new user to the database
      await newUser.save();
      return res.render("signup", { message: "User created successfully!", type: "success" });
  
    } catch (error) {
      console.error("Signup error:", error);
      return res.render("signup", { message: "Internal server error", type: "error" });
    }
  });
  
});

export default router;