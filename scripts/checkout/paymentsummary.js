import { cart, totalItems} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  console.log("payment summary");

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
  
}


