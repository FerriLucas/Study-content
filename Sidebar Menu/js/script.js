
const navigation = document.querySelector('.navigation');

const menu = document.querySelector('.menu');
menu.onclick = function() {
    navigation.classList.toggle('active');
}

const list = document.querySelectorAll('.list');
function activeLink() {
    list.forEach((item) => item.classList.remove('inside'));
    this.classList.add('inside');
}

list.forEach((item) => item.addEventListener('click',activeLink));