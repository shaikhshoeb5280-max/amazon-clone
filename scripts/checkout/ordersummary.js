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

export function renderOrderSummary() {
  let cartSummary = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingproduct = getProduct(productId);

    /* products.forEach((product) => {
      if (product.id === productId) {
        matchingproduct = product;
      }
    });*/

    console.log(matchingproduct);

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
      const { productId } = link.dataset;
      console.log(productId);
      document.querySelector(".cart-item-container");
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
