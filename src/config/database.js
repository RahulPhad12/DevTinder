const mongoose = require('mongoose');  
const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://rahulphad225:3SCFgiyM0GNKzeUs@node.f8kshcb.mongodb.net/devTinder"
    )};



module.exports = connectDB;