import { doFetch } from "./doFetch.mjs";

async function searchPosts(searchTerm) {
  try {
    const response = await doFetch(`/blog/posts/oyvind`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export { searchPosts };