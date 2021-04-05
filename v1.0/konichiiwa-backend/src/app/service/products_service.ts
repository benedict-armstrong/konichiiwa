import data from "./products_data.json";

let products: Product[] = data;

export interface Product {
  id: number;
  name: string;
  description: string;
  price: {
    currency: string;
    value: number;
  };
  size: string[];
  primary_color: Color;
  secondary_color: Color;
  background_color: string;
  images: string[];
  thumbnails: string[];
  availability: boolean;
  show: boolean;
  shipping_options: Shipping_option[];
}

interface Shipping_option {
  type: string;
  price: number;
  text: string;
}

export interface Color {
  name: string;
  hex_value?: string;
}

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
