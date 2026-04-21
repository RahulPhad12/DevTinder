const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");

connectDB();
connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((error) => {
    console.error("Database connection failed:", error);
});

app.use("/test",(req, res) => {
  res.send("Hello, World!");
});

// app.use("/",(req, res) => {
//   res.send("Hello Dashboard!");
// });

app.post("/signup", async (req, res) => {
const user = new User({
    firstName: "Rohit",
    lastName: "Sharma",
    email: "rohitsharma@gmail.com",
    password:"Rohit@128",
    age:35,
    gender:"Male"
  });

  try{
    await user.save();
     console.log("User saved successfully!");
    res.send("User signed up successfully!");
  }
  catch(error){
    console.error("Error saving user:", error);
    res.status(500).send("Error signing up user");
  }
});
