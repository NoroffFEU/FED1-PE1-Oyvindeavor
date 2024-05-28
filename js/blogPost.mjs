import { updateUI } from "./utils/updateUi.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { formatDate } from "./utils/formatDate.mjs";
import { fetchIdFromUrl } from "./utils/fetchIdFromUrl.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";
import {apiUrl, blogName} from "./constants.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await displayBlogPost();
  hamburgerMenu();
  updateUI();
});

// Fetches data by id from the API and returns it
async function fetchDataById() {
  try {
    const id = fetchIdFromUrl();
    const response = await doFetch(`${apiUrl}/blog/posts/${blogName}/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

async function displayBlogPost() {
  try {
    const data = await fetchDataById();
    if (!data) {
      console.error("No data received to display the blog post.");
      return;
    }
    console.log(data);

    const image = document.querySelector(".blog-image");
    const title = document.querySelector(".article-title");
    const content = document.querySelector(".article-description");
    const authorName = document.querySelector(".author-name");
    const authorPicture = document.querySelector(".author-picture");
    const publishedDate = document.querySelector(".published-date");
    const blogCategory = document.querySelector(".blog-category p");

    if (!data.media || !data.author) {
      throw new Error("Incomplete data received from the server");
    }



    image.src = data.media.url;
    image.alt = data.media.alt;
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