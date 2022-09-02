//adding categories
fetch('https://openapi.programming-hero.com/api/news/categories')
.then(res =>res.json())
.then(res => displayCategory(res))

function displayCategory(data) {
    const catagoryContainer = document.getElementById('category_container');
    data.data.news_category.forEach(element => {
        const button = document.createElement('button');
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.innerText = element.category_name;
        catagoryContainer.appendChild(button);
    });
}