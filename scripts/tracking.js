import { orders } from "../data/orders.js";
import { getProduct, loadProducts, products } from "../data/products.js";
import {
  calculateDeliveryDate,
  getDeliveryOption
} from "../data/deliveryOptions.js";
import { updateCartQuantity } from "../data/cart.js";
import { ensureProductsLoaded } from "./utils/loadProducts.js";

const params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId");
const productId = params.get("productId");

ensureProductsLoaded(renderTrackingpage)
updateCartQuantity()


function renderTrackingpage(){

let trackingHTML = "";

orders.forEach(order => {
if (order.id !== orderId) return;

  order.products.forEach(orderItem => {
    if (orderItem.productId !== productId) return;

    const product = getProduct(orderItem.productId);
    
    if (!product) return;

    const deliveryOption = getDeliveryOption(orderItem.deliveryOptionsId);
    const dateString = calculateDeliveryDate(deliveryOption);

    trackingHTML = `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="demo-orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dateString}
        </div>

        <div class="product-info">${product.name}</div>
        <div class="product-info">Quantity: ${orderItem.Quantity}</div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
  });
});

document.querySelector(".main").innerHTML =
  trackingHTML || "<p>Order not found</p>";}