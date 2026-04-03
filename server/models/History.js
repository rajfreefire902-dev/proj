// File Location: server/models/History.js
const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    file1Name: String,
    file2Name: String,
    comparisonResult: {
        summary: String,
        similarities: String,
        differences: String,
        missingTopics: String
    },
    chat: [{
        question: String,
        answer: String
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("History", historySchema);