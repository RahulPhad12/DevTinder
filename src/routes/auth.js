const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

authRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    validateSignUpData(req);

    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ ...req.body, password: passwordHash });
    await user.save();

    res.status(201).send("User signed up successfully!");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error signing up user: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }   

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWTToken();
      res.cookie("token", token, {
        expire: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 24 hours
      });
      res.send("Login successful!");

    }else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Error logging in user: " + error.message);
  }
});

authRouter.post("/logout",(req, res) => {
  res.cookie("token","" ,{expire: new Date(Date.now())}); // Set the cookie to expire immediately
  res.send("Logout successful!");
});

module.exports = authRouter;