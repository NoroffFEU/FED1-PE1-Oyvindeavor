function fetchIdFromUrl(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id;
  }

  export { fetchIdFromUrl };