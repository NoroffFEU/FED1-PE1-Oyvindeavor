export function storeUserName(response) {
    const userName = response.data.name;
    sessionStorage.setItem("userName", userName);
    console.log("Name:", response.data.name);
  }
  

  export function storeBio(response) {
    const bio = response.data.bio;
    sessionStorage.setItem("bio", bio);
    console.log("Bio: ", response.data.bio);
  }
  
  export function storeAvatar(response) {
    const avatar = response.data.avatar.url;
    sessionStorage.setItem("avatar", avatar);
    console.log("Avatar: ", response.data.avatar.url);
  }
  
