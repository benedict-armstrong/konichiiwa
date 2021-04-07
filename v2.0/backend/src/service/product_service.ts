import { Product } from "@model/product";
import data from "./products_data.json";

let products: Product[] = data;

export function getProduct(id: number): Product | undefined {
  for (let item of products) {
    if (item.id == id) {
      return item;
    }
  }
}

export function getAll(): Product[] {
  return products;
}
