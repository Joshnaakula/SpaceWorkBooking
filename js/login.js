
const loginForm = document.getElementById("loginForm");

const errorMessage = document.getElementById("errorMessage");

// Show or hide password
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function() {

    const passwordInput = document.getElementById("password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }

});

// Login form submission
loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    errorMessage.textContent = "";

    // Get registered user from LocalStorage
    const storedUser = localStorage.getItem("spacebookUser");

    if (storedUser === null) {
        errorMessage.textContent =
            "No account found. Please sign up first.";
        return;
    }

    const user = JSON.parse(storedUser);

    // Check email and password
    if (email === user.email && password === user.password) {

        alert("Login successful! Welcome to SpaceBook.");

        window.location.href = "explore.html";

    } else {

        errorMessage.textContent =
            "Invalid email or password. Please try again.";

    }

});
