const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const { JsonWebTokenError } = require("jsonwebtoken");
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies 
const jwt = require("jsonwebtoken");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((error) => {
    console.error("Database connection failed:", error);
});
