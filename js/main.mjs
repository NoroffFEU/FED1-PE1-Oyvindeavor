import { nextSlide, prevSlide } from "./components/carousel.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { hasAccessToken } from "./utils/hasAccessToken.mjs";

// Name: oyvind
// Email: oeyrii01001@stud.noroff.no
// password: norrocks123

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  /* Add event listeners to the hero carousel buttons */
  document.querySelector(".carousel-next-btn").addEventListener("click", nextSlide);
  document.querySelector(".carousel-prev-btn").addEventListener("click", prevSlide);

  updateUI();
});

// Event listener if access token is stored

// Checks to see if the access token is stored
// If it is hide login button and create profile elements (profile picture, anchor element and logout button)
function updateUI() {
  if (hasAccessToken()) {
    console.log("Acess token is stored");
    hideLoginButton();
    createProfileElements();
  } else {
    console.log("No access token stored");
  }
}

function hideLoginButton() {
  const loginButton = document.querySelector(".login-btn");
  loginButton.style.display = "none";
}

function createProfileElements() {
  // Create the image element
  const profilePicture = document.createElement("img");

  // Set the src attribute for the image
  profilePicture.src = "";

  // Create the anchor element
  const anchorElement = document.createElement("a");

  // Set the href attribute for the anchor element
  anchorElement.href = "/dashboard/index.html";

  // Append the image element to the anchor element
  anchorElement.appendChild(profilePicture);

  // Create logoutButton
  const logoutButton = document.createElement("button");

  logoutButton.textContent = "Log out";

  logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("accessToken");
    window.location.href = "/";
  });

  // Append the anchor element to a parent container
  const account = document.querySelector(".account");
  const profileInfo = document.querySelector(".profile-info");

  profileInfo.appendChild(anchorElement);
  profileInfo.appendChild(logoutButton);
  account.appendChild(profileInfo);
}

// Gets the last 3 posts created from the blog
async function getThreeLatestPosts() {
  try {
    const response = await doFetch("/blog/posts/oyvind?sortOrder=desc&limit=3");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

getThreeLatestPosts();
