document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  const formFeedback = document.getElementById("form-feedback");
  function clearFeedback() {
    formFeedback.textContent = "";
    formFeedback.style.display = "none";
    formFeedback.style.backgroundColor = "";
    formFeedback.style.border = "";

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
    formFeedback.textContent = message;
    formFeedback.style.color = "green";
    formFeedback.style.backgroundColor = "#e6ffe6";
    formFeedback.style.border = "1px solid green";
    formFeedback.style.display = "block";
  }

  function showErrorMessage(message) {
    formFeedback.textContent = message;
    formFeedback.style.color = "red";
    formFeedback.style.backgroundColor = "#ffbaba";
    formFeedback.style.border = "1px solid red";
    formFeedback.style.display = "block";
  }

  function validateForm() {
    clearFeedback();

    let isValid = true;

    const usernameValue = usernameInput.value.trim();
    if (usernameValue === "") {
      usernameError.textContent = "Username is required.";
      isValid = false;
    } else if (usernameValue.length < 3) {
      usernameError.textContent = "Username must be at least 3 characters.";
      isValid = false;
    } else if (usernameValue.length > 20) {
      usernameError.textContent = "Username cannot exceed 20 characters.";
      isValid = false;
    } else if (!isNaN(Number(usernameValue))) {
      usernameError.textContent = "Username cannot be purely numeric.";
      isValid = false;
    }
    const emailValue = emailInput.value.trim();
    if (emailValue === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
      emailError.textContent =
        "Please enter a valid email address (missing @ or .).";
      isValid = false;
    } else if (
      emailValue.indexOf("@") === 0 ||
      emailValue.indexOf(".") === emailValue.length - 1 ||
      emailValue.indexOf("@") > emailValue.lastIndexOf(".")
    ) {
      emailError.textContent = "Invalid email format (position of @ or .).";
      isValid = false;
    }
    const passwordValue = passwordInput.value.trim();
    if (passwordValue === "") {
      passwordError.textContent = "Password is required.";
      isValid = false;
    } else if (passwordValue.length < 8) {
      passwordError.textContent =
        "Password must be at least 8 characters long.";
      isValid = false;
    } else if (passwordValue.length > 25) {
      passwordError.textContent = "Password is too long (max 25 characters).";
      isValid = false;
    }
    return isValid;
  }
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formIsValid = validateForm();

    if (formIsValid) {
      showSuccessMessage("Registration successful!");
      registrationForm.reset();
    } else {
      showErrorMessage("Please correct the errors in the form.");
    }
  });
});
