const express = require("express");
const authenticate = require("../middleware/authencticate");
const Category = require("../model/category");
const router = express.Router();
let Validator = require("validatorjs");

router.post("/category", authenticate, async (req, res) => {
  let rules = {
    category_name: "required|min:3",
  };

  let validation = new Validator(req.body, rules);

  if (validation.fails()) {
    return res.status(422).send(validation.errors.errors);
  }

  try {
    let { category_name } = req.body;
    let exists = await Category.findOne({ category_name });
    if (exists) {
      return res.status(409).send({ message: "Category Exists..." });
    }
    let category = new Category();
    category.category_name = category_name;
    await category.save();
    return res.status(201).send({ message: "Create Successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error!!" });
  }
});

router.get("/category", authenticate, async (req, res) => {
  try {
    let { page = 1, limit = 10, category_name } = req.query;
    let query = {};
    if (category_name) {
      query = { category_name: { $regex: ".*" + category_name + ".*" } };
    }
    let category = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).send({ results: category.length, data: category });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

router.get("/category/:id", authenticate, async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({ message: "No category found!!" });
    }

    return res.status(200).send({ data: category });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

router.delete("/category/:id", authenticate, async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({ message: "No category found!!" });
    }
    await category.delete();

    return res.status(200).send({ data: "Deleted" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

router.put("/category/:id", authenticate, async (req, res) => {
  let id = req.params.id;
  let rules = {
    category_name: "required|min:3",
  };

  let validation = new Validator(req.body, rules);

  if (validation.fails()) {
    return res.status(422).send(validation.errors.errors);
  }

  try {
    let { category_name } = req.body;
    let category = await Category.findById(id);
    let exists = await Category.find({ category_name });
    console.log(exists);

    if (exists.length && exists.id !== category.id) {
      return res.status(409).send({ message: "Category Exists" });
    }

    category.category_name = category_name;
    await category.save();
    return res.status(201).send({ message: "Updated Successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error!!" });
  }
});

module.exports = router;
