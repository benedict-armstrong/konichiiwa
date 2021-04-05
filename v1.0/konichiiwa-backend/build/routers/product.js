"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const products_1 = require("../service/products");
let router = express_1.default.Router();
router.get("/", (req, res) => {
    console.log("Getting all products");
    try {
        res.json(products_1.getAll());
    }
    catch (e) {
        throw new Error(e);
    }
});
module.exports = router;
