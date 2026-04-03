// File Location: server/controllers/chatController.js
const History = require("../models/History");
const { askAI } = require("../services/aiService");

exports.chat = async (req, res) => {
    try {
        const { question, historyId } = req.body;

        if (!question || !historyId) {
            return res.status(400).json({ msg: "Question and History ID are required" });
        }

        // Fetch the comparison context from the database
        const history = await History.findById(historyId);
        if (!history) {
            return res.status(404).json({ msg: "Comparison context not found" });
        }

        // Create a prompt that tells the AI about the resumes
        const prompt = `
            Context: You are helping a user with two resumes.
            Resume 1: ${history.file1Name}
            Resume 2: ${history.file2Name}
            Previous Findings: ${JSON.stringify(history.comparisonResult)}

            Question: ${question}
        `;

        const response = await askAI(prompt);

        // Save the chat exchange to the database
        history.chat.push({ question, answer: response });
        await history.save();

        res.json({ answer: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};