function storeUserName(response) {
  const userName = response.data.name;
  sessionStorage.setItem("userName", userName);

}

export { storeUserName };
