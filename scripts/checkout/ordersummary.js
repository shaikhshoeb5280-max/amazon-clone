import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  checkoutItems,
  
  
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentsummary.js";


function updateCheckoutQuantity(productId, newQuantity) {
  const cartItem = cart.find(item => item.productId === productId);
  if (!cartItem) return;

  cartItem.Quantity = Number(newQuantity);
}

export function renderOrderSummary() {
    const checkoutGrid = document.querySelector(".checkout-grid");
   if(cart.length===0){
      checkoutGrid.innerHTML = `
      <div class="empty-cart-full">
        <p>Your cart is empty</p>
        <span>Add items to your cart to see them here</span>
      </div>
    `;
    return;
   }


  let cartSummary = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingproduct = getProduct(productId);

    /* products.forEach((product) => {
      if (product.id === productId) {
        matchingproduct = product;
      }
    });*/


    const deliveryOptionId = cartItem.deliveryOptionsId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummary += `  <div class="cart-item-container 
    js-cart-item-container
    js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingproduct.name}
                </div>
                <div class="product-price">
                ${matchingproduct.getPrice()}
                </div>
                <div class="product-quantity
                js-product-quantity-${matchingproduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.Quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id = "${
                    matchingproduct.id
                  }">update</span>
                 
                  <span  class="delete-quantity-link link-primary js-delete-link
                  js-delete-link-${matchingproduct.id}" data-product-id="${
                    matchingproduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                  </div>
                  ${deliveryOptionsHtml(matchingproduct, cartItem)}
              </div>
            </div>
            </div>`;
  });

  function deliveryOptionsHtml(matchingproduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

      html += `<div class="delivery-option js-delivery-option" data-product-id="${
        matchingproduct.id
      }" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" ${
        isChecked ? "checked" : ""
      } class="delivery-option-input" name="delivery-option-${
        matchingproduct.id
      }">
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString} Shipping</div>
      </div>
    </div>`;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummary;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderOrderSummary();
      checkoutItems();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    const quantityContainer = document.querySelector(
      ".js-product-quantity-" + productId
    );

    // stop if dropdown already exists
    if (quantityContainer.querySelector("select")) return;

    let selectHTML = '<select class="js-quantity-select">';

    for (let i = 1; i <= 10; i++) {
      selectHTML += `<option value="${i}">${i}</option>`;
    }

    selectHTML += "</select>";

    quantityContainer.insertAdjacentHTML("beforeend", selectHTML);

    
const select = quantityContainer.querySelector(".js-quantity-select");

// set current quantity as selected
select.value = cart.find(item => item.productId === productId).Quantity;

select.addEventListener("change", () => {
  updateCheckoutQuantity(productId, select.value);
  renderOrderSummary();
  renderPaymentSummary();
});
  
  });
});

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });





}

