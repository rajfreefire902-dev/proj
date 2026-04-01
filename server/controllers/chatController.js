const { askAI } = require("../services/aiService");

// this will handle chat
exports.chat = async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ msg: "no question" });
    }

    const response = await askAI(question);

    res.json({ answer: response });
};