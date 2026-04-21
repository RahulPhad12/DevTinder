const monogoose = require('mongoose');
const connectDB = async () => {
    await monogoose.connect(
        "mongodb+srv://rahulphad225:AFnP6Rp35PHCsGps@myfirstdb.816kmwk.mongodb.net/devTinder"
    )};



module.exports = connectDB;