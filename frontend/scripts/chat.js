// File Location: frontend/scripts/chat.js

async function sendQuestion() {
    const questionInput = document.getElementById("question");
    const question = questionInput.value.trim();

    if (!question) return;

    // Use the global variable updated by compare.js or history.js
    if (!currentHistoryId) {
        alert("Please select a comparison from history or upload new PDFs first.");
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
                historyId: currentHistoryId // Passing the context ID to backend
            })
        });

        const data = await res.json();
        chatBox.innerHTML += `<p><b>AI:</b> ${data.answer}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (err) {
        chatBox.innerHTML += `<p style="color:red;">Error getting response</p>`;
    }
}