function hamburgerMenu() {
  const hamburger = document.querySelector('.hamburger-menu');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });
}