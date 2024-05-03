import { clearAccessToken } from "./utils/clearAccessToken.mjs";
import { doFetch } from "./utils/doFetch.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const logOutButton = document.querySelector(".logout-btn");
  // event listener to the logout button
  logOutButton.addEventListener("click", () => {
    clearAccessToken();
    redirectHome();
  });
});

function redirectHome() {
  window.location.href = "../index.html";
}

function displayUsername() {
  const username = sessionStorage.getItem("userName");
  const usernameElement = document.querySelector(".userName");
  usernameElement.textContent = `Welcome back ${username}`;
}

displayUsername();

function displayAvatar() {
  const avatar = sessionStorage.getItem("avatar");
  const avatarElement = document.querySelector(".avatar");
  avatarElement.src = avatar;
}

displayAvatar();
