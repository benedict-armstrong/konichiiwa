import express from "express";
import { getAll, getProduct } from "@service/product_service";
let router = express.Router();

router.get("/", (req, res) => {
  console.log("Getting all products");
  try {
    res.json(getAll());
  } catch (e) {
    throw new Error(e);
  }
});

router.get("/:product_id", (req, res) => {
  res.json(getProduct(parseInt(req.params.product_id)));
});

export = router;
