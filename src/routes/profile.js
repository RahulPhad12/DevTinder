const express = require('express');

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validator");



profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {

    const user = req.user; // Access the authenticated user information from the request object

    res.send(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send("Error fetching profile");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      return res.status(400).send("Invalid edit request");
    }

    const loggedInUser = req.user; // Access the authenticated user information from the request object
    Object.keys(req.body).forEach((field) => {
      loggedInUser[field] = req.body[field];
    });
    await loggedInUser.save();
    res.json({ message: `${loggedInUser.firstName}, Profile updated successfully`, data: loggedInUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Error updating profile");
  }
});

module.exports = profileRouter;