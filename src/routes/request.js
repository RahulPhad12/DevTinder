const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");



requestRouter.post("/sendconnectionrequest",userAuth, async (req, res) => {
  try{
    const user = req.user; // Access the authenticated user information from the request object
    res.send(user.firstName + " " +"Connection request sent successfully");
  }catch(error){
    console.error("Error sending connection request:", error);
    res.status(500).send("Error sending connection request");
  }
});

module.exports = requestRouter;