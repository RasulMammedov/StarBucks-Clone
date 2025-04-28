const btn = document.getElementById('menu')
const nav = document.getElementById('nav')
const menu = document.getElementById('openMenu')
const bhGrad = document.getElementById('bg-grad')
const body = document.querySelector('body')


/* btn.onclick = function() {
    menu.classList.toggle('open')
    div.classList.toggle('bg-[#0009]')
    body.classList.toggle('max-md:overflow-hidden')
} */

function toggleMenu() {
    menu.classList.toggle('open')
    bhGrad.classList.toggle('bg-[#0009]')
    body.classList.toggle('max-md:overflow-hidden')
}

window.onresize = function() {
    if (menu.classList.contains('open') && window.innerWidth > 760) toggleMenu()
}

const footerInfo = document.getElementById('footerInfo')
const div = document.querySelectorAll('.section')
const h2 = document.querySelectorAll('.section h2')
const ul = document.querySelectorAll('.section ul')
const li = document.querySelectorAll('.section ul li')
footerInfo.classList.add('max-lg:flex-col')
h2.forEach(h2 => h2.classList.add('text-[#000000DE]','text-[19px]', 'mb-6'))
ul.forEach(ul => ul.classList.add('max-lg:hidden'))
console.log(ul)
li.forEach(li => li.classList.add('text-[#00000094]', 'py-2', 'mb-2', 'hover:text-[#000000de]'))