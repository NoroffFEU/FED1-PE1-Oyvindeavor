import { doFetch } from "./utils/doFetch.mjs";
import { updateUI } from "./utils/updateUi.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";

document.addEventListener("DOMContentLoaded", () => {
  clearForm();
  updateUI();
  registerForm();
  hamburgerMenu();
});

function registerForm() {
  const bio = document.getElementById("bio");
  const profilePic = document.getElementById("profile-picture");
  const name = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submitButton = document.getElementById("registerbutton");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const avatar = profilePic.value ? { url: profilePic.value } : null;
      const requestBody = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      if (bio.value) {
        requestBody.bio = bio.value;
      }

      if (avatar) {
        requestBody.avatar = avatar;
      }

      const response = await doFetch("/auth/register/", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("User registered successfully");
        window.location.href = `../dashboard/index.html`;
      } else {
        console.error("Error registering:", response.errors[0].message);
        alert("Error registering: " + response.errors[0].message);
      }
    } catch (error) {
      console.error("Error registering:", error.message);
      alert("Error registering: " + error.message);
    }
  });
}

function nameInputValidation() {
  const name = document.getElementById("username");
  const nameError = document.getElementById("username-error");

  name.addEventListener("input", () => {
    // Regular expression for valid characters
    const validNamePattern = /^[a-zA-Z0-9_]+$/;

    if (!name.value) {
      nameError.textContent = "Name is required";
      nameError.style.display = "block";
    } else if (!validNamePattern.test(name.value)) {
      nameError.textContent = "Name can only include letters, numbers, and underscores";
      nameError.style.display = "block";
    } else {
      nameError.textContent = "";
      nameError.style.display = "none";
    }
  });
}


function clearForm() {
  document.getElementById("bio").value = "";
  document.getElementById("profile-picture").value = "";
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

nameInputValidation();

// Profile pic preview so the user can see the image they input before sending the form
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
