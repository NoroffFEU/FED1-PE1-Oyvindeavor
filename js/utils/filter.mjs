async function filterByCategory(category) {
    try {
      const response = await doFetch(`/blog/posts/oyvind?_tag${category}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  export { filterByCategory };