import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

const today = dayjs();
const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM D,"));

let cartSummary = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingproduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingproduct = product;
    }
  });
  console.log(matchingproduct);
  const deliveryOptionId = cartItem.deliveryOptionsId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd,MMMM D");

  cartSummary += `  <div class="cart-item-container js-cart-item-container-${
    matchingproduct.id
  }">
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
                 $${formatCurrency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.Quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id = "${
                    matchingproduct.id
                  }">
                    Update
                  </span>
                  <input class = "quantity-input">
                  <span class = "save-quantity-link link-primary">save</span>
                  <span  class="delete-quantity-link link-primary js-delete-link" data-product-id="${
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
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
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

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    console.log(container);
    container.remove();
    checkoutUpdate();
  });
});
function checkoutUpdate() {
  let checkoutquantity = 0;
  cart.forEach((cartItem) => {
    checkoutquantity = checkoutquantity + cartItem.Quantity;
  });
  document.querySelector(
    ".js-checkout-update"
  ).innerHTML = `checkout(${checkoutquantity})`;
}

document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    console.log(productId);
    document.querySelector(".cart-item-container");
  });
});

checkoutUpdate();

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
