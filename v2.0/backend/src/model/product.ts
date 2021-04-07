import { Color } from "@model/color";
import { Shipping_option } from "@model/shipping_option";

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
