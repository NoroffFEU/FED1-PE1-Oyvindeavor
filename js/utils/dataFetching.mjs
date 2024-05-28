import { doFetch } from "./doFetch.mjs";
import { apiUrl, blogName } from "../constants.mjs";

export async function getPosts(queryParams) {
  const response = await doFetch(`${apiUrl}/blog/posts/${blogName}?${queryParams}`);
  return response.data || [];
}

export async function getThreeLatestPosts() {
  return getPosts("limit=3&sortOrder=desc");
}

export async function getFilteredPosts(sort, filter) {
  let queryParams = "limit=12";
  if (sort) {
    queryParams += `&sortOrder=${encodeURIComponent(sort)}`;
  }
  if (filter) {
    queryParams += `&_tag=${encodeURIComponent(filter)}`;
  }
  return getPosts(queryParams);
}
