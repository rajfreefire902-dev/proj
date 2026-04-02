const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware"); // Import fix
const { chat } = require("../controllers/chatController");

router.post("/", auth, chat);

module.exports = router;