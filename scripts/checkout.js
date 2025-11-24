import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { checkoutItems } from "../data/cart.js";
import { loadproducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js'
//import { Car } from "../data/car.js";
//import '../data/backend-practice.js'

async function loadPage(){
 
  await loadProductsFetch()
    await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })


   checkoutItems();
    renderOrderSummary();
    renderPaymentSummary();
  
}
loadPage()

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
