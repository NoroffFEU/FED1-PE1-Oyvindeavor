import { doFetch } from "../utils/doFetch.mjs";
import { apiUrl, blogName } from "../constants.mjs";
import { updateGridItems } from "../utils/domManipulation.mjs";
import { getGridItemsHome } from "../main.mjs";
// Search posts on the homepage
export async function searchPosts() {
    const searchInput = document.getElementById("search-input");
  
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
      const sort = document.getElementById("sort").value;
      const filter = document.getElementById("filter").value;

      const response = await doFetch(`${apiUrl}/blog/posts/${blogName}?limit=15&sortOrder=${sort}&_tag=${filter}`);
      const searchResults = response.data.filter((post) => {
        return post.title.toLowerCase().startsWith(searchValue.toLowerCase());
      });

      updateGridItems(searchResults);
    };
  
    // On click do the search
  searchInput.addEventListener("input", performSearch);
  
    // If the user presses enter do the search
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        performSearch();
      }
    });
  }