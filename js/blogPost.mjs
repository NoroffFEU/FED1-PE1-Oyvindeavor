import { updateUI } from "./utils/updateUi.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { formatDate } from "./utils/formatDate.mjs";
import { fetchIdFromUrl } from "./utils/fetchIdFromUrl.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await displayBlogPost();
  hamburgerMenu();
  updateUI();
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
  let data;
  try {
    data = await fetchDataById();
    console.log(data);
  } catch (error) {
    console.error("Error fetching blog post data:", error);
    return;
  }

  try {
    const image = document.querySelector(".blog-image");
    const title = document.querySelector(".article-title");
    const content = document.querySelector(".article-description");
    const authorName = document.querySelector(".author-name");
    const authorPicture = document.querySelector(".author-picture");
    const authorBio = document.querySelector(".author-bio");
    const publishedDate = document.querySelector(".published-date");
    const blogCategory = document.querySelector(".blog-category p");

    if (!data.media || !data.author) {
      throw new Error("Incomplete data received from the server");
    }

    image.src = data.media.url;
    title.textContent = data.title;
    content.textContent = data.body;
    authorName.textContent = data.author.name;
    publishedDate.textContent = formatDate(data.created);
    authorPicture.src = data.author.avatar.url;
    authorPicture.alt = data.author.avatar.alt;
    blogCategory.textContent = data.tags[0];
  } catch (error) {
    console.error("Error setting up blog post content:", error);
  }
}
