import { doFetch } from "./utils/doFetch.mjs";
import { apiUrl, blogName } from "./constants.mjs";
import { fetchIdFromUrl } from "./utils/fetchIdFromUrl.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";
import { updateUI } from "./utils/updateUi.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const postId = fetchIdFromUrl(); // Fetch the post ID from URL
  displayExistingDataToForm(postId);
  saveChanges(postId);
  hamburgerMenu();
  updateUI();
});

// Fetches the post data from the API using the post ID
async function fetchDataById(postId) {
  try {
    const response = await doFetch(`${apiUrl}/blog/posts/${blogName}/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

// Fetches the data and displays it in the form
async function displayExistingDataToForm(postId) {
  const data = await fetchDataById(postId);
  if (!data) return;

  document.querySelector("#postTitle").value = data.title;
  document.querySelector("#postContent").value = data.body;
  document.querySelector("#postCategory").value = data.tags[0];
  document.querySelector("#postImage").value = data.media.url;
  document.querySelector("#postImageAlt").value = data.media.alt;
}

// Adds an event listener to the save changes button
function saveChanges(postId) {
  const form = document.getElementById("editPostForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await editPost(postId);
    window.location.href = "../dashboard/index.html";
  });
}

// Submits the edited post data to the server
async function editPost(postId) {
  const titleInput = document.getElementById("postTitle");
  const contentInput = document.getElementById("postContent");
  const imageInput = document.getElementById("postImage");
  const altInput = document.getElementById("postImageAlt");
  const categoryInput = document.getElementById("postCategory");

  if (!titleInput.value || !contentInput.value || !imageInput.value || !categoryInput.value) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    const response = await doFetch(`${apiUrl}/blog/posts/${blogName}/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: titleInput.value,
        body: contentInput.value,
        media: {
          url: imageInput.value,
          alt: altInput.value,
        },
        tags: [categoryInput.value],
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.error("Error editing post:", error);
    alert("Error editing post");
  }
}
