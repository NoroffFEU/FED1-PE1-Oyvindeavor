function handleErrors(response) {
    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error("Bad Request: The server could not understand the request.");
        case 401:
          throw new Error("Unauthorized: Access is denied due to invalid credentials.");
        case 403:
          throw new Error("Forbidden: You do not have permission to access this resource.");
        case 404:
          throw new Error("Not Found: The requested resource could not be found.");
        case 429:
          throw new Error("Too Many Requests: You have sent too many requests in a given amount of time.");
        case 500:
          throw new Error("Internal Server Error: The server encountered an error and could not complete your request.");
        case 502:
          throw new Error("Bad Gateway: The server received an invalid response from the upstream server.");
        case 503:
          throw new Error("Service Unavailable: The server is currently unable to handle the request.");
        case 504:
          throw new Error("Gateway Timeout: The server did not receive a timely response from the upstream server.");
        default:
          throw new Error(`Unexpected error: ${response.statusText}`);
      }
    }
    return response;
  }

  export { handleErrors };