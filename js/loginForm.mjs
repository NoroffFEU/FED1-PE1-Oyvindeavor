// loginForm.js
import { login } from "./login.mjs";

function handleLoginFormSubmit(event) {
  event.preventDefault();
  login();
}

document.querySelector(".login-form").addEventListener("submit", handleLoginFormSubmit);

function emailInput() {
  return document.getElementById("email").value;
}
export { emailInput };

function passwordInput() {
  return document.getElementById("password").value;
}
export { passwordInput };
