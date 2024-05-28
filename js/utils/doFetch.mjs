export async function doFetch(endpoint, options) {
  try {
    const url = endpoint;
    const response = await fetch(url, options);

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}
