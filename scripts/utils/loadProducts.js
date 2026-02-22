import { loadProducts } from "../../data/products.js";
export async function ensureProductsLoaded(renderPage){
  await loadProducts()
  renderPage()
}