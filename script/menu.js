const categoryList = document.getElementById('categoriesList')
const categoryDisplay = document.getElementById('cateforiesDisplay')
let code = ""
let ingridients = []
let ingridientsId = []
let ingridientsImg = []
let products = []
let productsImg = []

openMenu()
function openMenu() {
    fetch('https://starbucks-data-nine.vercel.app/menus', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(category => {
            // Main category name:
            const mainCategoryh2 = category.name
            // it's sub categories name:
            const subCategory = category.children.map(sub => sub.name)
            const categoryImageURL = category.children.map(sub => sub.categoryImageURL)
            const categoryId = category.children.map(sub => sub.id)
            ingridients.push(subCategory)
            ingridientsId.push(categoryId)
            ingridientsImg.push(categoryImageURL)
            // Use Category for the div id="cateforiesList"
            code += /*html*/`<div class='mt-6 categoryMenu w-[150px]'><h2 class='text-[19px] text-[#000000DE] font-semibold'>${mainCategoryh2}</h2><ul id='${mainCategoryh2}'></ul></div>`
        })
        categoryList.innerHTML = code
        code = ''
        code += `<span id="directory"></span><h1 id="h1" class="pb-12 max-md:pb-6 max-menuDisplayChange:pb-8 text-[28px] text-[#000000DE] font-bold">Menu</h1>`
        data.forEach(category => {
            const mainCategoryh2 = category.name
            code += /*html*/`<section class='section'>
                <h2 class="pb-4 text-[#000000DE] text-[24px] font-bold">${mainCategoryh2}</h2>
                <ul id="${mainCategoryh2}" class='flex max-md:block flex-wrap box-border pt-8'></ul>
            </section>`
        })
        categoryDisplay.innerHTML = code
        code = ''
        const ul = document.querySelectorAll('.categoryMenu ul')
        // adding sub category to ul
        ul.forEach((ul, i) => {
            ingridients[i].forEach(sub => code += `<li onclick="subCategory('${sub}', '${ul.id}')" class='cursor-pointer my-4 text-[#00000094]'><a>${sub}</a></li>`)
            ul.innerHTML = code
            code = ''
        })
        const sectionUl = document.querySelectorAll('section ul')
        sectionUl.forEach((ul, i) => {
            if(i == 2) sectionUl[i].classList.add('pb-6')
            ingridients[i].forEach((sub, k) => {
                code += /*html*/`
                <li onclick="subCategory('${sub}', '${ul.id}')" class="mb-8 max-menuDisplayChange:mb-4 px-2 max-menuDisplayChange:px-1 w-[50%] max-md:w-full h-[112px] max-menuDisplayChange:h-18 box-border inline-block cursor-pointer">
                    <div class='inline-block h-full'>
                        <div class="flex shrink-0 items-center h-full">
                            <div class='w-28 h-28 max-menuDisplayChange:w-18 max-menuDisplayChange:h-18 shrink-0 overflow-clip rounded-full mr-4'>    
                                <img class="h-full rounded-full scale-220 pointer-events-none" src="${ingridientsImg[i][k]}"/>
                            </div>
                            <span class='text-[19px] font-semibold'>${sub}</span>
                        </div>
                    </div>
                </li>`
        })
            ul.innerHTML += code
            code = ''
        })
    })
}

function subCategory(name, category) {
    console.log(name)
    code += /*html*/`<span class='py-4 mb-2 inline-block' id="directory"></span><h1 id="h1" class="pb-12 max-md:pb-6 max-menuDisplayChange:pb-8 text-[28px] text-[#000000DE] font-bold"></h1>`
    fetch('https://starbucks-data-nine.vercel.app/menus', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        let script = (name !== 'Iced Energy' && name !== 'Shopping Bag') ? data.filter(main => main.name == category)[0].children.filter(child => child.name == name)[0].children
                                               : data.filter(main => main.name == category)[0].children.filter(child => child.name == name)
        const coffeeCategoryName =  (name !== 'Iced Energy' || name !==  'Shopping Bag') ? script.map(child => child.name)
                                                            : script.map(product => product.name)
        script.forEach(child => products.push(child.products.map(product => product.name)))
        script.forEach(child => productsImg.push(child.products.map(product => product.imageURL)))
        coffeeCategoryName.forEach(coffeeCat => {
            code += /*html*/`
                <section class='pb-[40px]'class='section'>`

            if(name !== 'Iced Energy' && name !== 'Shopping Bag') code += `<h2 class="pb-4 text-[#000000DE] text-[24px] font-bold">${coffeeCat}</h2>`
            code += `<ul id="${coffeeCat}" class='flex max-md:block flex-wrap box-border pt-8'></ul>
                </section>`
        })
        categoryDisplay.innerHTML = code
        code = ''
        const sectionUl = document.querySelectorAll('section ul')
        sectionUl.forEach((ul, i) => {
            if(i == 2) sectionUl[i].classList.add('pb-6')
            products[i].forEach((sub, k) => {
            code += /*html*/`
            <li class="max-menuDisplayChange:mb-4 px-2 max-menuDisplayChange:px-1 pda:w-[25%] w-[33.333333%] max-menuDisplayChange:w-[25%] max-md:w-[49%] box-border text-center inline-block cursor-pointer">
                <div class='inline-block h-full p-4 box-border'>
                    <div class="flex flex-col shrink-0 items-center h-full">
                        <div class='max-w-[148px] max-h-[148px] pda:w-[10.445vw] w-[148px] pda:h-[10.445vw] h-[148px]  max-menuDisplayChange:w-[148px] max-menuDisplayChange:h-[148px] max-xs:w-[29.077vw] max-xs:h-[29.077vw] shrink-0 overflow-clip rounded-full mb-4'>    
                            <img class="h-full rounded-full scale-220 pointer-events-none" src="${productsImg[i][k]}"/>
                        </div>
                        <span class='text-[19px] max-xs:text-[16px] font-semibold'>${sub}</span>
                    </div>
                </div>
            </li>`
        })
            ul.innerHTML += code
            code = ''
        })
        const h1 = document.getElementById('h1')
        const directory = document.getElementById('directory')
        h1.innerHTML = name
        directory.innerHTML = `<span onclick="backToMenu()">Menu</span> / ${name}`
        products = []
        productsImg = []
    })
}

function backToMenu() {
    openMenu()
}


// Category List div: