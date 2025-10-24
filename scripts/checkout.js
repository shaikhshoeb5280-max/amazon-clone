import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { checkoutItems } from "../data/cart.js";


checkoutItems()
renderOrderSummary()
renderPaymentSummary()