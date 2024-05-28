export function storeUserName(response) {
    const userName = response.data.name;
    sessionStorage.setItem("userName", userName);

  }
  

  export function storeBio(response) {
    const bio = response.data.bio;
    sessionStorage.setItem("bio", bio);

  }
  
  export function storeAvatar(response) {
    const avatar = response.data.avatar.url;
    sessionStorage.setItem("avatar", avatar);
  }

 