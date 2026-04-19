const express = require("express");

const app = express();

app.use("/test",(req, res) => {
  res.send("Hello, World!");
});

// app.use("/",(req, res) => {
//   res.send("Hello Dashboard!");
// });

app.get("/user",(req, res) => {
  res.send({"first":"Hello User!", "second":"Welcome to DevTinder!"});
});

app.post("/user",(req, res) => {
  res.send("Data received successfully!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});