const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength:8 ,
    validate: {
      validator(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password format is invalid");
        }
      }
    }
  },
  age: {
    type: Number,
    required: true,
    min: 18
  },
  gender:{
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return ['male', 'female', 'other'].includes(v);
      },
      message: 'Please enter a valid gender'
    }
  },
  profilePicture: {
    type: String,
    default: "https://www.shutterstock.com/image-vector/default-avatar-social-media-display-600nw-2632690107.jpg"
  },
}, { timestamps: true });


userSchema.methods.getJWTToken = function() {
  return jwt.sign({ _id: this._id }, "DEVTINDER@128", {expiresIn:"1d"});
}

userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
} 

const User = mongoose.model("User", userSchema);
module.exports = User;