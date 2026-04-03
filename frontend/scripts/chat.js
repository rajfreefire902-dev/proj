// File Location: frontend/scripts/chat.js

async function sendQuestion() {
    const questionInput = document.getElementById("question");
    const question = questionInput.value.trim();

    if (!question) return;

    // Use the global ID set during comparison
    if (!window.currentHistoryId) {
        alert("Please compare PDFs first to give the AI context.");
        return;
    }

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><b>You:</b> ${question}</p>`;
    questionInput.value = "";

    try {
        const res = await fetch(BASE_URL + "/chat", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                question: question,
                historyId: window.currentHistoryId // Send the ID for context
            })
        });

        const data = await res.json();
        chatBox.innerHTML += `<p><b>AI:</b> ${data.answer}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (err) {
        chatBox.innerHTML += `<p style="color:red;">Error getting response</p>`;
    }
}