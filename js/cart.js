const CART_LIST_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let shippingPrice = 0;
let subtotal = 0;
let total = 0;
let methodShip = "";

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
                        <input id="product`+ i +`" class="input-group-sm input-text" size="2" value="`+ product.count +`" readonly="readonly">
                        <button type="button" class="btn btn-secondary btn-sm" name="update_cart" title="Aumentar" onclick="add(product`+ i +`)"><span>+</span></button>
                    </div>
                    <button class="remove btn mb-1 grey">
                        <svg width="1em" height="1em" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
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
    if (methodShip === "premium") {
        shippingPrice = Math.trunc(Number(subtotal*0.15));
    } else {
        if (methodShip === "standard") {
            shippingPrice = Math.trunc(Number(subtotal*0.07));
        } else {
            if (methodShip === "express") {
                shippingPrice = Math.trunc(Number(subtotal*0.05));
            }
        }
    }
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
        }
    }
}

function addShippingPriceOnSubtotal(){
    let shippingForm = document.getElementById("shippingForm");
    shippingForm.onchange = function (e) {
        methodShip = e.target.value;
        showTotal();
    }
}

function removeProductCart(cart) {
    let remove = document.getElementsByClassName("remove");
    for ( let i = 0; i < remove.length; i++) {
        remove[i].onclick = function(e) {
            cart.splice(i, 1);
            if (cart.length === 0) {
                htmlContentToAppend = ` 
                <div class="container">
                    <div class="alert alert-secondary text-center" role="alert" style="position: relative; width:auto; top: 0;">
                        <h4 class="text-center alert-heading">Carrito vacio!</h4>
                        <p>Busca articulos para agregar al carrito en la sección <a href="categories.html">Categorías</a>.</p>
                    </div>
                </div>
                `
                document.getElementById("cart").innerHTML = htmlContentToAppend;
            }
            showCart(cart);
            showUnitCost(cart);
            changeCountAndPrice(cart);
            addShippingPriceOnSubtotal();
            removeProductCart(cart);
        }
    }
}

function methodPay() {
    let method = document.getElementById("method");
    htmlContentToAppend = "";
    method.onchange = function(e) {
        let selectMethod = e.target.value;
        if (selectMethod == "method2") {
            htmlContentToAppend = `
            <div class="container">
                <div class="alert alert-secondary text-center" role="alert" style="position: relative; width:auto; top: 0;">
                    <p>Las compras realizadas con este método de pago quedan ajustadas a las condiciones del banco.</p>
                </div>
            </div>
        `
        } else {
            htmlContentToAppend = `
            <div class="form-group input-group-sm col-md-3">
                <label><small>Número de la tarjeta:</small></label>
                <input name="credit-number" class="form-control" type="tel" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" required>
            </div>
            <div class="pl-5 col">
                <label><small>Fecha de vencimiento y código de seguridad:</small></label>
                <div class="form-row">
                <div class="input-group-sm col-md-2">
                    <select class="form-control" name="month" id="month">
                    <option value="--">--</option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    </select>
                </div>
                <div class="input-group-sm col-md-2">
                    <select class="form-control" name="year" id="year">
                    <option value="----">----</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    </select>
                </div>
                <div class="input-group-sm col-md-2">
                    <input type="tel" inputmode="numeric" pattern="[0-9\s]{3,5}" class="form-control" id="securityCode" maxlength="4" required>
                </div>
                </div>
            </div>
        `
        }
        document.getElementById("methodPay").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            let cart = resultObj.data;
            showCart(cart.articles);
            showUnitCost(cart.articles);
            changeCountAndPrice(cart.articles); //Evento al cambiar cantidad
            addShippingPriceOnSubtotal(); //Evento seleccion de envío
            removeProductCart(cart.articles);
            methodPay();
        }
    })
});