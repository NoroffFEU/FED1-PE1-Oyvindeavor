function displayAvatar() {
  let avatar = sessionStorage.getItem("avatar");
  const avatarElement = document.querySelector(".profile-picture");
  if (avatar === null) {
    avatar = "../assets/assets/account_circle_24dp_FILL0_wght100_GRAD200_opsz48.svg"; // Add a default avatar here later !!
  } else {
    avatar = sessionStorage.getItem("avatar");
    avatarElement.src = avatar;
  }
}

export { displayAvatar };
