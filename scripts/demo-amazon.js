import { cart, addToCart,updateCartQuantity ,loadFromStorage} from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { ensureProductsLoaded } from "./utils/loadProducts.js";
//import {addToCart}from "../data/cart.js";
import { formatCurrency, } from "./utils/money.js";

 ensureProductsLoaded(renderProductsGrid)

function renderProductsGrid(productsToRender = products) {
  let productsHTML = "";

  productsToRender.forEach((product) => {
    productsHTML += `  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>
 
          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
             ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
      ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select  class="js-quantity-selector" data-product-id="${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
  ${product.extraInfoHTML()}
          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`;
  });


  
 

  updateCartQuantity();

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  document.querySelectorAll(".js-add-to-cart").forEach((buttonElement) => {
    buttonElement.addEventListener("click", () => {
      //console.log("added a product");
      const productId = buttonElement.dataset.productId;
       const quantitySelector = document.querySelector(
      `.js-quantity-selector[data-product-id="${productId}"]`
    );

    const quantity = Number(quantitySelector.value);

      addToCart(productId,quantity);
      updateCartQuantity();
//reset the selector
        quantitySelector.value = "1";
    });
  });
}
  function handleSearch() {
  const searchInput = document.querySelector(".search-bar");
  const searchValue = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchValue)
  );
if(filteredProducts.length===0){
 showMessage()
  return
}
 renderProductsGrid(filteredProducts)
}

function showMessage(){
 const error = document.querySelector(".js-products-grid")
 error.innerHTML=   `<div class="no-products">
      <p>No product found</p>
        <span>Try adjusting your search or filters</span>
    </div>
  `
 
}

document.addEventListener("DOMContentLoaded",()=>{


  document.querySelector(".search-button").addEventListener("click", handleSearch);
  
  document.querySelector(".search-bar").addEventListener("keydown",(e)=>{
    if(e.key==="Enter") {
      handleSearch();
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector(".custom-sort-trigger");
  const menu = document.querySelector(".custom-sort-menu");
  const valueText = document.querySelector(".custom-sort-value");

  trigger.addEventListener("click", () => {
    trigger.parentElement.classList.toggle("open");
  });

  menu.addEventListener("click", (e) => {
    if (!e.target.dataset.value) return;

    const value = e.target.dataset.value;
    valueText.textContent = e.target.textContent;

    trigger.parentElement.classList.remove("open");

    let sortedProducts = [...products];

    switch (value) {
      case "price-low":
        sortedProducts.sort((a, b) => a.priceCents - b.priceCents);
        break;

      case "price-high":
        sortedProducts.sort((a, b) => b.priceCents - a.priceCents);
        break;

      case "rating":
        sortedProducts.sort((a, b) => b.rating.stars - a.rating.stars);
        break;

      default:
        sortedProducts = [...products];
    }

    renderProductsGrid(sortedProducts);
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!trigger.contains(e.target) && !menu.contains(e.target)) {
      trigger.parentElement.classList.remove("open");
    }
  });
});

window.addEventListener("pageshow", () => {
  loadFromStorage();
  updateCartQuantity();
});