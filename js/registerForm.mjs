import { doFetch } from "./utils/doFetch.mjs";
import { updateUI } from "./utils/updateUi.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  hamburgerMenu();
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
    if (!name.checkValidity() || !email.checkValidity() || !password.checkValidity() || !bio.checkValidity() || !profilePic.checkValidity() ){
      email.reportValidity(); 
      password.reportValidity();
      name.reportValidity(); 
      bio.reportValidity(); 
      profilePic.reportValidity(); 
      return; 
    }

    try {

      // Send the registration data to the server
      const response = await doFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
          bio: bio.value,
          avatar: {
            url: profilePic.value,
            alt: name.value,
          }
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        window.location.href = "../dashboard/index.html";
      }
      else {
        console.error("Error registering:",);
        alert("Error registering");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering");
    }

  });
}

registerForm();




function profilePicPreview() {
  const profilePic = document.getElementById("profile-picture");
  const profilePicPreview = document.getElementById("profile-picture-preview");

  profilePic.addEventListener("input", () => {
    if (!profilePic.value) {
      profilePicPreview.style.display = "none";
      return;
    }
    profilePicPreview.src = profilePic.value;
    profilePicPreview.style.display = "block";
  });
}

profilePicPreview();
