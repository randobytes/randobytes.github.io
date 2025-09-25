const topMenu = document.getElementById('top-menu');

topMenu.innerHTML = '<div class="top-menu-content">' +
    '<div class="column"><a href="index.html" class="menu-item-home"><img src="favicon32.png" /><span>RANDOBYTES</span></a></div>' +
    '<div class="column, right"><a href="about.html" class="menu-item">About&nbsp;</a></div>' +
    '<div class="column, right, dropdown"><a href="javascript:void(0)" class="dropdown-title">Games</a><div class="dropdown-content">' +
    '<a href="galaxyz/index.html" class="menu-item"><img src="galaxyz/images/icon.png" /><span>Galaxyz</span></a>' +
    '<a href="wonder_surprise/index.html" class="menu-item"><img src="wonder_surprise/images/icon.png" /><span>Wonder Surprise</span></a>' +
    '</div></div></div>';

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        topMenu.classList.add('scrolled');
    } else {
        topMenu.classList.remove('scrolled');
    }
});
