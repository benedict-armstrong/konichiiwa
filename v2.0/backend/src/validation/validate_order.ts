import { Order } from "@model/order";
import { getProduct } from "@service/product_service";

export function validate_new_order(order: Order) {
  if (!order || order == undefined) {
    throw new Error("Not a valid Order.");
  } else if (
    !order.items ||
    order.items == undefined ||
    order.items.length < 1
  ) {
    throw new Error("Order must contain at least one item.");
  } else if (!order.shipping_option) {
    throw new Error("Not a valid shipping option.");
  }

  for (let item of order.items) {
    if (!item || !item.id || !item.size) {
      throw new Error("Order contains invalid item.");
    }
    let product = getProduct(item.id);
    if (!product) {
      throw new Error("Order contains invalid item.");
    }
    if (!product.size.includes(item.size)) {
      throw new Error("Order contains item with invalid size.");
    }
  }

  if (!allowed_shipping_options.includes(order.shipping_option)) {
    throw new Error("Shipping option not allowed");
  }
}

let allowed_shipping_options = ["DE", "AT", "EU"];
