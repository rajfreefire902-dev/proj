const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
    saveHistory,
    getHistory
} = require("../controllers/historyController");

router.post("/", auth, saveHistory);
router.get("/", auth, getHistory);

module.exports = router;