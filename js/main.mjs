import { nextSlide, prevSlide } from "./components/carousel.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { updateUI } from "./utils/updateUi.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";
import { formatDate } from "./utils/formatDate.mjs";

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  /* Add event listeners to the hero carousel buttons */
  document.querySelector(".carousel-next-btn").addEventListener("click", nextSlide);
  document.querySelector(".carousel-prev-btn").addEventListener("click", prevSlide);

  updateUI();
  updateCarouselContents();
  createLinksBlog();
  initUpdateGridItems();
  hamburgerMenu();
});

// Gets the last 3 posts created from the blog
async function getThreeLatestPosts() {
  try {
    const response = await doFetch("/blog/posts/oyvind?sortOrder=desc&limit=3");
    console.log(response);

    if (response.data.length === 0) {
      console.log("No posts available");
      return []; // Return an empty array if no posts are available
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

async function createLinksBlog() {
  try {
    const carouselLinks = document.querySelectorAll(".carousel-item a");
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
    console.error("Error creating blog links:", error);
  }
}

async function updateCarouselContents() {
  const carouselImages = document.querySelectorAll(".carouselImg");
  const carouselTitles = document.querySelectorAll(".carousel-text h1, h2");

  try {
    const blogPosts = await getThreeLatestPosts();
    console.log("logging", blogPosts);

    let index = 0;
    for (const post of blogPosts) {
      if (index < blogPosts.length) {
        carouselImages[index].src = post.media.url;
        carouselImages[index].alt = post.media.alt;
        carouselTitles[index].textContent = post.title;
      }
      index++;
    }
  } catch (error) {
    console.error("Error displaying latest posts:", error);
  }
}

async function getGridItemsHome() {
  try {
    const response = await doFetch("/blog/posts/oyvind?limit=15&page=1");
    const filterPosts = response.data.slice(3, 15); // slice for the first 3 posts so they are not included in the grid
    return filterPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function FetchPageFromUrl() {
  const url = new URL(window.location.href);
  const page = url.searchParams.get("page");
  console.log("getting page from url", page);
  return page;
}

async function getTotalPages() {
  try {
    const response = await doFetch("/blog/posts/oyvind");
    console.log(response.meta.pageCount);
    return response.meta.pageCount;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function updateGridItems(posts) {
  const container = document.querySelector(".grid-container");

  // Remove all existing children from the container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  posts.forEach((post) => {
    const gridItem = document.createElement("a");
    gridItem.href = `/blogpost.html?id=${post.id}`;
    gridItem.className = "grid-item";

    const image = document.createElement("img");
    image.src = post.media.url;
    image.alt = "Blog Image";

    const gridText = document.createElement("div");
    gridText.className = "grid-text";

    const titleLink = document.createElement("a");
    titleLink.href = `/blogpost.html?id=${post.id}`;

    const title = document.createElement("h2");
    title.textContent = post.title;
    titleLink.appendChild(title);

    const publishedDate = document.createElement("span");
    publishedDate.className = "label-text";
    publishedDate.textContent = `Published: ${formatDate(post.created)}`;

    const category = document.createElement("span");
    category.className = "label-text";
    category.textContent = `${post.tags[0]}`;

    gridText.appendChild(titleLink);
    gridText.appendChild(publishedDate);

    gridText.appendChild(category);

    gridItem.appendChild(image);
    gridItem.appendChild(gridText);

    container.appendChild(gridItem);
  });
}

async function initUpdateGridItems() {
  try {
    const posts = await getGridItemsHome();
    await updateGridItems(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}
