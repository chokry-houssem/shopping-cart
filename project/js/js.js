let carts = document.querySelectorAll('.add-cart');
let products = [
  {
    name: 'porte personnalisé',
    tag:'st1',
    price:15,
    inCart:0
  },
  {
    name: 'Sticker bienvenue langues',
    tag:'st2',
    price:30,
    inCart:0
  },
  {
    name: 'Sticker texte les règles',
    tag:'st3',
    price:32,
    inCart:0
  },
  {
    name: 'Sticker citation petit prince',
    tag:'st4',
    price:10,
    inCart:0
  },
  {
    name: 'Sticker citation petit',
    tag:'st5',
    price:35,
    inCart:0
  }
];  
for(let i=0; i< carts.length;i++){
  carts[i].addEventListener('click' , () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}   
function onloadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers){ 
    document.querySelector('.shop span').textContent = productNumbers;
  }
}
function cartNumbers(products) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1 );
    document.querySelector('.shop span').textContent = productNumbers + 1;
  }else{
    localStorage.setItem('cartNumbers', 1 );
    document.querySelector('.shop span').textContent = 1;
  }
  setItems(products);
}
function setItems(products){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

 if (cartItems != null){
   if (cartItems[products.tag] == undefined){
     cartItems = {
       ...cartItems,
       [products.tag]: products
     }
   }
   cartItems[products.tag].inCart += 1;
 }else {
  products.inCart = 1;
  cartItems = {
      [products.tag]: products
  }
 }
 localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
  function totalCost(products){
    //console.log('the prodyct', products.price);
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
      cartCost = parseInt(cartCost);
      localStorage.setItem('totalCost', cartCost + products.price);
    }else{
      localStorage.setItem('totalCost', products.price);
    }
  }
  function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".product");
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer){
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item =>{
        productContainer.innerHTML += `
        <div class="product">
        <i class="fas fa-times-circle"></i>
       <img src="res/${item.tag}.jpg">
       <span>${item.name}</span>
     </div>
     <div class="price">
     ${item.price}
     </div>
     <div class="quantity">
     <i class="fas fa-arrow-circle-left"></i>
     <span>${item.inCart}</span>
     <i class="fas fa-arrow-circle-right"></i>
     </div>
     <div class="total">
     TND${item.inCart * item.price},000
     </div>
     `
      });
      productContainer.innerHTML += `
      <div class="basketTotalContainer">
          <h4 class="basketTotalTitle">Besket Total</h4>
          <h4 class="basketTotal">
          TND${cartCost},000
          </h4>
      `;
    }
  }
onloadCartNumbers();
displayCart();
