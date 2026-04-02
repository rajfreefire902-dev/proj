async function sendQuestion() {
    const questionInput = document.getElementById("question");
    const question = questionInput.value.trim();

    if (!question) return;

    if (!currentHistoryId) {
        alert("Please compare PDFs first");
        return;
    }

    const chatBox = document.getElementById("chat-box");

    // Show user message
    chatBox.innerHTML += `<p><b>You:</b> ${question}</p>`;

    questionInput.value = "";

    try {
        const res = await fetch(BASE_URL + "/chat", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                question,
                historyId: currentHistoryId
            })
        });

        const data = await res.json();

        // Show AI response
        chatBox.innerHTML += `<p><b>AI:</b> ${data.answer}</p>`;

        // Auto scroll
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (err) {
        chatBox.innerHTML += `<p style="color:red;">Error getting response</p>`;
    }
}