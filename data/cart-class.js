class Cart {

    //in case a property is undefined like cartItems = undefined (note is class property is given  = ) can use shortcut cartItems;
    cartItems;
    #localStorageKey;
    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey
        this.#loadFromStorage();
        
    }
    //can write loadFromstorage = function(){} but down below isshortcut (shorthand method)
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.
      #localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [
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

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.Quantity++;
    } else {
      this.cartItems.push({
        productId: productId,
        Quantity: 1,
        deliveryOptionsId: "1",
      });
    }
    this.saveToStorage();
  }
  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionsId = deliveryOptionId;
    this.saveToStorage();
  }

  checkoutItems() {
    let checkoutquantity = 0;
    this.cartItems.forEach((cartItem) => {
      checkoutquantity = checkoutquantity + cartItem.Quantity;
    });
    document.querySelector(
      ".js-checkout-update"
    ).innerHTML = `Checkout (${checkoutquantity})`;
  }
  totalItems() {
    let checkoutquantity = 0;
    this.cartItems.forEach((cartItem) => {
      checkoutquantity = checkoutquantity + cartItem.Quantity;
    });
    return checkoutquantity;
  }
}



const cart =  new Cart('cart-oop')
const businessCart = new Cart('cart-business')


console.log(cart);
console.log(businessCart);

console.log(
businessCart instanceof Cart
)