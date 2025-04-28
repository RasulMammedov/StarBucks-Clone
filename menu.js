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
const svg = document.querySelectorAll('.section svg')


svg.forEach(svg => svg.classList.add('lg:hidden'))
footerInfo.classList.add('max-lg:flex-col')
div.forEach((div, index) => {
    if(window.innerWidth < 1056) {
        div.classList.add('lg:w-[190px]', 'w-full', 'relative', 'bg-white', 'max-lg:overflow-hidden', 'translate', 'transition-all', 'duration-500')
        div.onclick = function() {
            ul[index].classList.toggle('top-0')
            const li = this.querySelectorAll('li')
            console.log(`!h-[${(this.querySelectorAll('li').length - 1) * 40}px]`)
            div.classList.toggle('max-lg:h-[56px]')
            div.classList.toggle(`max-lg:!h-[${(li.length - 1) * 40}px]`)
            // div.classList.toggle(`max-lg:!h-[${6 * 40}px]`)
            console.log(div)
        }
    }
})
h2.forEach(h2 => h2.classList.add('text-[#000000DE]','text-[19px]', 'mb-6', 'flex', 'items-center', 'justify-between'))
ul.forEach(ul => ul.classList.add('max-lg:absolute', 'bottom-0', '-z-10'))
li.forEach(li => li.classList.add('text-[#00000094]', 'py-2', 'mb-2', 'hover:text-[#000000de]'))