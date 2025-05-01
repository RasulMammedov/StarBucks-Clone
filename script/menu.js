const categoryList = document.getElementById('categoriesList')
const categoryDisplay = document.getElementById('cateforiesDisplay')
let code = ""
let ingridients = []
let ingridientsId = []
let ingridientsImg = []
const products = []
const productsImg = []

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
        code += /*html*/`<div class='mt-6 categoryMenu w-[150px]'><h2 class='text-[19px] text-[#000000DE] font-semibold'>${mainCategoryh2}</h2><ul></ul></div>`
    })
    categoryList.innerHTML = code
    code = ''
    data.forEach(category => {
        const mainCategoryh2 = category.name
        code += /*html*/`<section class='section'>
            <h2 class="pb-4 text-[#000000DE] text-[24px] font-bold">${mainCategoryh2}</h2>
            <ul id="${mainCategoryh2}" class='flex max-md:block flex-wrap box-border pt-8'></ul>
        </section>`
    })
    categoryDisplay.innerHTML += code
    code = ''
    const ul = document.querySelectorAll('.categoryMenu ul')
    // adding sub category to ul
    ul.forEach((ul, i) => {
        ingridients[i].forEach(sub => code += `<li class='my-4 text-[#00000094]'><a>${sub}</a></li>`)
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

function subCategory(name, category) {
    fetch('https://starbucks-data-nine.vercel.app/menus', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        let script = data.filter(main => main.name == category)[0].children.filter(child => child.name == name)[0].children
        const coffeeCategoryName =  script.map(child => child.name)
        console.log(script)
        script.forEach(child => products.push(child.products.map(product => product.name)))
        script.forEach(child => productsImg.push(child.products.map(product => product.imageURL)))
        console.log(products, productsImg)
        coffeeCategoryName.forEach(coffeeCat => {
            code += /*html*/`
                <section class='section'>
                    <h2 class="pb-4 text-[#000000DE] text-[24px] font-bold">${coffeeCat}</h2>
                    <ul id="${coffeeCat}" class='flex max-md:block flex-wrap box-border pt-8'></ul>
                </section>`
        })
        categoryDisplay.innerHTML = code
        code = ''
        const sectionUl = document.querySelectorAll('section ul')
        console.log(sectionUl)
        sectionUl.forEach((ul, i) => {
            if(i == 2) sectionUl[i].classList.add('pb-6')
                products[i].forEach((sub, k) => {
                code += /*html*/`
                <li class="mb-8 max-menuDisplayChange:mb-4 px-2 max-menuDisplayChange:px-1 w-[50%] max-md:w-full h-[112px] max-menuDisplayChange:h-18 box-border inline-block cursor-pointer">
                    <div class='inline-block h-full'>
                        <div class="flex shrink-0 items-center h-full">
                            <div class='w-28 h-28 max-menuDisplayChange:w-18 max-menuDisplayChange:h-18 shrink-0 overflow-clip rounded-full mr-4'>    
                                <img class="h-full rounded-full scale-220 pointer-events-none" src="${productsImg[i][k]}"/>
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

// Category List div: