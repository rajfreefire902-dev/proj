const BASE_URL = "http://localhost:5000/api";

// Get token
function getToken() {
    return localStorage.getItem("token");
}

// Common headers (for JSON requests)
function getHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
    };
}