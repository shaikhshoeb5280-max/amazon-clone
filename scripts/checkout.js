import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { checkoutItems } from "../data/cart.js";
import { loadProducts, } from "../data/products.js";
import { loadCart,cart } from "../data/cart.js";
//import '../data/cart-class.js'
//import { Car } from "../data/car.js";
//import '../data/backend-practice.js'

async function loadPage() {
  await loadProducts(); // wait until products are loaded
  await loadCart();     // wait until cart is loaded

  checkoutItems();
  renderOrderSummary();

  if (cart.length > 0) {
    renderPaymentSummary();
  }
}

loadPage();



/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values)=>{
  console.log(values)
  checkoutItems();
    renderOrderSummary();
    renderPaymentSummary();
})
*/
/*.then((value) => {
  console.log(value)
 
}).then(()=>{
  checkoutItems();
    renderOrderSummary();
    renderPaymentSummary();
});*/

/*
loadproducts(() => {
  loadCart( ()=>{

    checkoutItems();
    renderOrderSummary();
    renderPaymentSummary();
  }
  )
});*/
