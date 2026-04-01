const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { compare } = require("../controllers/compareController");

// this will upload 2 files
router.post(
    "/",
    upload.fields([
        { name: "file1" },
        { name: "file2" }
    ]),
    compare
);

module.exports = router;