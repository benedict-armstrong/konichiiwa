import express from "express";
import cors from "cors";

// Imports
import { sendNotification } from "./app/mail/mail";

//Import routers
import product_router from "./app/routers/product";
import stripe_router from "./app/routers/stripe";

//Express setup;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/healthcheck", (req, res) => {
  res.send("OK");
});

app.get("/api/mail", (req, res) => {
  try {
    sendNotification("Testing email", "test");
  } catch (e) {
    console.log(e);
  }
  res.send("Sending Email");
});

app.use("/api/stripe", stripe_router);
app.use("/api/products", product_router);

app.listen(5000, () => console.log("Running on port 5000"));
