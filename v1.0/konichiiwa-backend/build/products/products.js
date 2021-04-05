"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getProduct = void 0;
const products_json_1 = __importDefault(require("./products.json"));
let products = products_json_1.default;
function getProduct(id) {
    for (let item of products) {
        if (item.id == id) {
            return item;
        }
    }
}
exports.getProduct = getProduct;
function getAll() {
    return products;
}
exports.getAll = getAll;
