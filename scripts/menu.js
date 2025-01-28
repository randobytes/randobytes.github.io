// menu.js
const topMenu = document.getElementById('topMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        topMenu.classList.add('scrolled');
    } else {
        topMenu.classList.remove('scrolled');
    }
});