import { apiUrl } from "/js/constants.mjs";

async function doFetch(endpoint, options) {
  try {
    showSpinner();
    const url = apiUrl + endpoint;

    const response = await fetch(url, options);

    // Return the response as JSON
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data"); // Throwing error for handling in calling function
  }
}
hideSpinner();
export { doFetch };

function showSpinner() {
  document.body.setAttribute("loading", "true");
}

function hideSpinner() {
  document.body.removeAttribute("loading");
}

async function doDelete() {
  try {
    const response = await fetch("/blog/posts/oyvind/1", {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    console.log(response);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}