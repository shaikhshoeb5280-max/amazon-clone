import { cart, totalItems,saveToStorage,updateCartQuantity} from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";

import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";
import { Car } from "../../data/car.js";

export function renderPaymentSummary() {
  console.log("payment summary");

   const paymentSummaryEl = document.querySelector(".js-payment-summary");

  // ✅ stop function if element does not exist
  if (!paymentSummaryEl || cart.length === 0) {
    return;
  }

  let productPriceCents = 0;
  let ShippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.Quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
    ShippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + ShippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalcents = totalBeforeTaxCents + taxCents;
  console.log(productPriceCents);
  console.log(ShippingPriceCents);
  console.log(totalBeforeTaxCents);
  console.log(taxCents);
  console.log(totalcents);

  const paymentSummaryHTML = `  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalItems()}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              ShippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$
            ${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalcents
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

document
  .querySelector(".place-order-button")
  .addEventListener("click", () => {

    const order = {
      id: crypto.randomUUID(),
      orderTime: Date.now(),
      totalCents: totalcents,
      products: cart.map((cartItem) => {
        return {
          productId: cartItem.productId,
          Quantity: cartItem.Quantity,
          deliveryOptionsId: cartItem.deliveryOptionsId
        };
      })
    };

    addOrder(order);
 cart.length = 0; // ✅ empties the array in-place
saveToStorage();  // ✅ updates localStorage

updateCartQuantity();
    setTimeout(() => {
      window.location.href = "orders.html";
    }, 50);

   
  });



}

