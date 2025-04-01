import fetchProducts from "./api.js";
import { elements, renderProducts, renderCartItems } from "./ui.js";
import { addToCart } from "./cart.js";
import { getFromLocalStorage, updateCartIcon, displayCartTotal } from "./helper.js";

elements.menuIcon.addEventListener("click", () => {
  elements.menu.classList.toggle("open-menu");
});

document.addEventListener("DOMContentLoaded", () => {
  // bir projede kullanıcı ana sayfada ise api den verileri almalı ve arayüzü renderlamalı fakat sepet sayfasında isek sepetteki ürünleri renderlamalıyız. bu nedenle hangi sayfada olduğumuza karar vermeliyiz.
  const cart = getFromLocalStorage();
  
  // hangi sayfadayız?
  if (window.location.pathname.includes("cart.html")) {
    // *sepet sayfası işlemleri

    // localstorage'dan sepetteki ürünleri al
  
    getFromLocalStorage(cart);
  
    // sepetteki ürünleri renderla
    renderCartItems(cart);

    // sepetteki toplam fiyatı renderla
  displayCartTotal(cart);
  } else {
    // ana sayfa işlemleri
    
    // promise yapısı
    fetchProducts()
      .then((products) => {
        renderProducts(products, (e) => {
          addToCart(e, products);
        });
        
      })
      .catch((error) => {
        console.error(`error: ${err}`);
      });
   
  }  
  getFromLocalStorage(cart);
  updateCartIcon(cart);
 
});
