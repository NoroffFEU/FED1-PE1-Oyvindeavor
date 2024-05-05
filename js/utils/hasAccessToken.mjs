// Checks to see if there is an access token stored in the browser
function hasAccessToken() {
  // Check if 'accessToken' exists in session storage
  if (sessionStorage.getItem("accessToken") !== null) {
    return true; // Access token exists
  } else {
    return false; // Access token does not exist
  }
}

export { hasAccessToken };
