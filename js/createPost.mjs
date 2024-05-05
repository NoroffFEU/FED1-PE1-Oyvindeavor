import { doFetch } from "./utils/doFetch.mjs";

function createPost() {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const imageInput = document.getElementById("image");
  const altInput = document.getElementById("alt");
  const submitButton = document.getElementById("submit");
  const categoryInput = document.getElementById("category");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const response = await doFetch(`/blog/posts/${userName()}`, {
        method: "POST",
        body: JSON.stringify({
          title: titleInput.value,
          body: contentInput.value,
          image: imageInput.value,
          altText: altInput.value,
          tags: [categoryInput.value],
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error creating post:", error);
      // alert("Error creating post");
    }
  });
}

function userName() {
  const userName = sessionStorage.getItem("userName");
  return userName;
}

createPost();
