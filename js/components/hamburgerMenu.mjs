import { hasAccessToken } from "../utils/hasAccessToken.mjs";
import { clearAccessToken } from "../utils/clearAccessToken.mjs";

function hamburgerMenu() {
  const menuButton = document.querySelector(".hamburger-menu-button");
  console.log(menuButton);
  const sideMenu = document.querySelector(".side-menu");
  const body = document.body;
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const header = document.querySelector("header");

  menuButton.addEventListener("click", function () {
    console.log("click");
    if (sideMenu.classList.contains("show")) {
      // Close menu
      sideMenu.classList.remove("show");
      body.classList.remove("no-scroll");
      main.classList.remove("opacity-blur");
      footer.classList.remove("opacity-blur");
      header.classList.remove("opacity-blur");
    } else {
      // Open menu
      sideMenu.classList.add("show");
      body.classList.add("no-scroll");
      main.classList.add("opacity-blur");
      footer.classList.add("opacity-blur");
      header.classList.add("opacity-blur");
    }
  });
}

export { hamburgerMenu };
