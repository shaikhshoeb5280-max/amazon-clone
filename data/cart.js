

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
  export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

 // ✅ Fixed
export function updateCartQuantity({productId, newQuantity}={}) {
  if(productId && newQuantity !== undefined){
    const cartItem = cart.find((item) => item.productId === productId);
    if(cartItem){
      cartItem.Quantity = Number(newQuantity);
      saveToStorage(); // ← also add this so the change persists!
    }
  }

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity = cartQuantity + cartItem.Quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

export function addToCart(productId,quantity=1) {
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
      Quantity: quantity,
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
export async function loadCart() {
  try {
    const response = await fetch('https://supersimplebackend.dev/cart');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    //console.log(data);

    return data; // returns the cart data for further use
  } catch (error) {
    console.error('Failed to load cart:', error);
    return null; // in case of error
  }
}