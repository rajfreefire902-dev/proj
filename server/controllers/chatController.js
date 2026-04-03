// File Location: server/controllers/chatController.js
const History = require("../models/History");
const { askAI } = require("../services/aiService");

exports.chat = async (req, res) => {
    try {
        const { question, historyId } = req.body;

        if (!question || !historyId) {
            return res.status(400).json({ msg: "Question and History ID are required for context." });
        }

        // Retrieve the document context from the database
        const history = await History.findById(historyId);
        if (!history) {
            return res.status(404).json({ msg: "Comparison context not found." });
        }

        // Construct a contextual prompt so the AI "remembers" the PDFs
        const contextualPrompt = `
            You are analyzing two documents. 
            Document 1: ${history.file1Name}
            Document 2: ${history.file2Name}
            
            Previous Comparison Findings:
            Summary: ${history.comparisonResult.summary}
            Similarities: ${history.comparisonResult.similarities}
            Differences: ${history.comparisonResult.differences}

            User Question: ${question}
        `;

        const response = await askAI(contextualPrompt);

        // Save this chat interaction to the history record
        history.chat.push({ question, answer: response });
        await history.save();

        res.json({ answer: response });
    } catch (err) {
        console.error("Chat Error:", err);
        res.status(500).json({ msg: "Server error during AI chat." });
    }
};