import Stripe from "stripe";

export interface Shipping {
  shippingAddressCollection: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection;
  cost: number;
  description: string;
}

export class Shipping implements Shipping {
  constructor(shipping_methode: string) {
    if (shipping_methode == "AT") {
      this.shippingAddressCollection = { allowed_countries: ["AT"] };
      this.cost = 0;
      this.description = "Free shipping";
    } else if (shipping_methode == "DE") {
      this.shippingAddressCollection = { allowed_countries: ["DE"] };
      this.cost = 600;
      this.description = "Shipping to Germany";
    } else {
      this.shippingAddressCollection = {
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
      };
      this.cost = 900;
      this.description = "Shipping to EU";
    }
  }
}
