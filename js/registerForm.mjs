
import { updateUI } from "./utils/updateUi.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";
import { apiUrl, blogName } from "./constants.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  hamburgerMenu();
  registerForm();
});


async function registerForm() {
  const bio = document.getElementById("bio");
  const profilePic = document.getElementById("profile-picture");
  const name = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submitButton = document.getElementById("registerbutton");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // Check each input for validity
    if (!name.checkValidity() || !email.checkValidity() || !password.checkValidity() || !bio.checkValidity() || !profilePic.checkValidity()) {
      // Directly report validity of each input field
      name.reportValidity();
      email.reportValidity();
      password.reportValidity();
      bio.reportValidity();
      profilePic.reportValidity();
      return;
    }

    try {
      // Send the registration data to the server
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          bio: bio.value,
          avatar: {
            url: profilePic.value,
            alt: name.value
          },
          password: password.value,
        }),
      });

      if (response.ok) {
        const successResponse = await response.json();
        alert(`Successfully created account for ${successResponse.data.name}`);
        window.location.href = "../dashboard/index.html";
      } else {
        const errorResponse = await response.json(); 
        const errorMessage = errorResponse.errors.map(error => error.message).join(", ");
        console.error("Error registering:", errorMessage);
        alert("Error registering: " + errorMessage);
      }
    } catch (error) {
        console.error("Network error:", error);
        alert("Network error: Please try again later.");
    }
  });
}