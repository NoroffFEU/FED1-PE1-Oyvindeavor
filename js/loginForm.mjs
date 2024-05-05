// loginForm.js
import { login } from "./login.mjs";

function handleLoginFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  // Call the login function
  login();
}

// Attach event listener to the form
document.querySelector(".login-form").addEventListener("submit", handleLoginFormSubmit);

// Reads the value of the email input field
function emailInput() {
  return document.getElementById("email").value;
}
export { emailInput };

// Reads the value of the password input field
function passwordInput() {
  return document.getElementById("password").value;
}
export { passwordInput };
