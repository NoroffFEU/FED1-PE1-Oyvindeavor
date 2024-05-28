import { doFetch } from "./utils/doFetch.mjs";
import { emailInput, passwordInput } from "./loginForm.mjs";
import { storeUserInfo } from "./utils/storeUserInfo.mjs";
import { updateUI } from "./utils/updateUi.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";
import { apiUrl } from "./constants.mjs";


document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  hamburgerMenu();
});

async function login() {
  try {
    // Gets the email and password from the input fields
    const email = emailInput();
    const password = passwordInput();

    const response = await doFetch(`${apiUrl}/auth/login`, {
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
      storeUserInfo(response);

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

// This function stores the access token in the session storage
// function storeAccessToken(response) {
//   const accessToken = response.data.accessToken;
//   sessionStorage.setItem("accessToken", accessToken);
// }

// function storeBio(response) {
//   const bio = response.data.bio;
//   sessionStorage.setItem("bio", bio);
// }

// function storeAvatar(response) {
//   const avatar = response.data.avatar.url;
//   const avatarAlt = response.data.avatar.alt;
//   sessionStorage.setItem("avatar", avatar);
//   sessionStorage.setItem("avatarAlt", avatarAlt);

// }
