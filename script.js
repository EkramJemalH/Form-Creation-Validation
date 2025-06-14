document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  const feedbackDiv = document.getElementById("form-feedback");
  function clearFeedback() {
    feedbackDiv.textContent = "";
    feedbackDiv.style.display = "none";
    feedbackDiv.style.backgroundColor = "";
    feedbackDiv.style.border = "";

    // Also clear individual input error styles if they were applied
    usernameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");

    // Clear individual error message spans (though we're consolidating messages, good to reset)
    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
  }

  function showSuccessMessage(message) {
    feedbackDiv.textContent = message;
    feedbackDiv.style.color = "#28a745";
    feedbackDiv.style.backgroundColor = "#e6ffe6";
    feedbackDiv.style.border = "1px solid #28a745";
    feedbackDiv.style.display = "block";
  }

  function showErrorMessage(messages) {
    feedbackDiv.innerHTML = messages.join("<br>");
    feedbackDiv.style.color = "#dc3545";
    feedbackDiv.style.backgroundColor = "#ffbaba";
    feedbackDiv.style.border = "1px solid #dc3545";
    feedbackDiv.style.display = "block";
  }

  function validateForm() {
    clearFeedback();
    let isValid = true;
    let messages = [];
    const username = usernameInput.value.trim();
    if (username === "") {
      messages.push("Username is required.");
      usernameInput.classList.add("input-error");
      isValid = false;
    } else if (username.length < 3) {
      messages.push("Username must be at least 3 characters.");
      usernameInput.classList.add("input-error");
      isValid = false;
    } else if (username.length > 20) {
      messages.push("Username cannot exceed 20 characters.");
      usernameInput.classList.add("input-error");
      isValid = false;
    } else if (!isNaN(Number(username)) && username !== "") {
      messages.push("Username cannot be purely numeric.");
      usernameInput.classList.add("input-error");
      isValid = false;
    }
    const email = emailInput.value.trim();
    if (email === "") {
      messages.push("Email is required.");
      emailInput.classList.add("input-error");
      isValid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
      messages.push("Please enter a valid email address (missing @ or .).");
      emailInput.classList.add("input-error");
      isValid = false;
    } else if (
      email.indexOf("@") === 0 ||
      email.indexOf(".") === email.length - 1 ||
      email.indexOf("@") > email.lastIndexOf(".")
    ) {
      messages.push("Invalid email format (position of @ or .).");
      emailInput.classList.add("input-error");
      isValid = false;
    }
    const password = passwordInput.value.trim();
    if (password === "") {
      messages.push("Password is required.");
      passwordInput.classList.add("input-error");
      isValid = false;
    } else if (password.length < 8) {
      messages.push("Password must be at least 8 characters long.");
      passwordInput.classList.add("input-error");
      isValid = false;
    } else if (password.length > 25) {
      messages.push("Password is too long (max 25 characters).");
      passwordInput.classList.add("input-error");
      isValid = false;
    }

    return { messages, isValid };
  }
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const { messages, isValid } = validateForm();

    if (isValid) {
      showSuccessMessage("Registration successful!");
      registrationForm.reset();
    } else {
      showErrorMessage(messages);
    }
  });
});
