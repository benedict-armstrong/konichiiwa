import Stripe from "stripe";
import { getProduct } from "@service/product_service";
import * as mail from "@mail/mail";
import express from "express";
import { validate_new_order } from "@validation/validate_order";
import { Order } from "@model/order";
import { Line_item } from "@model/line_item";
import { Shipping } from "@model/shipping";

let router = express.Router();
const DOMAIN = process.env.DOMAIN;

const api_key = process.env.STRIPE_KEY;

if (!api_key) {
  throw console.error("Stripe API key missing!");
}

const stripe = new Stripe(api_key, { apiVersion: "2020-08-27" });

router.post("/create-session", async (req, res, next) => {
  let order: Order = req.body;

  try {
    validate_new_order(order);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
  try {
    let line_items = [];

    for (let item of order.items) {
      let product = getProduct(item.id);
      if (product) {
        line_items.push(
          new Line_item(
            product.name,
            product.description,
            product.price.value,
            product.images,
            { size: item.size, color: product.primary_color.name }
          )
        );
      }
    }

    let shipping = new Shipping(order.shipping_option);

    line_items.push(
      new Line_item("Shipping", shipping.description, shipping.cost)
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "eps", "sofort"],
      shipping_address_collection: shipping.shippingAddressCollection,
      line_items: line_items,
      mode: "payment",
      success_url: DOMAIN + "/success",
      cancel_url: DOMAIN + "/cancel",
    });

    //mail.sendNotification(JSON.stringify(req.body), "New Order Attempt");

    res.json({ id: session.id });
  } catch (err) {
    next(err);
  }
});

export = router;
