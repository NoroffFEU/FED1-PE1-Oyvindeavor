import { nextSlide, prevSlide } from "./components/carousel.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { updateUI } from "./utils/updateUi.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";
import { formatDate } from "./utils/formatDate.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  /* Add event listeners to the hero carousel buttons */
  document.querySelector(".carousel-next-btn").addEventListener("click", nextSlide);
  document.querySelector(".carousel-prev-btn").addEventListener("click", prevSlide);

  // Show spinner initially if not already shown
  document.querySelector(".spinner-container").style.display = "block";

  try {
    await updateCarouselContents();
    updateUI();
    await createLinksBlog();
    await initUpdateGridItems();
    hamburgerMenu();
    searchPosts();
  } catch (error) {
    console.error("Error during initial setup:", error);
  } finally {
    hideSpinner();
  }
});

function hideSpinner() {
  document.querySelector(".spinner-container").style.display = "none";
}

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
  const spinner = document.querySelector(".spinner-container");

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
    spinner.style.display = "none";
  } catch (error) {
    console.error("Error displaying latest posts:", error);
  }
}

async function getGridItemsHome() {
  try {
    const response = await doFetch(`/blog/posts/oyvind?limit=15&page=1`);
    const filterPosts = response.data.slice(3, 15); // slice for the first 3 posts so the carousel is not included in the grid
    return filterPosts;
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
    image.alt = post.media.alt;
    image.loading = "lazy";

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
    hideSpinner();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}

function searchPosts() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // If the user deletes the search input, show the original grid items again
  searchInput.addEventListener("input", async () => {
    if (searchInput.value === "") {
      const startPageGrid = await getGridItemsHome();
      updateGridItems(startPageGrid);
    }
  });

  const performSearch = async () => {
    // If the user clicks search with no value do nothing
    if (searchInput.value === "") {
      return;
    }

    const searchValue = searchInput.value;
    console.log("searchValue", searchValue);
    const response = await doFetch(`/blog/posts/oyvind?limit=15`);
    const searchResults = response.data.filter((post) => {
      return post.title.toLowerCase().startsWith(searchValue.toLowerCase());
    });
    console.log(response);
    updateGridItems(searchResults);
  };

  // On click do the search
  searchButton.addEventListener("click", performSearch);

  // If the user presses enter do the search
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}
async function sortByOldest() {
  try {
    const response = await getGridItemsHome();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
