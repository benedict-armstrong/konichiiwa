"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const stripe_1 = __importDefault(require("stripe"));
const products = __importStar(require("../service/products"));
const mail_1 = require("../mail/mail");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "var.env" });
let router = express_1.default.Router();
let DOMAIN = "https://konichiiwa.com";
const api_key = "sk_test_51HWoe8AHin6MlcyGnRdMo2Xyq1TGmFSNVI9yyEbx9QwXhoPvnQLsrV1dBvodj7kCkPFCX0rYZenwy3R2AuAwtVTB00wpFojJ2G"; //process.env.STRIPE_KEY;
if (!api_key) {
    throw console.error("Stripe API key missing!");
}
const stripe = new stripe_1.default(api_key, { apiVersion: "2020-08-27" });
router.post("/create-session", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let order = req.body;
    let orderItems = order.items;
    let shipping = calcShipping(order.shipping_to);
    let line_items = [];
    for (let item of orderItems) {
        let p = products.getProduct(item.product_id);
        if (p && item.size in p.size) {
            let li = createLineItem(item.product_id, item.size, p.primary_color);
            if (li) {
                line_items.push(li);
            }
        }
        else {
            console.log("Error");
            throw new Error("Invalid Product");
        }
    }
    if (shipping.cost > 0) {
        line_items.push(shippingLineItem(shipping));
    }
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["card", "eps", "sofort"],
        shipping_address_collection: shipping.shippingAddressCollection,
        line_items: line_items,
        mode: "payment",
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
    });
    try {
        mail_1.sendNotification(JSON.stringify(req.body), "New Order Attempt");
    }
    catch (e) {
        console.log(e);
    }
    res.json({ id: session.id });
}));
function calcShipping(shipping_methode) {
    if (shipping_methode == "AT") {
        return {
            shippingAddressCollection: { allowed_countries: ["AT"] },
            cost: 400,
            description: "AT",
        };
    }
    else if (shipping_methode == "DE") {
        return {
            shippingAddressCollection: { allowed_countries: ["DE"] },
            cost: 1000,
            description: "DE",
        };
    }
    else if (shipping_methode == "EU") {
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
    }
    else if (shipping_methode == "pickup") {
        return {
            shippingAddressCollection: undefined,
            cost: 0,
            description: "pickup",
        };
    }
    else {
        return {
            shippingAddressCollection: undefined,
            cost: 0,
            description: "nowhere",
        };
    }
}
function createLineItem(product_id, size, color) {
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
    }
    else {
        return undefined;
    }
}
function shippingLineItem(shipping) {
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
module.exports = router;
