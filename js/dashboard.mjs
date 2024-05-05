import { clearAccessToken } from "./utils/clearAccessToken.mjs";
import { redirectHome } from "./utils/redirectHome.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const logOutButton = document.querySelector(".logout-btn");
  displayUsername();
  // event listener to the logout button
  logOutButton.addEventListener("click", () => {
    clearAccessToken();
    redirectHome();
  });
});

function displayUsername() {
  const username = sessionStorage.getItem("userName");
  const usernameElement = document.querySelector(".userName");
  usernameElement.textContent = `Welcome back ${username}`;
}

function displayAvatar() {
  let avatar = sessionStorage.getItem("avatar");
  const avatarElement = document.querySelector("#profile-picture");
  if (avatar === null) {
    avatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"; // Add a default avatar here later !!
  } else {
    avatar = sessionStorage.getItem("avatar");
    avatarElement.src = avatar;
  }
}

displayAvatar();
