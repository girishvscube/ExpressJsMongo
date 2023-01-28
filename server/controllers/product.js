const express = require("express");
const product = require("../models/product");

const router = express.Router();

router.post("/product", async (req, res) => {
  try {
    await product.create(req.body);
    return res.status(201).send({ message: "Added Successfully!!!" });
  } catch (err) {
    return res.status(500).send({ message: "Duplicate Entry" });
  }
});

router.get("/product", async (req, res) => {
  try {
    let query = await product.listing(req);

    return res.status(200).send({ results: query.length, data: query });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

module.exports = router;
