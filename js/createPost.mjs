import { doFetch } from "./utils/doFetch.mjs";
import { updateUI } from "./utils/updateUi.mjs";
import {apiUrl} from "./constants.mjs"

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
});



async function createPost() {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const imageInput = document.getElementById("image");
  const altInput = document.getElementById("alt");
  const submitButton = document.getElementById("submit");
  const categoryInput = document.getElementById("category");
  const userName = sessionStorage.getItem("userName");

  submitButton.addEventListener("click", async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Check if any of the required fields are empty
    if (!titleInput.value || !contentInput.value || !imageInput.value || !categoryInput.value) {
      alert("Please fill in all required fields.");
      return; // Stop execution if any required field is empty
    }

    try {
      const response = await fetch(`${apiUrl}/blog/posts/oyvind`, {
        method: "POST",
        body: JSON.stringify({
          title: titleInput.value,
          body: contentInput.value,
          media: {
            url: imageInput.value,
            altText: altInput.value,
          },
          tags: [categoryInput.value],
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      // Check if the response is successful
      if (response.ok) {
        // Parse the response body to get the data returned by the server
        const responseData = await response.json();
        const id = responseData.data.id;

        // Redirect to the newly created blog post page
        window.location.href = `../blogpost.html?id=${id}`;
      } else {
        console.error("Error creating post:", response.statusText);
        alert("Error creating post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    }
  });
}




createPost();
