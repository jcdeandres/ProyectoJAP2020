var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
                </div>
            </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showCarouselImagesGallery(arrayImg) {
    let carouselIndicators = ``;
    let carouselImages = ``;
    
    for (let i = 0; i < arrayImg.length; i++) {
        if (i === 0) {
            //Primera imagen que se muestra
            carouselIndicators = ` 
            <li data-target="#carouselImagesGallery" data-slide-to="` + i +`" class="active"></li>
            `
            carouselImages = ` 
                <div class="carousel-item active">
                    <img src="` + arrayImg[i] + `" class="d-block w-100" alt="">
                </div>
            `
        }else{
            //El resto de las imagenes
            carouselIndicators += ` 
                <li data-target="#carouselImagesGallery" data-slide-to="` + i + `"></li>
            `
            carouselImages += ` 
                <div class="carousel-item">
                    <img src="` + arrayImg[i] + `" class="d-block w-100" alt="">
                </div>
            `
        }
        document.getElementById("carouselIndicators").innerHTML = carouselIndicators;
        document.getElementById("carouselImages").innerHTML = carouselImages;
    }
}

function showStars(numStars) {
    let htmlContentToAppend = "";
    let contador = numStars;
    for (let i = 1; i <= 5; i++) {
        if (contador > 0) {
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
            contador--;
        } else {
            htmlContentToAppend += `<span class="fa fa-star"></span>`;
        }
    }
    return htmlContentToAppend;
}

function showProductComments(array) {
    let htmlContentToAppend = "";
    let stars = "";

    for (let i = 0; i < array.length; i++) {
        let comments = array[i];
        stars = showStars(comments.score);
        const imageUser = `<img src="user.png" style="margin-right: 10px;" width="25" height="25">`;
        htmlContentToAppend += `
            <div class="comments">
                <p>` + imageUser + `<b>` + comments.user + `</b>` + ` - Calificación: ` + stars + `</p>
                <p>` + comments.description + `</p>
                <p>` + comments.dateTime + `</p>
            </div>
            <hr>
        `
    }
    document.getElementById("productComments").innerHTML = htmlContentToAppend;
}

function showRelatedProducts(arrayRelatedProducts, allProducts) {
    let htmlContentToAppend = "";

    for (let i = 0; i < arrayRelatedProducts.length; i++) {
        let j = arrayRelatedProducts[i];
        let related = allProducts[j];
        htmlContentToAppend += `
            
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <a href="product-info.html" class="list-group-item-action list-group-item">
                            <img src="` + related.imgSrc + `" class="img-thumbnail">
                            <h5 class="mb-1">`+ related.name + `</h5>
                            <h5 class="mb-1">`+ related.currency + ` `+ related.cost + `</h5>
                        </a>
                    </div>
                </div>

            `
    }
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;

}

function showNewCommentsStars(scoreStars) {
    let stars = `<h3>` + showStars(scoreStars) + `</h3>`
    document.getElementById("StarsComments").innerHTML = stars;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    //Detalles del producto
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {

            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productCategoryHTML  = document.getElementById("productCategory");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");

            productNameHTML.innerHTML = product.name;
            productCategoryHTML.innerHTML = `<a href="category-info.html">` + product.category + `</a>`;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + ` ` + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            //Muestro las imagenes en el carrusel
            showCarouselImagesGallery(product.images);
            
            //Productos relacionados
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok") {
                    let allProducts = resultObj.data;
                    let arrayRelatedProducts = product.relatedProducts;
                    showRelatedProducts(arrayRelatedProducts, allProducts);
                }
            });
        }
    });

    //Comentarios
    let comment = [];
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") {

            comment = resultObj.data;
            showProductComments(comment);
        }
    });

    //Nuevos comentarios
    const userComent = document.getElementById("formComment");
    let starsSelect = document.getElementById("range");
    let scoreStars = 1;
    showNewCommentsStars(scoreStars);
    
    starsSelect.onchange = function(e) {
        scoreStars = e.target.value;
        showNewCommentsStars(scoreStars);
    }

    userComent.addEventListener("submit", function(e) {
        e.preventDefault();
        let userName = localStorage.getItem('Usuario solo: ');
        let textComment = document.getElementById("comment").value;
        let today = new Date();
        let day = today.getFullYear() + `-` + (today.getMonth()+1) + `-` + today.getDate();
        let hour = today.getHours() + `:` + today.getMinutes() + `:` + today.getSeconds(); 
        let commentObj = {
            score: scoreStars,
            description: textComment,
            user: userName,
            dateTime: day + ` ` + hour,
        }
        comment.push(commentObj);
        showProductComments(comment);
    });
});