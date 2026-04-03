const { readPDF } = require("../services/pdfService");
const { askAI } = require("../services/aiService");
const History = require("../models/History");

exports.compare = async (req, res) => {
    try {
        if (!req.files || !req.files.file1 || !req.files.file2) {
            return res.status(400).json({ msg: "Please upload both PDF files." });
        }

        // 1. Extract text from both files
        const text1 = await readPDF(req.files.file1[0].path);
        const text2 = await readPDF(req.files.file2[0].path);

        // 2. AI Prompt (Updated to match your preferred logic)
        const prompt = `
            You are an expert document analyzer. Compare these two documents:
            Doc 1: ${text1}
            Doc 2: ${text2}

            Output ONLY valid JSON with these keys:
            "summary": (string),
            "similarities": (string),
            "differences": (string),
            "missingTopics": (string)
        `;

        const aiResponse = await askAI(prompt);
        
        let comparisonResult;
        try {
            comparisonResult = JSON.parse(aiResponse);
        } catch (e) {
            // Basic cleanup in case AI includes markdown code blocks
            const cleanJson = aiResponse.replace(/```json|```/g, "").trim();
            comparisonResult = JSON.parse(cleanJson);
        }

        // 3. Save to History
        const history = new History({
            userId: req.user.id,
            file1Name: req.files.file1[0].originalname,
            file2Name: req.files.file2[0].originalname,
            comparisonResult: comparisonResult
        });
        const savedHistory = await history.save();

        res.json({
            comparisonResult: comparisonResult,
            historyId: savedHistory._id
        });

    } catch (err) {
        console.error("Comparison Error:", err.message);
        res.status(500).json({ msg: err.message });
    }
};