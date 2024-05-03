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




// Gets the status of the server
async function getStatus() {
  try {
    const response = await doFetch("/status", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.error("Error fetching status:", error);
    // Add a user-friendly error message here
    alert("Error fetching status");
  }
}

// async function register() {
//   try {
//     const response = await doFetch("/auth/register", {
//       method: "POST",

//       body: JSON.stringify({
//         name: "oyvind",
//         email:"oeyrii01001@stud.noroff.no",
//         password: "norrocks123",
//       }),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });

//     console.log(response);
//   }
//   catch (error) {
//     console.error('Error registering:', error);
//     // Add a user-friendly error message here
//     alert('Error registering');
//   }
// };

//register();

async function login() {
  try {
    const response = await doFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "oeyrii01001@stud.noroff.no",
        password: "norrocks123",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    // Check if response contains accessToken
    if (response.data && response.data.accessToken) {
      const accessToken = response.data.accessToken;
      sessionStorage.setItem('accessToken', accessToken);
      console.log("Logged in successfully", response);
    } else {
      console.error("Error logging in: Access token not found in response");
      // Add a user-friendly error message here
      alert("Error logging in: Invalid response");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    // Add a user-friendly error message here
    alert("Error logging in");
  }
}

//login();

// Gets blog posts
async function getBlogPosts() {
  try {
    const response = await doFetch("/blog/posts/oyvind");
    console.log(response);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    // Add a user-friendly error message here
    alert("Error fetching blog posts");
  }
}

async function postBlogPost() {
  const storedToken = sessionStorage.getItem('accessToken');
  console.log('Stored Access Token:', storedToken);
  
  try {
    const response = await doFetch("/blog/posts/oyvind", {
      method: "POST",
      body: JSON.stringify({
        title: "4",
        body: "4",
        media: {
          url: "https://images.unsplash.com/photo-1711994872181-1e112e5e18e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
          type: "image/jpeg"
        }
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${storedToken}` // Add the access token to the Authorization header
      }
    });
    console.log(response);
  } catch (error) {
    console.error("Error posting blog post:", error);
    // Add a user-friendly error message here
    alert("Error posting blog post");
  }
}

async function updateBlogPost() {
  const storedToken = sessionStorage.getItem('accessToken');
  console.log('Stored Access Token:', storedToken);
  
  try {
    const response = await doFetch("/blog/posts/oyvind/5eb88f2b-5334-4167-8807-7f17534931d1", {
      method: "PUT",
      body: JSON.stringify({
        title: "My first EDITED blog post",
        body: "This is my first EDITED blog post. I hope you like it.",
        media: {
          url: "https://images.unsplash.com/photo-1711994872181-1e112e5e18e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
          type: "image/jpeg"
        }
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${storedToken}` // Add the access token to the Authorization header
      }
    });
    console.log(response);
  } catch (error) {
    console.error("Error updating blog post:", error);
    // Add a user-friendly error message here
    alert("Error updating blog post");
  }

}

async function deleteBlogPost() {
  const storedToken = sessionStorage.getItem('accessToken');
  console.log('Stored Access Token:', storedToken);
  
  try {
    const response = await doFetch("/blog/posts/oyvind/667f5c45-9fa8-4a74-8045-0b3030bfa534", {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${storedToken}` // Add the access token to the Authorization header
      }
    });
    console.log(response);
  } catch (error) {
    console.error("Error deleting blog post:", error);
    // Add a user-friendly error message here
    alert("Error deleting blog post");
  }
}

async function getIndividualBlogPost() {
  try {
    const response = await doFetch("/blog/posts/oyvind/667f5c45-9fa8-4a74-8045-0b3030bfa534");
    console.log(response);
  } catch (error) {
    console.error("Error fetching individual blog post:", error);
    // Add a user-friendly error message here
    alert("Error fetching individual blog post");
  }
}


async function getCarouselImages() {
  try {
    const response = await doFetch(`/blog/posts/oyvind?sort=created&limit=3`);
    console.log(response.data);
    const carouselImg = document.querySelector('.carouselImg');
    response.data.forEach((post) => {
      console.log(post.media);
      console.log(post.title);
      carouselImg.src = post.media.url;
      carouselImg.alt = post.media.alt;
    });
    
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    // Add a user-friendly error message here
    alert("Error fetching carousel images");
  }
}

//getCarouselImages();


