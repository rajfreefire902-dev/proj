const History = require("../models/History");

// save history
exports.saveHistory = async (req, res) => {
    const { action, result } = req.body;

    const history = new History({
        userId: req.user.id,
        action,
        result
    });

    await history.save();

    res.json({ msg: "saved" });
};

// get history
exports.getHistory = async (req, res) => {
    const data = await History.find({ userId: req.user.id });

    res.json(data);
};