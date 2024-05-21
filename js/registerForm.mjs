import { doFetch } from "./utils/doFetch.mjs";
import { updateUI } from "./utils/updateUi.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  profilePicPreview(); // listen for changes to the profile picture input
  registerForm(); // listen for submit button click
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
      const response = await doFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
          bio: bio.value,
          avatar: {
            url: profilePic.value,
          },
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering");
    }
  });
}

function profilePicPreview() {
  const profilePic = document.getElementById("profile-picture");
  const profilePicPreview = document.getElementById("profile-picture-preview");

  profilePic.addEventListener("input", () => {
    profilePicPreview.src = profilePic.value;
  });
}
