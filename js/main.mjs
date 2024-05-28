import { doFetch } from "./utils/doFetch.mjs";
import { updateUI } from "./utils/updateUi.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";
import { updateGridItems } from "./utils/domManipulation.mjs";
import { apiUrl, blogName } from "./constants.mjs";
import { initCarousel } from "./components/carousel.mjs";
import { setupEventListeners } from "./utils/eventHandlers.mjs";

document.addEventListener("DOMContentLoaded", async () => {

  // Show spinner initially if not already shown
  document.querySelector(".spinner-container").style.display = "block";

  try {
    setupEventListeners();
    // await updateCarousel();
    initCarousel();
    updateUI();

    await initUpdateGridItems();
    hamburgerMenu();
    // searchPosts();
  } catch (error) {
    console.error("Error during initial setup:", error);
  } finally {
    hideSpinner();
  }
});

// Quick fix for the select elements not resetting on page reload or revisit
// Had an issue where the select elements would not reset to their first option and the blogposts would not update accordingly
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



// Default setup for the grid items on the home page handles slicing based on sort order and filtering
// So that the carousel items are not repeated in the grid items
export async function getGridItemsHome() {
  const sort = document.getElementById("sort").value;
  const filter = document.getElementById("filter").value;


  try {
    const response = await doFetch(`${apiUrl}/blog/posts/${blogName}?sortOrder=${sort}&_tag=${filter}`);
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

async function initUpdateGridItems() {
  try {
    const posts = await getGridItemsHome();
    await updateGridItems(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}




export async function getFilteredGridItemsHome() {
  const sort = document.getElementById("sort").value;
  const filter = document.getElementById("filter").value;

  try {
    if (filter === "") {
      // If the filter is set to 'all', fetch all posts without filtering
      return await getGridItemsHome();
    }
    const response = await doFetch(`${apiUrl}/blog/posts/${blogName}?limit=15&sortOrder=${sort}&_tag=${filter}`);
    
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

// function filterEventListeners() {
//   const sortSelect = document.getElementById("sort");
//   sortSelect.addEventListener("change", async () => {
//     const posts = await getFilteredGridItemsHome();
//     updateGridItems(posts); 
//   });

//   const filterSelect = document.getElementById("filter");
//   filterSelect.addEventListener("change", async () => {
//     const posts = await getFilteredGridItemsHome();
//     updateGridItems(posts);  
//   });
// }

// filterEventListeners();



// function searchPosts() {
//   const searchInput = document.getElementById("search-input");

//   // If the user deletes the search input, show the original grid items again
//   searchInput.addEventListener("input", async () => {
//     if (searchInput.value === "") {
//       const startPageGrid = await getGridItemsHome();
//       updateGridItems(startPageGrid);
//     }
//   });

//   const performSearch = async () => {
//     // If the user clicks search with no value do nothing
//     if (searchInput.value === "") {
//       return;
//     }

//     const searchValue = searchInput.value;
//     const sort = document.getElementById("sort").value;
//     const filter = document.getElementById("filter").value;
//     console.log("searchValue", searchValue);
//     const response = await doFetch(`${apiUrl}/blog/posts/${blogName}?limit=15&sortOrder=${sort}&_tag=${filter}`);
//     const searchResults = response.data.filter((post) => {
//       return post.title.toLowerCase().startsWith(searchValue.toLowerCase());
//     });
//     console.log(response);
//     updateGridItems(searchResults);
//   };

//   // On click do the search
// searchInput.addEventListener("input", performSearch);

//   // If the user presses enter do the search
//   searchInput.addEventListener("keypress", (event) => {
//     if (event.key === "Enter") {
//       performSearch();
//     }
//   });
// }




