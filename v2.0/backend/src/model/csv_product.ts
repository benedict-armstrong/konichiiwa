import { Product } from "./product";

export interface Csv_product {
  id: number;
  title: string;
  description: string;
  availability:
    | "in stock"
    | "available for order"
    | "preorder"
    | "out of stock"
    | "discontinued";
  inventory: number;
  condition: "new" | "refurbished" | "used";
  price: string;
  url: string;
  image_link: string;
  brand: string;
  color?: string;
  size?: string;
}

export class Csv_product implements Csv_product {
  constructor(product: Product) {
    this.id = product.id;
    this.title = product.name;
    this.description = product.description;
    this.availability =
      product.availability && product.show ? "in stock" : "out of stock";
    this.inventory = 1;
    this.condition = "new";
    this.price = "" + product.price.value / 100.0 + " EUR";
    this.url = process.env.DOMAIN + "/product/" + product.id;
    this.image_link = process.env.DOMAIN + "/assets/" + product.images[0];
    this.brand = "Konichiiwa";
    this.color = product.primary_color.name;
  }
}
