import { apiUrl } from "../constants.mjs";
import { handleErrors } from "../utils/handleErrors.mjs";

// async function doFetch(endpoint, options) {
//   try {

//     const url = apiUrl + endpoint;

//     const response = await fetch(url, options);

//     return response.json();
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw new Error("Error fetching data");
//   }
// }

async function doFetch(endpoint, options) {
  try {


    const url = endpoint;
    const response = await fetch(url, options);

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

export { doFetch };

