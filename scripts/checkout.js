import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { checkoutItems } from "../data/cart.js";
import '../data/cart-class.js'

checkoutItems()
renderOrderSummary()
renderPaymentSummary()