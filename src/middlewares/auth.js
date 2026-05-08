const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    //read the token from the cookie validate the token and extract the user information
    try {
        const token = req.cookies;
        if (!token) {
            return res.status(401).send("Unauthorized: No token provided");
        }
        const decoded = await jwt.verify(token.token, "DEVTINDER@128");
        const id = decoded;
        const user = await User.findById(id._id);
        if (!user) {
            res.status(404).send("User not found");
        } 
        req.user = user; // Attach user information to the request object
        next();
    }
    catch (error) {
        console.error("Error in user authentication:", error);
        res.status(401).send("Unauthorized: Invalid token");
    }
}

module.exports = { userAuth };