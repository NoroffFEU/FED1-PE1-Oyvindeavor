// loginForm.js
import { login } from './login.mjs';

function handleLoginFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Call the login function
    login();
}

// Attach event listener to the form
document.querySelector('.login-form').addEventListener('submit', handleLoginFormSubmit);