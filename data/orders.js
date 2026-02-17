export let orders = [];

loadFromStorage();

export function loadFromStorage() {
  orders = JSON.parse(localStorage.getItem("orders"))||[];


}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function addOrder(order) {

 orders.unshift(order)
  saveToStorage();
}


export function clearOrders() {
  orders.length = 0;               // clears array in-place
  localStorage.removeItem("orders"); // removes from localStorage
}
