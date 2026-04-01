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

        if (!data.length) {
            list.innerHTML = "<p>No history found</p>";
            return;
        }

        data.forEach(item => {
            const li = document.createElement("li");

            li.innerText = `${item.file1Name} vs ${item.file2Name}`;

            li.onclick = () => {
                currentHistoryId = item._id;

                document.getElementById("summary").innerText = item.comparisonResult.summary;
                document.getElementById("similarities").innerText = item.comparisonResult.similarities;
                document.getElementById("differences").innerText = item.comparisonResult.differences;
                document.getElementById("missing").innerText = item.comparisonResult.missingTopics;

                // Load chat history
                const chatBox = document.getElementById("chat-box");
                chatBox.innerHTML = "";

                item.chat.forEach(msg => {
                    chatBox.innerHTML += `<p><b>You:</b> ${msg.question}</p>`;
                    chatBox.innerHTML += `<p><b>AI:</b> ${msg.answer}</p>`;
                });
            };

            list.appendChild(li);
        });

    } catch (err) {
        console.log("Error loading history");
    }
}

// Load on page start
loadHistory();