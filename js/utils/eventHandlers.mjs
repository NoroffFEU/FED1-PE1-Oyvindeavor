import { updateGridItems } from "../utils/domManipulation.mjs";
import { getFilteredPosts } from "./dataFetching.mjs";
import { nextSlide, prevSlide } from "../components/carousel.mjs";
import { searchPosts } from "../utils/search.mjs";

export function setupEventListeners() {
  document.querySelector(".carousel-next-btn").addEventListener("click", nextSlide);
  document.querySelector(".carousel-prev-btn").addEventListener("click", prevSlide);
  document.getElementById("sort").addEventListener("change", handleSortChange);
  document.getElementById("filter").addEventListener("change", handleFilterChange);
  document.getElementById("search-input").addEventListener("input", searchPosts);
  // More listeners...
}

async function handleSortChange() {
  const sort = this.value;
  const filter = document.getElementById("filter").value;
  const posts = await getFilteredPosts(sort, filter);
  updateGridItems(posts);
}

async function handleFilterChange() {
  const filter = this.value;
  const sort = document.getElementById("sort").value;
  const posts = await getFilteredPosts(sort, filter);
  updateGridItems(posts);
}
