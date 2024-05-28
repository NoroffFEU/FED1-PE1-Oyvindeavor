function displayAvatar() {
  // Retrieve the avatar URL and alternative text from sessionStorage
  let avatar = sessionStorage.getItem("avatar");
  let alt = sessionStorage.getItem("avatarAlt");

  // Select the element where the avatar will be displayed
  const avatarElement = document.querySelector(".profile-picture");
  const avatarElementDashboard = document.querySelector(".profile-picture-dashboard");

  // Check if the avatar URL is not stored; use a default if not
  if (avatar === null) {
    avatar = "../assets/account_circle_24dp_FILL0_wght100_GRAD200_opsz48.svg";
    avatar.alt = "Default Avatar";
  }

  // Update the image source and alternative text
  avatarElement.src = avatar;
  avatarElement.alt = alt;
  if (avatarElementDashboard === null) {
    return;
  }
  avatarElementDashboard.src = avatar;
  avatarElementDashboard.alt = alt;
}

export { displayAvatar };
