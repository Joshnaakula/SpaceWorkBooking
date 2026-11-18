
const signupForm = document.getElementById("signupForm");
const errorMessage = document.getElementById("errorMessage");

// Show or hide passwords
const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const targetId = button.dataset.target;
        const passwordInput = document.getElementById(targetId);

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            button.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            button.textContent = "Show";
        }
    });
});

// Signup form validation
signupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    errorMessage.textContent = "";

    if (password.length < 8) {
        errorMessage.textContent =
            "Password must contain at least 8 characters.";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
    }

    // Demo only: store signup data in browser LocalStorage
    const user = {
    name: name,
    email: email,
    phone: phone,
    password: password
};

    localStorage.setItem("spacebookUser", JSON.stringify(user));

    alert("Account created successfully!");

    window.location.href = "login.html";
});
