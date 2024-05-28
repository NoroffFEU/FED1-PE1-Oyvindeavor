// This file contains functions that update the UI based on whether the user is logged in or not 
// and also contains functions that show and hide elements on the page based on the user's login status.

import { clearAccessToken } from "./clearAccessToken.mjs";
import { redirectHome } from "./redirectHome.mjs";
import { hasAccessToken } from "./hasAccessToken.mjs";
import { displayAvatar } from "./displayAvatar.mjs";

function updateUI() {
  if (hasAccessToken()) {
    // Checks to see if the access token is stored (if it is do the following)

    hideLoginButtonHamburger();
    displayAvatar();
    changeLogInButton();
    handleLogoutEvent();
    addRedirectToAvatar(); // Adds an href to the anchor element and redirects to the dashboard when clicked
  } else {
    hideAdminButtonsHamburger();
    // If the access token is not stored (do the following)


  }
}
export { updateUI };

function changeLogInButton() {
  const loginButton = document.querySelector(".login-btn");
  loginButton.textContent = "Logout";
  loginButton.href = "../index.html";
  loginButton.addEventListener("click", () => {
    clearAccessToken();
    redirectHome();
  }
  );
}


function handleLogoutEvent() {
  const logoutButton = document.querySelector(".login-btn");

  logoutButton.addEventListener("click", () => {
    clearAccessToken();
    redirectHome();
  });
}

function hideLoginButtonHamburger() {
  const logoutButton = document.querySelector("#logout-hamburger");
  const dashboardButton = document.querySelector("#dashboard-hamburger");

  const loginButton = document.querySelector("#login-hamburger");
  loginButton.style.display = "none";
  logoutButton.style.display = "block";
  dashboardButton.style.display = "block";

  logoutButton.addEventListener("click", () => {
    clearAccessToken();
    redirectHome();
  });
}

function hideAdminButtonsHamburger() {
  const logoutButton = document.querySelector("#logout-hamburger");
  const dashboardButton = document.querySelector("#dashboard-hamburger");

  logoutButton.style.display = "none";
  dashboardButton.style.display = "none";

}

// Adds a redirect to the dashboard when clicked on profile picture in the header
function addRedirectToAvatar() {
  const profilePictureAnchor = document.querySelector(".profile-picture-anchor");
  profilePictureAnchor.addEventListener("click", () => {
    window.location.href = "../dashboard/index.html";
  });
}
