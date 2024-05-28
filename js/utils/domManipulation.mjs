import { formatDate } from "../utils/formatDate.mjs";

// Function to update the grid items on the home page based on the posts that are passed to it
// This function is called in the main.mjs file, not reusable on the dashboard as i use a different -
// Grid layout for the dashboard
export async function updateGridItems(posts) {
    const container = document.querySelector(".grid-container");
  
    // Remove all existing children from the container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  
    posts.forEach((post) => {
      const gridItem = document.createElement("a");
      gridItem.href = `/blogpost.html?id=${post.id}`;
      gridItem.className = "grid-item";
  
      const image = document.createElement("img");
      image.src = post.media.url;
      image.alt = post.media.alt;
      image.loading = "lazy";
  
      const gridText = document.createElement("div");
      gridText.className = "grid-text";
  
      const titleLink = document.createElement("a");
      titleLink.href = `/blogpost.html?id=${post.id}`;
  
      const title = document.createElement("h2");
      title.classList.add("title-text");
      title.textContent = post.title;
  
      titleLink.appendChild(title);
  
      const publishedDate = document.createElement("span");
      publishedDate.className = "label-text";
      publishedDate.textContent = `Published: ${formatDate(post.created)}`;
  
      const category = document.createElement("span");
      category.className = "label-text";
      category.textContent = `${post.tags[0]}`;
  
      gridText.appendChild(publishedDate);
  
      gridText.appendChild(category);
      gridText.appendChild(titleLink);
  
      gridItem.appendChild(image);
      gridItem.appendChild(gridText);
  
      container.appendChild(gridItem);
    });
  }