const CART_LIST_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let shippingPrice = 0;
let subtotal = 0;
let total = 0;

function subtract(productCount) {
    if (productCount.value > 1) {
        productCount.value--;
    }
}

function add(productCount) {
    productCount.value++;
}

function showCart(array) {
    let htmlContentToAppend = "";    
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
            <tr>
                <td class="m-3">
                    <img class="mx-auto" src="`+ product.src +`" alt="" width="70" height="70">
                </td>
                <td class="text-lg-left">
                    <dt class="mb-1">` + product.name + `</dt>
                    <dd>` + product.currency + ` ` + product.unitCost+ `</dd>
                </td>
                <td>
                    <div class="productCount mb-2">
                        <button type="button" class="btn btn-secondary btn-sm" name="update_cart" title="Disminuir" onclick="subtract(product`+ i +`)"><span>-</span></button>
                        <input id="product`+ i +`" class="input-group-sm" size="2" value="`+ product.count +`">
                        <button type="button" class="btn btn-secondary btn-sm" name="update_cart" title="Aumentar" onclick="add(product`+ i +`)"><span>+</span></button>
                    </div>
                    <a href="#" class="mb-1 grey">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </a>
                </td>
                <td class="priceCount text-center">
                </td>
            </tr>
        `
    }
    document.getElementById("cartList").innerHTML = htmlContentToAppend;
}

function showUnitCost(arrayCart) {
    let arrayHTML = document.getElementsByClassName("priceCount");
    shippingPrice = 0;
    total = 0;
    subtotal = 0;
    let htmlContentToAppend = "";
    for (let i = 0; ((i < arrayCart.length)); i++) {
        let product = arrayCart[i];
        if (product.currency === "USD") {
            htmlContentToAppend = `
                <p>UYU `+ product.unitCost*product.count*40 +`</p>
            `
            subtotal += product.unitCost*product.count*40;
        } else {
            htmlContentToAppend = `
                <p>UYU `+ product.unitCost*product.count +`</p>
            `
            subtotal += product.unitCost*product.count;
        }
        arrayHTML[i].innerHTML = htmlContentToAppend;
        showTotal();
    }
}

function showTotal() {
    total = Number(subtotal + shippingPrice);
    htmlContentToAppend = `             
        <div class="row">
            <div class="col"><p>Subtotal: </p></div> 
            <div class="col text-lg-right">UYU `+ subtotal +`</div>
        </div>
        <div class="row">
            <div class="col"><p>Envío: </p></div> 
            <div class="col text-lg-right">UYU `+ shippingPrice +`</div>
        </div>
        <hr class="table-light">
        <div class="row">
            <div class="col"><p><b>Total:</b> </p></div> 
            <div class="col text-lg-right"><b>UYU `+ total +`</b></div>
        </div>
    `
    document.getElementById("totalAndSubtotal").innerHTML = htmlContentToAppend;
}

function changeCountAndPrice(cart) {
    let arrayCount = document.getElementsByClassName("productCount");
    for (let i = 0; i < arrayCount.length; i++) {
        arrayCount[i].onclick = function() {
            let num = document.getElementById("product"+i+"").value;
            cart[i].count = Number(num);
            showUnitCost(cart);
            showShippingButtons();
            addShippingPriceOnSubtotal();
        }
    }
}

function showShippingButtons(){
    let premium = subtotal*0.15;
    let standard = subtotal*0.07;
    let express  = subtotal*0.05;
    htmlContentToAppend = `
        <form class="text-lg-left" id="shippingForm">
            <p><u>Selecciona tu envío: </u></p>
            <div class="col">
                <input class="form-check-input" type="radio" name="shipp" id="shipp0" value="`+ premium +`" required>
                <label class="form-check-label" for="shipp0">Premium (2-5 días)</label>
            </div>

            <div class="col"> 
                <input class="form-check-input" type="radio" name="shipp" id="shipp1" value="`+ standard +`" required>
                <label class="form-check-label" for="shipp1">Express (5-8 días)</label>
            </div>
            
            <div class="col">
                <input class="form-check-input" type="radio" name="shipp" id="shipp2" value="`+ express +`" required>
                <label class="form-check-label" for="shipp2">Standard (12 a 15 días)</label>
            </div>
        </form>
    `
    document.getElementById("shipping").innerHTML = htmlContentToAppend;
}

function addShippingPriceOnSubtotal(){
    let shippingForm = document.getElementById("shippingForm");
    shippingForm.onchange = function (e) {
        shippingPrice = Math.trunc(Number(e.target.value));
        showTotal();
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            let cart = resultObj.data;
            showCart(cart.articles);
            showUnitCost(cart.articles);
            changeCountAndPrice(cart.articles); //Evento al cambiar cantidad
            showShippingButtons();
            addShippingPriceOnSubtotal(); //Evento seleccion de envío
        }
    })
});