const btn = document.getElementById('menu')
const nav = document.getElementById('nav')
const menu = document.getElementById('openMenu')
const div = document.getElementById('bg-grad')
const body = document.querySelector('body')

btn.onclick = function() {
    menu.classList.toggle('open')
    div.classList.toggle('bg-[#0009]')
}