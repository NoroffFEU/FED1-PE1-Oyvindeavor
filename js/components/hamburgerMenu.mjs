function hamburgerMenu() {
    const menuButton = document.querySelector('.hamburger-menu-button');
    const closeButton = document.querySelector('.close-menu-button');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    menuButton.addEventListener('click', function() {
        hamburgerMenu.classList.add('open'); // Open the menu
    });

    closeButton.addEventListener('click', function() {
        hamburgerMenu.classList.remove('open'); // Close the menu
    });
}

export { hamburgerMenu };