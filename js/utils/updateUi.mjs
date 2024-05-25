import { clearAccessToken } from "./clearAccessToken.mjs";
import { redirectHome } from "./redirectHome.mjs";
import { hasAccessToken } from "./hasAccessToken.mjs";
import { displayAvatar } from "./displayAvatar.mjs";

function updateUI() {
  if (hasAccessToken()) {
    // Checks to see if the access token is stored (if it is do the following)
    console.log("Access token is stored");
    displayAvatar();
    hideLoginButton();
    showLogoutButton();
    addRedirectToAvatar(); // Adds an href to the anchor element and redirects to the dashboard
  } else {
    // If the access token is not stored (do the following)
    console.log("No access token stored");
    showLoginButton();
    hideLogoutButton();
  }
}
export { updateUI };

function hideLoginButton() {
  const loginButton = document.querySelector(".login-btn");
  loginButton.style.display = "none";
}

function showLoginButton() {
  const loginButton = document.querySelector(".login-btn");
  loginButton.style.display = "block";
}

function showLogoutButton() {
  const logoutButton = document.querySelector(".logout-btn");
  logoutButton.style.display = "block";

  logoutButton.addEventListener("click", () => {
    clearAccessToken();
    redirectHome();
  });
}

function hideLogoutButton() {
  const logoutButton = document.querySelector(".logout-btn");
  logoutButton.style.display = "none";
}

function changeHamburgerLoginButton() {
  const hamburgerLoginButton = document.querySelector("#login-hamburger");
  hamburgerLoginButton.style.textContent = "Logout";
  hamburgerLoginButton.style.href = "../index.html";
  clearAccessToken();
}

function createDashboardHamburgerLink() {
  const navigationContainer = document.querySelector(".navigation");
  const dashboardLink = document.createElement("a");
  dashboardLink.textContent = "Dashboard";
  dashboardLink.href = "../dashboard/index.html";
  navigationContainer.appendChild(dashboardLink);
}

// Adds a redirect to the dashboard when clicked on profile picture in the header
function addRedirectToAvatar() {
  const profilePictureAnchor = document.querySelector(".profile-picture-anchor");
  profilePictureAnchor.addEventListener("click", () => {
    window.location.href = "../dashboard/index.html";
  });
}
