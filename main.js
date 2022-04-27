const mainEl = document.querySelector('#main');
const cartEl = document.querySelector('#cart');
let bufProductsEl = [];
let products = [];
let cart = [];
let bufTrigger = false;
let lastId = 0;

function Product(title, price, img) {
  this.id = lastId++;
  this.title = title;
  this.price = price;
  this.img = img;
  this.quantity = 0;
}

function Cart(product){
  this.id = product.id;
  this.title = product.title;
  this.price = product.price;
  this.img = product.img;
  this.quantity = product.quantity;
}

Array.prototype.sum = function () {
  let total = 0
  for ( let i3 = 0, _len = this.length; i3 < _len; i3++ ) {
      total += this[i3].price * this[i3].quantity;
  }
  return total
}

function refreshCart(cart){
  if (cart.length == 0){
    cartEl.textContent = 'Корзина пуста';
  }
  else{
    let amount = 0;
    for (i4 = 0; i4 < cart.length; i4++){
      amount += cart[i4].quantity;
    }
    cartEl.textContent = 'В корзине ' + String(amount) + ' товаров на сумму ' + String(cart.sum() + ' рубл(я/ей)');
  }
}

function addToCart(product, cart){
  let trigger = false;
  if (cart.length == 0){
    cart.push(new Cart(product));
  }
  else{
    for (i2 = 0; i2 < cart.length; i2++){
      if (cart[i2].title == product.title){
        cart[i2].quantity++;
        trigger = true;
      }
    }
    if (trigger != true)
      {
        cart.push(new Cart(product));
      }
  }
  saveJSONCart();
}

function removeToCart(product, cart){
  let trigger = false;
  if (cart.length == 0){
    
  }
  else{
    for (i2 = 0; i2 < cart.length; i2++){
      if (cart[i2].title == product.title){
        cart[i2].quantity--;
        trigger = true;
      }
    }
    if (trigger != true)
      {
        
      }
  }
  saveJSONCart();
}

function loadProducts() {
  if(bufTrigger == false){
    const entity = ['Shirt', 'Shoes', 'Hat', 'Pants', 'Skirt', 'Jacket'];
    const colors = ['Red', 'White', 'Black', 'Green', 'Yellow'];
    for(let i = 0; i < 9; i++) {
      const title = entity[_.random(0, entity.length - 1)] + ' ' + colors[_.random(0, colors.length - 1)]
      products.push( new Product(title, _.random(10, 999), `img/${i + 1}.png`) );
    }
  }
  saveJSONProduct();
  bufTrigger = true;
  saveJSONBuf();
}

function fillProductCard(product) {
  const cardEl = document.createElement('DIV');
  const imgEl = document.createElement('IMG');
  const titleEl = document.createElement('P');
  const priceEl = document.createElement('P');
  const btnEl = document.createElement('BUTTON')

  cardEl.classList.add('product-card');
  imgEl.classList.add('product-card__img');
  titleEl.classList.add('product-card__title');
  priceEl.classList.add('product-card__price');
  btnEl.classList.add('product-card__btn');

  imgEl.setAttribute('src', product.img);
  titleEl.textContent = product.title;
  priceEl.textContent = product.price + '$';
  btnEl.textContent = 'В Корзину';
  btnEl.setAttribute('data-id', product.id)

  cardEl.append(imgEl);
  cardEl.append(titleEl);
  cardEl.append(priceEl);
  cardEl.append(btnEl);

  return cardEl;
}

function fillCartCard(product) {
  const cardEl = document.createElement('DIV');
  const imgEl = document.createElement('IMG');
  const titleEl = document.createElement('P');
  const priceEl = document.createElement('P');
  const btnElp = document.createElement('BUTTON')
  const btnElm = document.createElement('BUTTON')

  cardEl.classList.add('product-card');
  imgEl.classList.add('product-card__img');
  titleEl.classList.add('product-card__title');
  priceEl.classList.add('product-card__price');
  btnElp.classList.add('product-card__btnp');
  btnElm.classList.add('product-card__btnm');

  imgEl.setAttribute('src', product.img);
  titleEl.textContent = String(product.title) +' x '+ String(product.quantity);
  titleEl.setAttribute('data-idt', product.id);
  priceEl.textContent = product.price + '$';
  btnElp.textContent = '+';
  btnElp.setAttribute('data-idp', product.id);
  btnElm.textContent = '-';
  btnElm.setAttribute('data-idm', product.id);
  

  cardEl.append(imgEl);
  cardEl.append(titleEl);
  cardEl.append(priceEl);
  cardEl.append(btnElp);
  cardEl.append(btnElm);

  return cardEl;
}

function drawProductCard(products) {
    for ( i = 0; i < products.length; i++){
      mainEl.append(fillProductCard(products[i]));
    }
    lastId = 0;
}

function drawCartCard(products) {
  for ( i = 0; i < products.length; i++){
    if (products[i].quantity > 0){
    mainEl.append(fillCartCard(products[i]));
  }
  }
  lastId = 0;
}

/*function drawProducts(){
  for(i = 0; i < bufProductsEl.length; i++){
    mainEl.append(bufProductsEl[i]);
  }
}*/

function saveJSONProduct() {
  window.localStorage.setItem('Product', JSON.stringify(products));
}
function saveJSONBuf() {
  window.localStorage.setItem('Buf', bufTrigger);
}
function saveJSONCart() {
  window.localStorage.setItem('Cart', JSON.stringify(cart));
}
function loadJSONProduct() {
  products = JSON.parse(window.localStorage.getItem('Product')) || [];
}
function loadJSONBuf() {
  bufTrigger = localStorage.getItem('Buf') || false;
}
function loadJSONCart() {
  cart = JSON.parse(window.localStorage.getItem('Cart')) || [];
}
loadJSONProduct();
loadJSONBuf();
loadProducts();
loadJSONCart();
//window.localStorage.clear();

const cartBlocks = [
  document.querySelector('#main'),
  document.querySelector('#delivery'),
  document.querySelector('#comment'),
]

let currentBlock = 0;

function nextBlock() {
  cartBlocks[currentBlock % 3].style.display = 'none';

  currentBlock++;

  cartBlocks[currentBlock % 3].style.display = 'flex';
}

function BloackHide(){
  cartBlocks[1].style.display = 'none';
  cartBlocks[2].style.display = 'none';
}

if (String(document.URL).includes('index.html')){

  drawProductCard(products);
  refreshCart(cart);

mainEl.addEventListener('click', function (e){
  for (i = 0; i < products.length; i++){  
    if (e.target == document.querySelector('[data-id="'+String(i)+'"]')){
      products[i].quantity++;
      addToCart(products[i],cart);
      refreshCart(cart);
    }
  }
}, true)
}

if (String(document.URL).includes('cart.html')){
  BloackHide();
  drawCartCard(cart);
  refreshCart(cart);
  mainEl.addEventListener('click', function (e){
    for (i = 0; i < products.length; i++){
      const titleEl = document.querySelector('[data-idt="'+String(i)+'"]');  
      if (e.target == document.querySelector('[data-idp="'+String(i)+'"]')){
        console.log(e.target);
        products[i].quantity++;
        addToCart(products[i],cart);
        refreshCart(cart);
        location.reload();
      }
    }
  }, true)

  mainEl.addEventListener('click', function (e){
    for (i = 0; i < products.length; i++){
      const titleEl = document.querySelector('[data-idt="'+String(i)+'"]');  
      if (e.target == document.querySelector('[data-idm="'+String(i)+'"]')){
        console.log(e.target);
        products[i].quantity--;
        removeToCart(products[i],cart);
        refreshCart(cart);
        location.reload();
      }
    }
  }, true)
  document.querySelector('#nextBtn').addEventListener('click', () => {
    nextBlock();
  })
  }