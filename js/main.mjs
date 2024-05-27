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
    await updateCarousel();
    updateUI();

    await initUpdateGridItems();
    hamburgerMenu();
    searchPosts();
  } catch (error) {
    console.error("Error during initial setup:", error);
  } finally {
    hideSpinner();
  }
});

// Quick fix for the select elements not resetting on page reload or revisit
// Had an issue where the select elements would not reset to their first option and the blogposts would not update accordingly
// https://stackoverflow.com/questions/50082801/how-to-reload-page-when-select-box-selected
window.onload = function() {
  // Reset each select element to its first option
  const selects = document.querySelectorAll('select');
  selects.forEach(select => {
      select.selectedIndex = 0;
  });
};


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

async function updateCarousel() {
  try {
    // Fetch the latest posts
    const blogPosts = await getThreeLatestPosts();
    console.log("Latest blog posts fetched:", blogPosts);

    // Select carousel elements
    const carouselLinks = document.querySelectorAll(".carousel-item a");
    const carouselImages = document.querySelectorAll(".carouselImg");
    const carouselTitles = document.querySelectorAll(".carousel-text h1, .carousel-text h2");

    blogPosts.forEach((post, index) => {
      // Check if the carousel elements exist for the current index
      if (carouselLinks[index] && carouselImages[index] && carouselTitles[index]) {
        // Update the link with the blog post ID
        carouselLinks[index].href = `/blogpost.html?id=${post.id}`;

        // Update the image source and alt text
        carouselImages[index].src = post.media.url;
        carouselImages[index].alt = post.media.alt || 'Blog post image';  // Provide default alt text if none exists

        // Update the carousel title
        carouselTitles[index].textContent = post.title;
      } else {
        console.error(`No carousel element found for index ${index}.`);
      }
    });

    // Handle cases where there are fewer posts than carousel elements
    for (let i = blogPosts.length; i < carouselLinks.length; i++) {
      console.error(`No blog post available for carousel element at index ${i}.`);
      
      carouselLinks[i].href = "#";
      if (carouselImages[i]) {
        carouselImages[i].src = "";
        carouselImages[i].alt = "";
      }
      if (carouselTitles[i]) {
        carouselTitles[i].textContent = "";
      }
    }

  } catch (error) {
    console.error("Error updating carousel:", error);
  }
}



// Default setup for the grid items on the home page
async function getGridItemsHome() {
  const sort = document.getElementById("sort").value;
  const filter = document.getElementById("filter").value;


  try {
    const response = await doFetch(`/blog/posts/oyvind?limit=15&sortOrder=${sort}&_tag=${filter}`);
    const page = response.meta.pageCount;
    console.log("Pages: ", page);
    
    // Check if data is available and proceed accordingly
    if (!response.data || response.data.length === 0) {
      console.log("No posts available");
      return [];
    }
    
    if (sort === "asc" ) {
      // For ascending sort order, slice to get the last 3 posts
      const filterPosts = response.data.slice(0, -3);
      return filterPosts;
    } else if (sort === "desc") {
      // For descending sort order, slice to skip the first 3 posts
      const filterPosts = response.data.slice(3);
      return filterPosts;
    } else {
      // In case sort order is neither 'asc' nor 'desc', return all posts or handle as needed
      console.log("Unrecognized sort order: ", sort);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}


async function getFilteredGridItemsHome() {
  const sort = document.getElementById("sort").value;
  const filter = document.getElementById("filter").value;
  console.log("Sort order:", sort);
  console.log("Filter:", filter);

  try {
    if (filter === "") {
      // If the filter is set to 'all', fetch all posts without filtering
      return await getGridItemsHome();
    }
    const response = await doFetch(`/blog/posts/oyvind?limit=15&sortOrder=${sort}&_tag=${filter}`);
    
    // Check if data is available and proceed accordingly
    if (!response.data || response.data.length === 0) {
      console.log("No posts available");
      return [];
    }

    // Directly return the fetched posts without slicing
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function filterEventListeners() {
  const sortSelect = document.getElementById("sort");
  sortSelect.addEventListener("change", async () => {
    const posts = await getFilteredGridItemsHome();
    updateGridItems(posts); 
  });

  const filterSelect = document.getElementById("filter");
  filterSelect.addEventListener("change", async () => {
    const posts = await getFilteredGridItemsHome();
    updateGridItems(posts);  
  });
}

filterEventListeners();

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
    title.classList.add("title-text");
    title.textContent = post.title;

    titleLink.appendChild(title);

    const publishedDate = document.createElement("span");
    publishedDate.className = "label-text";
    publishedDate.textContent = `Published: ${formatDate(post.created)}`;

    const category = document.createElement("span");
    category.className = "label-text";
    category.textContent = `${post.tags[0]}`;

    gridText.appendChild(publishedDate);

    gridText.appendChild(category);
    gridText.appendChild(titleLink);

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


