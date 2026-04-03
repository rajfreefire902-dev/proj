const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Get the header
    const authHeader = req.header("Authorization");

    // Check if header exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = authMiddleware;