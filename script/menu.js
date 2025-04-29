const categoryList = document.getElementById('categoriesList')
const categoryDisplay = document.getElementById('cateforiesDisplay')
let code = ""
let ingridients = []
let ingridientsId = []
let ingridientsImg = []

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
        code += /*html*/`<div class='mt-6 categoryMenu'><h2 class='text-[19px] text-[#000000DE] font-semibold'>${mainCategoryh2}</h2><ul></ul></div>`
    })
    categoryList.innerHTML = code
    code = ''
    data.forEach(category => {
        const mainCategoryh2 = category.name
        code += /*html*/`<section class='section'>
            <h2 class="pb-4 text-[#000000DE] text-[24px] font-bold">${mainCategoryh2}</h2>
            <ul class='flex flex-wrap box-border pt-8'></ul>
        </section>`
    })
    categoryDisplay.innerHTML += code
    code = ''
    console.log(ingridients)
    const ul = document.querySelectorAll('.categoryMenu ul')
    // adding sub category to ul
    ul.forEach((ul, i) => {
        ingridients[i].forEach(sub => code += `<li class='my-4 text-[#00000094]'><a>${sub}</a></li>`)
        ul.innerHTML = code
        code = ''
    })
    const sectionUl = document.querySelectorAll('section ul')
    console.log(ingridientsImg)
    sectionUl.forEach((ul, i) => {
        ingridients[i].forEach((sub, k) => {
            code += /*html*/`
            <li class="mb-8 px-2 w-[50%] h-[112px] box-border inline-block cursor-pointer">
                <div class='inline-block h-full'>
                    <div class="flex items-center h-full">
                        <div class='w-28 h-28 overflow-hidden rounded-full mr-4'>    
                            <img class="h-full rounded-full scale-220 pointer-events-none" src="${ingridientsImg[i][k]}"/>
                        </div>
                        <span class='text-[19px]'>${sub}</span>
                    </div>
                </div>
            </li>`
    })
        ul.innerHTML += code
        code = ''
    })
})

// Category List div: