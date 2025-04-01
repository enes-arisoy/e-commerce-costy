import { removeFromCart, updateQuantity } from "./cart.js";

// ui elemanlarının tutulduğu obje
const elements = {
  menuIcon: document.querySelector("#menu-icon"),
  menu: document.querySelector(".navbar"),
  productsList: document.querySelector("#product-list"),
  cartContainer: document.querySelector("#cart-items"),
  cartTotalPrice: document.querySelector("#cart-total"),
};

// ürün kartlarını render etmek
const renderProducts = (products, addToCartFunction) => {
  // product dizisini dön ve bir html dizisi oluştur

  const productsHtml = products
    .map(
      (product) => `<div class="product">
          <img
            src="${product.image}"
            alt="product-image"
            class="product-image"
          />

          <!-- product Info -->
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$ ${product.price}</p>
            <a class="add-to-cart" data-id=${product.id}>Add to cart</a>
          </div>
        </div>`
    )
    .join("");

  // oluşturulan html'yi arayüze aktar
  elements.productsList.innerHTML = productsHtml;

  // classı add-to-cart olan elemana eriş

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  // querySelectorAll metodu erişilen elmanları bir dizi şeklinde döndürdüğü için bu elemana doğrudan addEventListener eklenemez. Bu nedenle, dizi içerisindeki elemanlara teker teker erişmemiz gerekiyor.

  for (let i = 0; i < addToCartButtons.length; i++) {
    //dizi içerisindeki butonlara eriş
    const addToCartButton = addToCartButtons[i];
    // erişilen elemanlara click olayı ekle
    addToCartButton.addEventListener("click", addToCartFunction);
  }
};

// sepetteki ürünleri render etmek
const renderCartItems = (cart) => {
  elements.cartContainer.innerHTML = cart
    .map(
      (item) =>
        `<div class="cart-item">
              <img src="${item.image}" alt="" />
              <div class="cart-item-info">
                <h2 class="cart-title">${item.title}</h2>
                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  class="cart-item-quantity"
                  data-id="${item.id}"
                />
              </div>
              <h2 class="cart-item-price">$ ${item.price}</h2>
              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>`
    )
    .join("");

  //remove butonuna tıklayınca sepetten silme işlemi yapılacak
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }

  // quantity inputlarına eriş
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");

  // quantity inputlarına eriş ve bunlara event listener ekle
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    // her bir inputa eriş ve her birine event listener ekle
    quantityInput.addEventListener("change", updateQuantity);
};
}
export { elements, renderProducts, renderCartItems };
