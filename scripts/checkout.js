import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { checkoutItems } from "../data/cart.js";
import { loadproducts } from "../data/products.js";
//import '../data/cart-class.js'
//import { Car } from "../data/car.js";
//import '../data/backend-practice.js'

loadproducts(() => {
  checkoutItems();
  renderOrderSummary();
  renderPaymentSummary();
});
