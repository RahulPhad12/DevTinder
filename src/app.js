const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");
app.use(express.json()); // Middleware to parse JSON request bodies


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
console.log(req.body)
const user = new User(req.body);
  // const user = new User({
    // firstName: "MS",
    // lastName: "Dhoni",
    // email: "msdhoni@gmail.com",
    // password:"MS@123",
    // age:43,
    // gender:"Male"
  // });

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

app.get("/user", async (req, res) => {
  const email = req.body.email;

  try {
    const users = await User.find({ email: email });  
    if(users.length === 0){
      return res.status(404).send("User not found");
    }else{
      res.send(users);
    }
    
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
});


app.get("/feed", async (req, res) => {
  try{
    const users = await User.find({});
    res.send(users);
  }catch(error){
    console.error("Error fetching feed:", error);
    res.status(500).send("Error fetching feed");
  }

});

app.patch("/user", async (req, res) => {
 // const email = req.body.email;
 console.log(req.body);
 const id = req.body.id;
  const data = req.body;    
  try{
    const user = await User.findOneAndUpdate({ _id: id }, data);
    if(!user){
      return res.status(404).send("User not found");
    }else{
      res.send("user updated successfully");
    }
  }catch(error){
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user");
  }
});