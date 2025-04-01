import { elements } from "./ui.js";


// localstorage'a ekleme yapan fonksiyon

const saveToLocalStorage = (cart) => {
  // dışarıdan verilen elemanı JSON.stringify ile stringe çevir ve localeStorage'a eklemek

  localStorage.setItem("cart", JSON.stringify(cart));
};

// localeStorage'dan eleman alan fonksiyon
const getFromLocalStorage = () => {
  //localeStorage daki cart key'ine sahip elemanları al

  const strData = localStorage.getItem("cart");

  // eğer localeStorage da veri varsa bunu JSON.parse ile dönüştür ve return et yoksa boş bir dizi return et

  return strData ? JSON.parse(strData) : [];
};

// sepetteki ürün miktarını sepet ikonuna ekleme işlemi
const updateCartIcon = (cart) => {
  //sepet ikonuna eriş
  const cartIcon = document.querySelector("#cart-icon");

  // sepetteki ürün sayısını hesapla
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  //sepet ikonuna sepetteki ürün sayısını ekle
  cartIcon.setAttribute("data-quantity", totalQuantity);
};

// sepetteki toplam fiyatı hesaplama işlemi
const calculateTotalPrice = (cart) => {
  // sepetteki ürünlerin toplam fiyatını hesapla
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

// sepetteki toplam ürün fiyatını render etme işlemi
const displayCartTotal =(cart) => { 
    const total = calculateTotalPrice(cart);
    //sepetteki toplam fiyatı arayüze aktar
    elements.cartTotalPrice.textContent = `Total=$${total.toFixed(2)}`;
};


export {
  saveToLocalStorage,
  getFromLocalStorage,
  updateCartIcon,
  calculateTotalPrice,
  displayCartTotal
};
