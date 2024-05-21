import { apiUrl } from "./js/constants.mjs";
import { handleErrors } from "./handleErrors.mjs";

async function doFetch(endpoint, options) {
  try {
    showSpinner();
    const url = apiUrl + endpoint;

    const response = await fetch(url, options);
    // Check if the response is successful (status 200-299)
    handleErrors(response);
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

