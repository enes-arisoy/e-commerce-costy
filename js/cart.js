import {
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
  displayCartTotal,
} from "./helper.js";
import { renderCartItems } from "./ui.js";

let cart = getFromLocalStorage();

// sepete ekle butonuna tıklandığında çalışacak fonksiyon
// bu fonksiyon ana sayfada çalışacak ve sepete ekleme işlemi yapacak
const addToCart = (e, products) => {
  // add-to-cart butonlarına tıklanınca butonları birbirinden ayırt etmek için bunlara data-id ile birer unique id atadık. Böylece, butonların birbirinden ayrılmasını sağladık.

  // tıklanılan elemanın id'sine eriş
  const productId = +e.target.dataset.id;

  // ıd'si bilinen product'ı products dizisi içerisinden bulma
  const product = products.find((product) => product.id === productId);

  // ürün sepette varsa

  if (product) {
    // ürün sepette eklendi mi diye kontrol et
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      // eğer ürün sepette varsa ürün miktarını arttır
      existingItem.quantity++;
    } else {
      // sepete eklenecek ürün için bir obje oluşturmak
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      // sepet dizisine oluşturulan elemanı ekle
      cart.push(cartItem);
      // sepet dizisini localstoragea kaydet
      saveToLocalStorage(cart);
      updateCartIcon(cart); // sepetteki ürün miktarını güncelle
    }
  }

  // Add to cart butonunu Added a çevir
  e.target.innerText = "Added";
  
  // added'ı eski haline getirmek
  setTimeout(() => {
    e.target.innerText = "Add to cart";
  }, 500);
  // sepet dizisini localstoragea kaydet
  saveToLocalStorage(cart);
   // sepetteki ürün miktarını güncelle
   updateCartIcon(cart);
};

// sepetten ürün silme işlemi
const removeFromCart = (e) => {
  // tıklanan butonun id'sine eriş
  const productId = parseInt(e.target.dataset.id);
  // tıklanan elemanı sepetten sil
  cart = cart.filter((item) => item.id !== productId);

  // localstorage ı güncelle
  saveToLocalStorage(cart);

  // sepeti renderla
  renderCartItems(cart);

  updateCartIcon(cart); // sepetteki ürün miktarını güncelle

  // sepetteki toplam fiyatı renderla
  displayCartTotal(cart);
};
//sepetteki ürünlerin miktarını güncelleme işlemi
const updateQuantity = (e) => {
  //yeni miktar 0'dan büyükse güncellenecek elemanın miktarını güncelle

  // yeni miktarı al
  const newQuantity = +e.target.value;
  // güncellenen elemanın id'sine eriş
  const productId = +e.target.dataset.id;

  if (newQuantity > 0) {
    // güncellenecek elemanı bul
    const updateItem = cart.find((item) => item.id === productId);
    // güncellenen elemanın miktarını güncelle
    updateItem.quantity = newQuantity;

    // localstorage'ı güncelle
    saveToLocalStorage(cart);
  }
  updateCartIcon(cart); // sepetteki ürün miktarını güncelle
  // sepetteki toplam fiyatı renderla
  displayCartTotal(cart);
};

export { addToCart, removeFromCart, updateQuantity };
