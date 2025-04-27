const btn = document.getElementById('menu')
const nav = document.getElementById('nav')
const menu = document.getElementById('openMenu')
const body = document.querySelector('body')

btn.onclick = function() {
    menu.classList.toggle('open')
    body.classList.toggle('bg-[#0009]')
}