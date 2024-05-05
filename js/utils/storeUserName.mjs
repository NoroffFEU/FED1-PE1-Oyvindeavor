function storeUserName(response) {
  const userName = response.data.name;
  sessionStorage.setItem("userName", userName);
  console.log("Name:", response.data.name);
}

export { storeUserName };
