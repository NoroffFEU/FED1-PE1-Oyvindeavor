export function storeUserName(response) {
  const userName = response.data.name;
  sessionStorage.setItem("userName", userName);
}

export function storeBio(response) {
  const bio = response.data.bio;
  sessionStorage.setItem("bio", bio);
}

export function storeAccessToken(response) {
  const accessToken = response.data.accessToken;
  sessionStorage.setItem("accessToken", accessToken);
}

export function storeAvatar(response) {
  const avatar = response.data.avatar.url;
  const avatarAlt = response.data.avatar.alt;
  sessionStorage.setItem("avatar", avatar);
  sessionStorage.setItem("avatarAlt", avatarAlt);
}

export function storeUserInfo(response) {
  storeAccessToken(response);
  storeUserName(response);
  storeBio(response);
  storeAvatar(response);
}
