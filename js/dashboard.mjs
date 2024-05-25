import { displayAvatar } from "./utils/displayAvatar.mjs";
import { updateUI } from "./utils/updateUi.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { apiUrl } from "./constants.mjs";
import { searchPosts } from "./utils/search.mjs";
import { hamburgerMenu } from "./components/hamburgerMenu.mjs";

document.addEventListener("DOMContentLoaded", () => {
  addEventListenerCreatePost();
  addEventListenerCreateAccount();
  displayUsername();
  displayAvatar();
  updateUI();
  hamburgerMenu();
});

function addEventListenerCreateAccount() {
  const createAccountButton = document.querySelector("#createNewAccountBtn");
  createAccountButton.addEventListener("click", () => {
    window.location.href = "../account/register.html";
  });
}

function addEventListenerCreatePost() {
  const createPostButton = document.querySelector("#createNewPostBtn");
  createPostButton.addEventListener("click", () => {
    window.location.href = "../post/index.html";
  });
}

function displayUsername() {
  const username = sessionStorage.getItem("userName");
  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  const usernameElement = document.querySelector(".userName");
  usernameElement.textContent = `Welcome back ${capitalizedUsername} 👋`;
}

async function getAllBlogPosts() {
  try {
    const response = await doFetch("/blog/posts/oyvind");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function createBlogPost() {
  const blogPosts = await getAllBlogPosts();

  blogPosts.forEach((post) => {
    // Create elements

    const blogPostsContainer = document.querySelector(".articles-dashboard");

    const blogPost = document.createElement("div");
    blogPost.classList.add("blog-post");

    const postTitle = document.createElement("h3");
    postTitle.textContent = post.title;

    const postImage = document.createElement("img");
    postImage.src = post.media.url;
    postImage.alt = post.media.alt;

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      window.location.href = `/post/edit.html?id=${post.id}`;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
      await deleteBlogPost(post.id);
      window.location.reload();
    });

    // Append elements
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    blogPost.appendChild(postTitle);
    blogPost.appendChild(postImage);
    blogPost.appendChild(btnContainer);

    blogPostsContainer.appendChild(blogPost);
  });
}

createBlogPost();

async function deleteBlogPost(id) {
  // Display confirmation dialog
  const confirmed = window.confirm("Are you sure you want to delete this blog post?");

  // If user confirms, proceed with delete operation
  if (confirmed) {
    try {
      const response = await fetch(`${apiUrl}/blog/posts/oyvind/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    }
  }
}

searchPosts();

function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
