const OpenAI = require("openai");

// this will create openai instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// this will ask ai
const askAI = async (text) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: text
                }
            ]
        });

        return response.choices[0].message.content;

    } catch (err) {
        return "ai error";
    }
};

module.exports = { askAI };