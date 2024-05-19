import { nextSlide, prevSlide } from "./components/carousel.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { updateUI } from "./utils/updateUi.mjs";

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



// Gets the last 3 posts created from the blog
async function getThreeLatestPosts() {
  try {
    const response = await doFetch("/blog/posts/oyvind?sortOrder=desc&limit=3");
    console.log(response);

    if (response.data.length === 0) {
      console.log('No posts available');
      return []; // Return an empty array if no posts are available
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}


// Get the data
// Target all anchor tags
// Loop through the data and display the data in the carousel 
// construct id to url to display the blog post

async function createLinksBlog() {
  try {
    const carouselLinks = document.querySelectorAll('.carousel-item a');
    const blogPosts = await getThreeLatestPosts();
    console.log(blogPosts);

    // Loop through carousel links and blog posts simultaneously
    carouselLinks.forEach((link, index) => {
      // Check if there are enough blog posts for the current index
      if (index < blogPosts.length) {
        const postId = blogPosts[index].id; // Get the ID of the corresponding blog post
        link.href = `/blogpost.html?id=${postId}`; // Set href attribute with the ID
      } else {
        console.error(`No blog post found for carousel link at index ${index}.`);
      }
    });
  } catch (error) {
    console.error('Error creating blog links:', error);
  }
}

createLinksBlog();



async function updateCarouselContents() {
  const carouselImages = document.querySelectorAll('.carouselImg');
  const carouselTitles = document.querySelectorAll('.carousel-text h1, h2');
  const carouselDescriptions = document.querySelectorAll('.carousel-text p');

  try {
    const blogPosts = await getThreeLatestPosts();
    console.log("logging", blogPosts);

    let index = 0;
    for (const post of blogPosts) {
      if (index < blogPosts.length) {
        carouselImages[index].src = post.media.url;
        carouselTitles[index].textContent = post.title;
        carouselDescriptions[index].textContent = post.body;
      }
      index++;
    }
  } catch (error) {
    console.error('Error displaying latest posts:', error);
  }
}





updateCarouselContents();

// Get the 3 next latest posts after the 3 first posts
// const response = await doFetch("/blog/posts/oyvind?sortOrder=desc&limit=3");

async function getThreeNextPosts() {
  try {
    const response = await doFetch("/blog/posts/oyvind?sortOrder=desc&limit=6");
    const filterPosts = response.data.slice(2, 5);
    console.log("logging 3 next posts", filterPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

getThreeNextPosts();