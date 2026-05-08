const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("First name and last name are required");
    } else if (!validator.isEmail(email)) {
        throw new Error("Invalid email format");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password format is invalid");
    }
};

const validateProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "email", "age", "gender"];
    const isEditAllowed = Object.keys(req.body).every((field) => {
         return allowedEditFields.includes(field);
    });
    return isEditAllowed;
};

module.exports = { validateSignUpData, validateProfileData };