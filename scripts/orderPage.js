import { orders, clearOrders } from "../../data/orders.js";
import { loadProducts } from "../data/products.js";
import { products,getProduct } from "../data/products.js";
import { formatCurrency, } from "./utils/money.js";
import { cart ,addToCart} from "../data/cart.js";
import { calculateDeliveryDate,getDeliveryOption } from "../data/deliveryOptions.js";
import { ensureProductsLoaded } from "./utils/loadProducts.js";

ensureProductsLoaded(renderOrdersPage)


 function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity = cartQuantity + cartItem.Quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    console.log(cartQuantity);
    console.log(cart);
  }

  
 

  updateCartQuantity();
function renderOrdersPage() {
  if(!orders||orders.length===0){
       document.querySelector(".orders-grid").innerHTML=`<div class="empty-orders">
  <p>You have no orders yet</p>
  <span>Your orders will appear here once you place one</span>
</div>`
return
  }
  let ordersHTML = "";
  
  orders.forEach((order) => {
    let productsHTML = "";
    
    order.products.forEach((orderItem) => {
      const deliveryOption = getDeliveryOption(orderItem.deliveryOptionsId);
const dateString = calculateDeliveryDate(deliveryOption);

      const product = getProduct(orderItem.productId);
      if (!product) return;

      productsHTML += `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-details">
          <div class="product-name">${product.name}</div>
          <div class="product-delivery-date">
            Arriving on: ${dateString}
          </div>
          <div class="product-quantity">Quantity: ${orderItem.Quantity}</div>
          <button class="buy-again-button button-primary js-buy-again"
      data-product-id="${orderItem.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${new Date(order.orderTime).toDateString()}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML}
        </div>
      </div>
    `;
  });

  document.querySelector(".orders-grid").innerHTML = ordersHTML;
  document.querySelectorAll('.js-buy-again').forEach((button)=>{
  button.addEventListener("click",()=>{
    const productId = button.dataset.productId
   addToCart(productId)
    window.location.href="checkout.html"
  })
})
}

document.querySelector('.js-clear').addEventListener("click",()=>{
  clearOrders()

 renderOrdersPage()
})



