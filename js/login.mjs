import { doFetch } from "./utils/doFetch.mjs";

async function login() {
    try {
        // Gets the email and password from the input fields
        const email = emailInput();
        const password = passwordInput();
        
        const response = await doFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // Check if response contains accessToken
      if (response.data && response.data.accessToken) {
        storeAccessToken(response);

        // Redirect to the Dashboard page here!
        window.location.href = "../dashboard/index.html";
      } else {
        console.error("Invalid email or password, access token not found");
        // Add a user-friendly error message here
        alert("Error logging in: Invalid response");
      }
    } catch (error) {
      console.error("Invalid email or password:", error);
      // Add a user-friendly error message here
      alert("Invalid email or password");
    }
  }

  export { login };

function emailInput() {
  return document.getElementById('email').value;
}

function passwordInput() {
  return document.getElementById('password').value;
}

console.log(emailInput()), console.log(passwordInput());
console.log(passwordInput( ));



// This function stores the access token in the session storage
function storeAccessToken(response) {
  const accessToken = response.data.accessToken;
  sessionStorage.setItem('accessToken', accessToken);
  console.log("Logged in successfully", response);
}

// This clears the access token from the session storage use this when logging out
function clearAccessToken() {
  sessionStorage.removeItem('accessToken');
}