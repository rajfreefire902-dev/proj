const jwt = require("jsonwebtoken");

// this will create token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = generateToken;