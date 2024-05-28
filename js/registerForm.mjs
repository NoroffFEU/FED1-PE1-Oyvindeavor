
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
      email.reportValidity();
      password.reportValidity();
      name.reportValidity();
      bio.reportValidity();
      profilePic.reportValidity();
      return;
    }

    try {
      // Send the registration data to the server
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          bio: bio.value,
          avatar: {
            url: profilePic.value,
            alt: name.value, 
          },
          password: password.value,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const sucessResponse = await response.json();
        alert(`Sucessfully created account: ${sucessResponse.data.name}`);
        window.location.href = "../dashboard/index.html";
        // window.location.href = "../dashboard/index.html";
      } else {
        const responseData = await response.json();
        console.error("Error registering:", responseData);
        alert("Error registering: " + responseData.message);
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering: " + error.message);
    }
  });
}



