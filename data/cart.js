import { renderPaymentSummary } from "../scripts/checkout/paymentsummary.js";

export let cart ;
loadFromStorage()
 export function loadFromStorage(){
cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      Quantity: 2,
      deliveryOptionsId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      Quantity: 1,
      deliveryOptionsId: "2",
    },
  ];
}

 }
 function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.Quantity++;
  } else {
    cart.push({
      productId: productId,
      Quantity: 1,
      deliveryOptionsId: "1",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionsId = deliveryOptionId;
  saveToStorage();
}
export function checkoutItems() {
  let checkoutquantity = 0;
  cart.forEach((cartItem) => {
    checkoutquantity = checkoutquantity + cartItem.Quantity;
  });
  document.querySelector(
    ".js-checkout-update"
  ).innerHTML = `Checkout (${checkoutquantity})`;
}
export function totalItems() {
  let checkoutquantity = 0;
  cart.forEach((cartItem) => {
    checkoutquantity = checkoutquantity + cartItem.Quantity;
  });
  return checkoutquantity
 
}
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',()=>{
  console.log(xhr.response)


fun()
  })
  xhr.open('GET','https://supersimplebackend.dev/cart')
  xhr.send()
}
