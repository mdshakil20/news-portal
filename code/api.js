//adding categories
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(res => displayCategory(res))
    .catch(error => console.log(error))

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

// all news addind 
fetch('https://openapi.programming-hero.com/api/news/category/01')
    .then(res => res.json())
    .then(data => displayAllNews(data))
    .catch(error => console.log(error))


function displayAllNews(data) {
    // console.log(data)
    const newsContainer = document.getElementById('news_container');
    data.data.forEach(element => {
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
                                            <img style="width:59px" src="${element.author.img}" alt="" class="img-fluid rounded-circle">
                                            <div class="autore_info ms-3 ">
                                                <p class="my-0 ">${element.author.name}</p>
                                                <p class="my-0 ">${element.author.published_date.slice(0,10)}</p>
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
                                            <button type="button" onclick =  class="border-0 btn " data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-arrow-right text-primary "></i></button>

                                            <!-- Modal -->
                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">News Details</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <h3 class="fw-bold text-start my-2">${element.title}</h3>
                                                    <img class="img-fluid " src="${element.image_url}" alt="">
                                                    <p class="text-secondary text-start mt-4">${element.details}</p>
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
        // console.log(element['author.img']);
        // console.log(element.author.img)


        newsContainer.appendChild(rowDiv);




    })
}