import { updateUI } from "./utils/updateUi.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { formatDate } from "./utils/formatDate.mjs";
import { fetchIdFromUrl } from "./utils/fetchIdFromUrl.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  displayBlogPost();
});

// Fetches data by id from the API and returns it
async function fetchDataById() {
  try {
    const id = fetchIdFromUrl();
    const response = await doFetch(`/blog/posts/oyvind/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

async function displayBlogPost() {
  const data = await fetchDataById();
  console.log(data);

  const image = document.querySelector(".blog-image");
  const title = document.querySelector(".article-title");
  const content = document.querySelector(".article-description");

  const authorName = document.querySelector(".author-name");
  const authorPicture = document.querySelector(".author-picture");
  const authorBio = document.querySelector(".author-bio");

  const publishedDate = document.querySelector(".published-date");
  const blogCategory = document.querySelector(".blog-category p");

  image.src = data.media.url;
  title.textContent = data.title;
  content.textContent = data.body;
  authorName.textContent = data.author.name;
  publishedDate.textContent = formatDate(data.created);

  authorPicture.src = data.author.avatar.url;
  authorPicture.alt = data.author.avatar.alt;
  blogCategory.textContent = data.tags[0];
}
