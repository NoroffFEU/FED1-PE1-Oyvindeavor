import { doFetch } from "./utils/doFetch.mjs";
import { emailInput, passwordInput } from "./loginForm.mjs";

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
      storeUserName(response);
      storeBio(response);
      storeAvatar(response);

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

export { storeUserName };
export { login };

// This function stores the access token in the session storage
function storeAccessToken(response) {
  const accessToken = response.data.accessToken;
  sessionStorage.setItem("accessToken", accessToken);
  console.log("Logged in successfully", response.data);
}

function storeUserName(response) {
  const userName = response.data.name;
  sessionStorage.setItem("userName", userName);
  console.log("Name:", response.data.name);
}

function storeBio(response) {
  const bio = response.data.bio;
  sessionStorage.setItem("bio", bio);
  console.log("Bio: ", response.data.bio);
}

function storeAvatar(response) {
  const avatar = response.data.avatar;
  sessionStorage.setItem("avatar", avatar);
  console.log("Avatar:", response.data.avatar);
}
