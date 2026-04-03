// File Location: frontend/scripts/compare.js

// Keep this global for Chat context
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
            alert("Comparison successful!");
            
            // 1. Show the hidden result card
            document.getElementById("result-card").style.display = "block";
            
            // 2. Refresh history and tell it to auto-click the newest one
            if (typeof loadHistory === 'function') {
                loadHistory(true); 
            }
        } else {
            alert(data.msg || "Comparison failed");
        }
    } catch (err) {
        console.error("Frontend Error:", err);
        alert("An error occurred during comparison.");
    }
}