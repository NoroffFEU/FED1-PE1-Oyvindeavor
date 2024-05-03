import { nextSlide, prevSlide } from "./components/carousel.mjs";
import { doFetch } from "./utils/doFetch.mjs";

// Name: oyvind
// Email: oeyrii01001@stud.noroff.no
// password: norrocks123

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  /* Add event listeners to the hero carousel buttons */
  document.querySelector(".carousel-next-btn").addEventListener("click", nextSlide);
  document.querySelector(".carousel-prev-btn").addEventListener("click", prevSlide);
});

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
        title: "My first blog post",
        body: "This is my first blog post. I hope you like it.",
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




