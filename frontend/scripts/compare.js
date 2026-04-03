// File Location: frontend/scripts/compare.js

// Ensure this is global so chat.js can use it immediately after comparison
if (typeof currentHistoryId === 'undefined') {
    var currentHistoryId = null;
}

async function comparePDFs(event) {
    if (event) event.preventDefault();

    const file1 = document.getElementById("file1").files[0];
    const file2 = document.getElementById("file2").files[0];

    if (!file1 || !file2) {
        alert("Please select both PDF files.");
        return;
    }

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
        // Show a loading state (optional but recommended)
        document.getElementById("summary").innerText = "Comparing documents... please wait.";

        const res = await fetch(BASE_URL + "/compare", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getToken()
            },
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            // FIX: Explicitly update the DOM elements on the CURRENT page
            const result = data.comparisonResult;

            document.getElementById("summary").innerText = result.summary || "No summary provided.";
            document.getElementById("similarities").innerText = result.similarities || "No similarities found.";
            document.getElementById("differences").innerText = result.differences || "No differences found.";
            document.getElementById("missing").innerText = result.missingTopics || "No missing topics identified.";
            
            // Update global state for the AI Chat context
            currentHistoryId = data.historyId; 
            
            // Clear previous chat messages for the new comparison session
            document.getElementById("chat-box").innerHTML = "";

            // Refresh the history sidebar list
            if (typeof loadHistory === 'function') {
                loadHistory(); 
            }

            alert("Comparison successful!");
        } else {
            document.getElementById("summary").innerText = "";
            alert(data.msg || "Comparison failed");
        }
    } catch (err) {
        console.error("Frontend Error:", err);
        document.getElementById("summary").innerText = "Error occurred.";
        alert("An error occurred during comparison.");
    }
}