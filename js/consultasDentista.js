const menuIcon = document.querySelector('.menu-icon');
const menuIconImg = document.querySelector('.menu-icon img');
const ul = document.querySelector('.ul');

menuIcon.addEventListener('click', () => {
    ul.classList.toggle('ativo');

    if (ul.classList.contains('ativo')) {
        menuIconImg.src = "../img/close.png"; 
    } else {
        menuIconImg.src = "../img/menu.png";
    }
});
document.querySelectorAll('.item-nav').forEach(link => {
    link.addEventListener('click', () => {
        ul.classList.remove('ativo');
        menuIconImg.src = "../img/menu.png";
    });
});