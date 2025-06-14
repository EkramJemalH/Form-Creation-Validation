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
    feedbackDiv.style.color = "green";
    feedbackDiv.style.backgroundColor = "#e6ffe6";
    feedbackDiv.style.border = "1px solid green";
    feedbackDiv.style.display = "block";
  }

  function showErrorMessage(message) {
    feedbackDiv.innerHTML = message.join("<br>");
    feedbackDiv.style.color = "#dc3545";
    feedbackDiv.style.backgroundColor = "#ffbaba";
    feedbackDiv.style.border = "1px solid #dc3545";
    feedbackDiv.style.display = "block";
  }

  function validateForm() {
    clearFeedback();
    let isValid = true;
    let messages = [];
    const usernameValue = usernameInput.value.trim();
    if (usernameValue === "") {
      messages.push("Username is required.");
      usernameInput.classList.add("input-error");
      isValid = false;
    } else if (usernameValue.length < 3) {
      messages.push("Username must be at least 3 characters.");
      usernameInput.classList.add("input-error");
      isValid = false;
    } else if (usernameValue.length > 20) {
      messages.push("Username cannot exceed 20 characters.");
      usernameInput.classList.add("input-error");
      isValid = false;
    } else if (!isNaN(Number(usernameValue)) && usernameValue !== "") {
      messages.push("Username cannot be purely numeric.");
      usernameInput.classList.add("input-error");
      isValid = false;
    }
    const emailValue = emailInput.value.trim();
    if (emailValue === "") {
      messages.push("Email is required.");
      emailInput.classList.add("input-error");
      isValid = false;
    } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
      messages.push("Please enter a valid email address (missing @ or .).");
      emailInput.classList.add("input-error");
      isValid = false;
    } else if (
      emailValue.indexOf("@") === 0 ||
      emailValue.indexOf(".") === emailValue.length - 1 ||
      emailValue.indexOf("@") > emailValue.lastIndexOf(".")
    ) {
      messages.push("Invalid email format (position of @ or .).");
      emailInput.classList.add("input-error");
      isValid = false;
    }
    const passwordValue = passwordInput.value.trim();
    if (passwordValue === "") {
      messages.push("Password is required.");
      passwordInput.classList.add("input-error");
      isValid = false;
    } else if (passwordValue.length < 8) {
      messages.push("Password must be at least 8 characters long.");
      passwordInput.classList.add("input-error");
      isValid = false;
    } else if (passwordValue.length > 25) {
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
