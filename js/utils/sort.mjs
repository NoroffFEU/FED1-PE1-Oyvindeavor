async function SortByOldest() {
    try {
      const response = await doFetch("/blog/posts/oyvind?sortOrder=asc");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  export { SortByOldest };