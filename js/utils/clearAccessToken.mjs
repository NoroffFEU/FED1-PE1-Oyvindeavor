// This clears the access token from the session storage use this when logging out
function clearAccessToken() {
    sessionStorage.removeItem('accessToken');
  }

  export { clearAccessToken };