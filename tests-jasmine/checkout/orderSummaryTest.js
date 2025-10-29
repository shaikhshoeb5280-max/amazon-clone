import { renderOrderSummary,  } from "../../scripts/checkout/ordersummary.js";
import { loadFromStorage,cart } from "../../data/cart.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentsummary.js";

describe("test suite:renderOrdersummary", () => {

   const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(()=>{

       spyOn(localStorage,'setItem')
    document.querySelector(
      ".js-test-container"
    ).innerHTML = `<div class = "js-order-summary"></div>
    <div class="js-payment-summary"></div>
    <div class="js-checkout-update"></div>
    `;

   

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          Quantity: 2,
          deliveryOptionsId: "1",
        },
        {
          productId: productId2,
          Quantity: 1,
          deliveryOptionsId: "2",
        },
      ]);
    });

    loadFromStorage();
    renderOrderSummary();


  })
  afterEach(()=>{
      document.querySelector(
      ".js-test-container"
    ).innerHTML =''
  })
  it("displays the cart", () => {
 
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );

    expect(
      document.querySelector(
        `.js-product-quantity-${productId1} .quantity-label`
      ).innerText
    ).toContain("2");
 
    // above Empty to  remove html and make the result clearer after checking all
    //normal way of expect (  document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity : 2 ') not wroks beacuse js-product quantity class has multiple spans it takes all those span,s ineertext and throws error
  });
  it("removes a product", () => {


    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1)
    expect(cart[0].productId).toEqual(productId2)
   
  });
});
