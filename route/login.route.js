import express from "express";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Render login page
router.get("/login", (req, res) => {
  const { error, success } = req.query; 
  res.render("login", { error, success }); 
});

// Handle login POST request
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect("/user/login?error=Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.redirect("/user/login?error=Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.redirect("/user/login?error=Invalid email or password");
  }

  // On successful login, pass a success message
  res.redirect("/user/login?success=You are now logged in");
});

export default router;
