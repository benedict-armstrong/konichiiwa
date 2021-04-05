import Stripe from "stripe";
import * as products from "../service/products_service";
import { sendNotification } from "../mail/mail";
import express from "express";
import env from "dotenv";

env.config({ path: "var.env" });

let router = express.Router();
let DOMAIN: string = "https://konichiiwa.com";

const api_key =
  "sk_test_51HWoe8AHin6MlcyGnRdMo2Xyq1TGmFSNVI9yyEbx9QwXhoPvnQLsrV1dBvodj7kCkPFCX0rYZenwy3R2AuAwtVTB00wpFojJ2G"; //process.env.STRIPE_KEY;

if (!api_key) {
  throw console.error("Stripe API key missing!");
}

const stripe = new Stripe(api_key, { apiVersion: "2020-08-27" });

router.post("/create-session", async (req, res) => {
  let order: Order = req.body;
  let orderItems: OrderItem[] = order.items;
  let shipping: Shipping = calcShipping(order.shipping_to);

  let line_items: LineItem[] = [];
  for (let item of orderItems) {
    let p = products.getProduct(item.product_id);
    if (p && item.size in p.size) {
      let li = createLineItem(item.product_id, item.size, p.primary_color);
      if (li) {
        line_items.push(li);
      }
    } else {
      console.log("Error");
      throw new Error("Invalid Product");
    }
  }

  if (shipping.cost > 0) {
    line_items.push(shippingLineItem(shipping));
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "eps", "sofort"],
    shipping_address_collection: shipping.shippingAddressCollection,
    line_items: line_items,
    mode: "payment",
    success_url: `${DOMAIN}/success`,
    cancel_url: `${DOMAIN}/cancel`,
  });

  try {
    sendNotification(JSON.stringify(req.body), "New Order Attempt");
  } catch (e) {
    console.log(e);
  }

  res.json({ id: session.id });
});

function calcShipping(shipping_methode: string): Shipping {
  if (shipping_methode == "AT") {
    return {
      shippingAddressCollection: { allowed_countries: ["AT"] },
      cost: 400,
      description: "AT",
    };
  } else if (shipping_methode == "DE") {
    return {
      shippingAddressCollection: { allowed_countries: ["DE"] },
      cost: 1000,
      description: "DE",
    };
  } else if (shipping_methode == "EU") {
    return {
      shippingAddressCollection: {
        allowed_countries: [
          "BE",
          "BG",
          "CZ",
          "DK",
          "IE",
          "ES",
          "EE",
          "FR",
          "HR",
          "IT",
          "CY",
          "LV",
          "LT",
          "LU",
          "HU",
          "NL",
          "PL",
          "PT",
          "RO",
          "SI",
          "SK",
          "FI",
          "SE",
          "MT",
          "CH",
        ],
      },
      cost: 1500,
      description: "EU",
    };
  } else if (shipping_methode == "pickup") {
    return {
      shippingAddressCollection: undefined,
      cost: 0,
      description: "pickup",
    };
  } else {
    return {
      shippingAddressCollection: undefined,
      cost: 0,
      description: "nowhere",
    };
  }
}

interface Shipping {
  shippingAddressCollection:
    | Stripe.Checkout.SessionCreateParams.ShippingAddressCollection
    | undefined;
  cost: number;
  description: string;
}

interface OrderItem {
  product_id: number;
  size: string;
  primary_color: products.Color;
}

interface Order {
  items: OrderItem[];
  shipping_to: string;
}

interface LineItem {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
      images: string[];
      metadata?: {
        size: string;
        color: string;
      };
    };
  };
  quantity: number;
}

function createLineItem(
  product_id: number,
  size: string,
  color: products.Color
): LineItem | undefined {
  let product = products.getProduct(product_id);
  if (product) {
    return {
      price_data: {
        currency: product.price.currency,
        product_data: {
          name: product.name,
          description: product.description + " | " + size + " | " + color.name,
          images: product.images,
          metadata: {
            size: size,
            color: product.primary_color.name,
          },
        },
        unit_amount: product.price.value,
      },
      quantity: 1,
    };
  } else {
    return undefined;
  }
}

function shippingLineItem(shipping: Shipping): LineItem {
  return {
    price_data: {
      currency: "eur",
      product_data: {
        name: "Shipping to " + shipping.description,
        description: "Delivery time aprox. 2 Weeks",
        images: [],
      },
      unit_amount: shipping.cost,
    },
    quantity: 1,
  };
}

export = router;
