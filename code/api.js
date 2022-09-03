//adding categories
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(res => displayCategory(res))
    .catch(error => console.log(error))

function displayCategory(data) {
    const catagoryContainer = document.getElementById('category_container');
    data.data.news_category.forEach(element => {
        const button = document.createElement('button');
        console.log(element.category_id);
        categorieNews(element.category_id);
        document.getElementById('categoryName').innerText = element.category_name;
        button.onclick = function showNews() {
            categorieNews(element.category_id);
            document.getElementById('categoryName').innerText = element.category_name;
        }
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.innerText = element.category_name;
        catagoryContainer.appendChild(button);
    });
}

function details(id) {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        // .then(res => console.log(res.data[0]))
        .then(res => displayModal(res.data[0]))
        .catch(error => console.log(error))
}

function displayModal(NewsArr) {
    document.getElementById('Modal_title').innerText = NewsArr.title;
    document.getElementById('newsParagraph').innerText = NewsArr.details;
    console.log(NewsArr.author.name)
    console.log(typeof(NewsArr.author.name) )
    if(NewsArr.author.name !== '' ? document.getElementById('modalAuthorName').innerText = NewsArr.author.name : document.getElementById('modalAuthorName').innerText ='Data Not Found');
    if(NewsArr.author.total_view !== '' ? document.getElementById('modalAuthorName').innerText = NewsArr.author.name : document.getElementById('modalAuthorName').innerText ='Data Not Found');
    document.getElementById("modal_img").src = NewsArr.image_url;
}

// all news adding by category
function categorieNews(catId) {
    fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`)
        .then(res => res.json())
        .then(data => displayAllNews(data))
        .catch(error => console.log(error))
}

let postCount = 0;

function displayAllNews(data) {
    data.data.sort((a, b) =>
        parseFloat(b.total_view) - parseFloat(a.total_view)
    );
    console.log(data.data)
    const newsContainer = document.getElementById('news_container');
    newsContainer.innerHTML = '';
    data.data.forEach(element => {
        postCount++;


        const rowDiv = document.createElement('div');
        rowDiv.innerHTML = `
            <div class= " row my-3 bg-white p-3 rounded" >
                    <div class="col-lg-3">
                    <img class="img-fluid " src="${element.thumbnail_url}" alt="">
                </div>
                <div class="col-lg-9 ">
                    <div class = "news_text"> 
                        <h4 class="fw-bold my-2">${element.title}</h4>
                        <p class="text-secondary">${element.details}</p>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="d-flex col-lg-3">
                            <img style="width:59px;height:57px" src="${element.author.img}" alt="" class="img-fluid rounded-circle">
                            <div class="autore_info ms-3 ">
                                <p class="mt-2 ">${element.author.name}</p>
                                
                            </div>
                        </div>
                        <div class="col-lg-3 text-center mt-2 ">
                            <i class="fa fa-eye fs-4 fw-bold"></i>
                            <span class="ms-2 fw-bold">${element.total_view}</span>
                        </div>
                        <div class="col-lg-3 text-center mt-2 ">
                            <i class="fa fa-star text-warning"></i>
                            <i class="fa fa-star text-warning"></i>
                            <i class="fa fa-star text-warning"></i>
                            <i class="fa fa-star text-warning"></i>
                            <i class="fa fa-star-half-o text-warning "></i>
                        </div>
                        <div class="col-lg-3 text-end mt-2 ">
                            <!-- Button trigger modal -->
                                
                            <button type="button" onclick = details('${element._id}') class="border-0 btn  btn-paimary text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">See more<i class="fa fa-arrow-right text-primary ms-1"></i></button>

                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">News Details</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <h3 class="fw-bold text-start my-2" id = "Modal_title"></h3>
                                    <img class="img-fluid " src="" id="modal_img" alt="">
                                    <p class="text-secondary text-start mt-4" id = "newsParagraph"></p>
                                    <p class="mt-2 text-start" >Athor : <b> <span id="modalAuthorName"> </span></b></p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        newsContainer.appendChild(rowDiv);
    })

    console.log(postCount);
    document.getElementById('totalPostNumber').innerText = postCount;
    postCount = 0;
}