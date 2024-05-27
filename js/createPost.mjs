import { doFetch } from "./utils/doFetch.mjs";
import { updateUI } from "./utils/updateUi.mjs";
import { apiUrl } from "./constants.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  hamburgerMenu();
});




async function createPost() {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const imageInput = document.getElementById("image");
  const altInput = document.getElementById("alt");
  const submitButton = document.getElementById("submit");
  const categoryInput = document.getElementById("category");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault(); 

    if (!titleInput.checkValidity() || !contentInput.checkValidity() || !imageInput.checkValidity() || !altInput.checkValidity() || !categoryInput.checkValidity()) {
      categoryInput.reportValidity();
      altInput.reportValidity();

      imageInput.reportValidity();
      contentInput.reportValidity();
      titleInput.reportValidity();
      return; 
    }

    try {
      const response = await fetch(`${apiUrl}/blog/posts/oyvind`, {
        method: "POST",
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

      if (response.ok) {
        const responseData = await response.json();
        const id = responseData.data.id;
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
