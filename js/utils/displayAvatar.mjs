function displayAvatar() {
    let avatar = sessionStorage.getItem("avatar");
    const avatarElement = document.querySelector(".profile-picture");
    if (avatar === null) {
      avatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"; // Add a default avatar here later !!
    } else {
      avatar = sessionStorage.getItem("avatar");
      avatarElement.src = avatar;

    }
  }

  export { displayAvatar };