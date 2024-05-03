import { apiUrl } from '/js/constants.mjs';

async function doFetch(endpoint, options) {
    try {

        const url = apiUrl + endpoint;
        
        const response = await fetch(url, options);

        // Return the response as JSON
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data'); // Throwing error for handling in calling function
    }
}
export { doFetch };