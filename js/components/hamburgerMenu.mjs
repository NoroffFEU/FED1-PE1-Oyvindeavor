import { hasAccessToken } from "../utils/hasAccessToken.mjs";
import { clearAccessToken } from "../utils/clearAccessToken.mjs";

function hamburgerMenu() {
  const menuButton = document.querySelector(".hamburger-menu-button");
  const sideMenu = document.querySelector(".side-menu");
  const body = document.body;
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const header = document.querySelector("header");

  menuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the click from bubbling up to the document
    toggleMenu();
  });

  document.addEventListener("click", function (event) {
    if (sideMenu.classList.contains("show") && !sideMenu.contains(event.target)) {
      closeMenu();
    }
  });

  function toggleMenu() {
    if (sideMenu.classList.contains("show")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    sideMenu.classList.add("show");
    body.classList.add("no-scroll");
    main.classList.add("opacity-blur");
    footer.classList.add("opacity-blur");
    header.classList.add("opacity-blur");
  }

  function closeMenu() {
    sideMenu.classList.remove("show");
    body.classList.remove("no-scroll");
    main.classList.remove("opacity-blur");
    footer.classList.remove("opacity-blur");
    header.classList.remove("opacity-blur");
  }
}

export { hamburgerMenu };
