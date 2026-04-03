let isLogin = true;

const toggleBtn = document.getElementById("toggle-btn");
const username = document.getElementById("username");
const title = document.getElementById("form-title");
const toggleText = document.querySelector(".toggle-text");

// Toggle Login/Register
toggleBtn.onclick = () => {
    isLogin = !isLogin;

    if (!isLogin) {
        username.classList.remove("hidden");
        title.innerText = "Register";
        toggleText.innerHTML = `Already have an account? <span id="toggle-btn">Login</span>`;
    } else {
        username.classList.add("hidden");
        title.innerText = "Login";
        toggleText.innerHTML = `Don't have an account? <span id="toggle-btn">Register</span>`;
    }

    // Re-bind event
    document.getElementById("toggle-btn").onclick = toggleBtn.onclick;
};

// Submit Form
document.getElementById("auth-form").onsubmit = async (e) => {
    e.preventDefault();

    const data = {
        username: username.value,
        email: email.value,
        password: password.value
    };

    const url = isLogin ? "/auth/login" : "/auth/register";

    try {
        const res = await fetch(BASE_URL + url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.token) {
            localStorage.setItem("token", result.token);
            window.location.href = "./dashboard.html";
        } else {
            alert(result.message || "Something went wrong");
        }

    } catch (err) {
        alert("Server error");
    }
};

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "./login.html";
}