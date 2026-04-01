const { readPDF } = require("../services/pdfService");

// this will compare two resumes
exports.compare = async (req, res) => {
    const file1 = req.files.file1[0].path;
    const file2 = req.files.file2[0].path;

    const text1 = await readPDF(file1);
    const text2 = await readPDF(file2);

    res.json({
        result: "comparison done",
        file1: text1,
        file2: text2
    });
};