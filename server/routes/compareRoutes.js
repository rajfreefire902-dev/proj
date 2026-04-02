const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware"); // Added
const { compare } = require("../controllers/compareController");

router.post("/", auth, upload.fields([{ name: "file1" }, { name: "file2" }]), compare);

module.exports = router;