"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Imports
const mail_1 = require("./app/mail/mail");
//Import routers
const product_1 = __importDefault(require("./app/routers/product"));
const stripe_1 = __importDefault(require("./app/routers/stripe"));
//Express setup;
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.get("/api/healthcheck", (req, res) => {
    res.send("OK");
});
app.get("/api/mail", (req, res) => {
    try {
        mail_1.sendNotification("Testing email", "test");
    }
    catch (e) {
        console.log(e);
    }
    res.send("Sending Email");
});
app.use("/api/stripe", stripe_1.default);
app.use("/api/products", product_1.default);
app.listen(5000, () => console.log("Running on port 5000"));
