import express from "express";
import { getAll, getProduct } from "@service/product_service";
import csv_service from "@service/csv_service";
let router = express.Router();

router.get("/", (req, res) => {
  console.log("Getting all products");
  try {
    res.json(getAll());
  } catch (e) {
    throw new Error(e);
  }
});

router.get("/csv", csv_service.download);

router.get("/:product_id", (req, res) => {
  res.json(getProduct(parseInt(req.params.product_id)));
});

export = router;
