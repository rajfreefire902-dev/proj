// File Location: frontend/scripts/history.js

async function loadHistory(shouldAutoSelect = false) {
    try {
        const res = await fetch(BASE_URL + "/history", {
            headers: { "Authorization": "Bearer " + getToken() }
        });

        const data = await res.json();
        const list = document.getElementById("history-list");
        list.innerHTML = "";

        if (!data || data.length === 0) {
            list.innerHTML = "<p>No history found</p>";
            return;
        }

        // Sort by newest first using createdAt timestamp
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        data.forEach((item) => {
            const li = document.createElement("li");
            li.innerText = `${item.file1Name} vs ${item.file2Name}`;

            li.onclick = () => {
                // 1. Reveal the result card
                document.getElementById("result-card").style.display = "block";
                
                // 2. Set global ID for Chat
                currentHistoryId = item._id;

                // 3. Populate text fields
                document.getElementById("summary").innerText = item.comparisonResult.summary;
                document.getElementById("similarities").innerText = item.comparisonResult.similarities;
                document.getElementById("differences").innerText = item.comparisonResult.differences;
                document.getElementById("missing").innerText = item.comparisonResult.missingTopics;

                // 4. Update Chat Box
                const chatBox = document.getElementById("chat-box");
                chatBox.innerHTML = "";
                if (item.chat) {
                    item.chat.forEach(msg => {
                        chatBox.innerHTML += `<p><b>You:</b> ${msg.question}</p>`;
                        chatBox.innerHTML += `<p><b>AI:</b> ${msg.answer}</p>`;
                    });
                }
            };

            list.appendChild(li);
        });

        // FIX: Use setTimeout to ensure the browser has finished 
        // rendering the <li> before we try to click it.
        if (shouldAutoSelect) {
            setTimeout(() => {
                const firstItem = list.querySelector("li");
                if (firstItem) firstItem.click();
            }, 100); 
        }

    } catch (err) {
        console.log("Error loading history");
    }
}

// Default load when page opens
loadHistory(false);