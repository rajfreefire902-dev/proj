// Ensure this variable is at the top of the file
let currentHistoryId = null;

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
        const res = await fetch(BASE_URL + "/compare", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getToken()
            },
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            // 1. UPDATE UI: This is the part that was likely missing or failing
            // We access the 'comparisonResult' object sent by your controller
            const result = data.comparisonResult;

            document.getElementById("summary").innerText = result.summary || "N/A";
            document.getElementById("similarities").innerText = result.similarities || "N/A";
            document.getElementById("differences").innerText = result.differences || "N/A";
            document.getElementById("missing").innerText = result.missingTopics || "N/A";
            
            // 2. Update state for Chat
            currentHistoryId = data.historyId; 
            
            // 3. Refresh the history sidebar
            if (typeof loadHistory === 'function') {
                loadHistory(); 
            }

            alert("Comparison successful!");
        } else {
            alert(data.msg || "Comparison failed");
        }
    } catch (err) {
        console.error("Frontend Error:", err);
        alert("An error occurred during comparison.");
    }
}