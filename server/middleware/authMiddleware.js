const jwt = require("jsonwebtoken");

// this will check token
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "invalid token" });
    }
};

module.exports = authMiddleware;