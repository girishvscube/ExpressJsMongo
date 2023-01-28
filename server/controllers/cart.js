const express = require("express");
const cart = require("../models/cart");

const router = express.Router();

router.post("/cart", async (req, res) => {
  try {
    await cart.create(req.body);
    return res.status(201).send({ message: "Added Successfully!!!" });
  } catch (err) {
    return res.status(500).send({ message: "Duplicate Entry" });
  }
});

router.get("/cart", async (req, res) => {
  try {
    // let query = await cart.listing(req);

    let query = await cart.find({}).populate({
      path: "product",
      select: "name price",
      match: { name: "Pumas" },
    });

    return res.status(200).send({ results: query.length, data: query });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

module.exports = router;

//fetch data in mongoose based on populate data??

//how to select few fields based on conditions from populated document mongoose??
