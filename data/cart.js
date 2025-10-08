export const cart =[

]
 export  function addToCart(productId){
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
      });
    }
}