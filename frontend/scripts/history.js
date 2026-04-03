// File Location: frontend/scripts/history.js

async function loadHistory() {
    try {
        const res = await fetch(BASE_URL + "/history", {
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        });

        const data = await res.json();
        const list = document.getElementById("history-list");
        list.innerHTML = "";

        if (!data || data.length === 0) {
            list.innerHTML = "<p>No history found</p>";
            return;
        }

        data.forEach(item => {
            const li = document.createElement("li");
            li.innerText = `${item.file1Name} vs ${item.file2Name}`;

            li.onclick = () => {
                // Update global context
                currentHistoryId = item._id;

                // Update the current page view with history data
                document.getElementById("summary").innerText = item.comparisonResult.summary || "N/A";
                document.getElementById("similarities").innerText = item.comparisonResult.similarities || "N/A";
                document.getElementById("differences").innerText = item.comparisonResult.differences || "N/A";
                document.getElementById("missing").innerText = item.comparisonResult.missingTopics || "N/A";

                // Load associated chat history into the chat box
                const chatBox = document.getElementById("chat-box");
                chatBox.innerHTML = "";
                if (item.chat && item.chat.length > 0) {
                    item.chat.forEach(msg => {
                        chatBox.innerHTML += `<p><b>You:</b> ${msg.question}</p>`;
                        chatBox.innerHTML += `<p><b>AI:</b> ${msg.answer}</p>`;
                    });
                }
                chatBox.scrollTop = chatBox.scrollHeight;
            };

            list.appendChild(li);
        });

    } catch (err) {
        console.log("Error loading history:", err);
    }
}

// Initial load
loadHistory();