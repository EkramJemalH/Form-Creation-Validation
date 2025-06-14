// 1. Get ALL necessary HTML elements by their IDs
const registrationForm = document.getElementById("registration-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Get references to the error message spans
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const formFeedback = document.getElementById("form-feedback"); // General feedback div

// 2. Helper functions for feedback messages and clearing errors

function clearErrorsAndFeedback() {
  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  formFeedback.textContent = ""; // Clear general feedback as well
  formFeedback.style.display = "none"; // Ensure feedback div is hidden
}

function showSuccessMessage(message) {
  formFeedback.textContent = message;
  formFeedback.style.color = "green";
  formFeedback.style.backgroundColor = "#e6ffe6"; // Light green background for success
  formFeedback.style.border = "1px solid green"; // Green border for success
  formFeedback.style.display = "block"; // Make it visible
}

function showErrorMessage(message) {
  formFeedback.textContent = message;
  formFeedback.style.color = "red";
  formFeedback.style.backgroundColor = "#ffbaba"; // Light red background for error
  formFeedback.style.border = "1px solid red"; // Red border for error
  formFeedback.style.display = "block"; // Make it visible
}

// 3. The dedicated validation function
function validateForm() {
  // Always clear previous errors and feedback at the start of validation
  clearErrorsAndFeedback();

  let isValid = true; // Overall form validity flag

  // --- Username Validation ---
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
    // Checks if the whole string can be converted to a number
    usernameError.textContent = "Username cannot be purely numeric.";
    isValid = false;
  }
  // --- Email Validation ---
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

  // --- Password Validation ---
  const passwordValue = passwordInput.value.trim();
  if (passwordValue === "") {
    passwordError.textContent = "Password is required.";
    isValid = false;
  } else if (passwordValue.length < 8) {
    // Changed min length to 8 as is common
    passwordError.textContent = "Password must be at least 8 characters long.";
    isValid = false;
  } else if (passwordValue.length > 25) {
    passwordError.textContent = "Password is too long (max 25 characters).";
    isValid = false;
  }
  // Optional: Add more advanced password checks here (e.g., must contain number, special char)
  // Example:
  // let hasNumber = /[0-9]/.test(passwordValue);
  // let hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(passwordValue);
  // if (!hasNumber || !hasSpecialChar) {
  //     passwordError.textContent += ' Must include a number and a special character.';
  //     isValid = false;
  // }

  return isValid; // Return the overall validity status
}

// 4. Attach the event listener to the form
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the browser's default form submission

  const formIsValid = validateForm(); // Call your main validation function

  if (formIsValid) {
    showSuccessMessage("Registration successful!");
    registrationForm.reset(); // Clear fields on successful submission
  } else {
    showErrorMessage("Please correct the errors in the form."); // General error message if any field failed
  }
});
