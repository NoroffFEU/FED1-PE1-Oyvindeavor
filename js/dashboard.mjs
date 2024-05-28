import { displayAvatar } from "./utils/displayAvatar.mjs";
import { updateUI } from "./utils/updateUi.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { apiUrl, blogName } from "./constants.mjs";

import { hamburgerMenu } from "./components/hamburgerMenu.mjs";

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  displayUsername();
  displayAvatar();
  updateUI();
  hamburgerMenu();
  displayBlogPosts(); // Display blog posts on page load
});

window.onload = function() {
  // Reset each select element to its first option
  const selects = document.querySelectorAll('select');
  selects.forEach(select => {
      select.selectedIndex = 0;
  });
};

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

function setupEventListeners() {
  addEventListenerCreateAccount();
  addEventListenerCreatePost();
  document.querySelector("#sort").addEventListener("change", updateBlogPosts);
  document.querySelector("#filter").addEventListener("change", updateBlogPosts);
  document.querySelector("#search-button").addEventListener("click", updateBlogPosts);
  document.querySelector("#search-input").addEventListener("input", updateBlogPosts);
}

function displayUsername() {
  const username = sessionStorage.getItem("userName");
  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  const usernameElement = document.querySelector(".userName");
  usernameElement.textContent = `Welcome back ${capitalizedUsername} 👋`;
}

async function getAllBlogPosts() {
  const sort = document.querySelector("#sort").value;
  const filter = document.querySelector("#filter").value;
  const searchValue = document.querySelector("#search-input").value.toLowerCase();
  const response = await doFetch(`${apiUrl}/blog/posts/${blogName}?sortOrder=${sort}&_tag=${filter}`);
  if (!response.data || response.data.length === 0) {
    console.log("No posts available");
    return [];
  }
  return response.data.filter(post =>
    post.title.toLowerCase().startsWith(searchValue)
  );
}

async function createBlogPost(posts) {
  const blogPostsContainer = document.querySelector(".articles-dashboard");
  while (blogPostsContainer.firstChild) {
    blogPostsContainer.removeChild(blogPostsContainer.firstChild);
  }
  if (posts.length === 0) {
    const noPostsMsg = document.createElement("p");
    noPostsMsg.textContent = "No blog posts to display.";
    blogPostsContainer.appendChild(noPostsMsg);
    return;
  }
  const fragment = document.createDocumentFragment();
  posts.forEach(post => {
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
    deleteBtn.addEventListener("click", () => deleteBlogPost(post.id, blogPost));
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);
    blogPost.appendChild(postTitle);
    blogPost.appendChild(postImage);
    blogPost.appendChild(btnContainer);
    fragment.appendChild(blogPost);
  });
  blogPostsContainer.appendChild(fragment);
}

async function displayBlogPosts() {
  const posts = await getAllBlogPosts();
  createBlogPost(posts);
}

async function deleteBlogPost(id, blogPostElement) {
  const confirmed = window.confirm("Are you sure you want to delete this blog post?");
  if (confirmed) {
    try {
      const response = await fetch(`${apiUrl}/blog/posts/oyvind/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      if (response.ok) blogPostElement.remove();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    }
  }
}

async function updateBlogPosts() {
  const posts = await getAllBlogPosts();
  createBlogPost(posts);
}



