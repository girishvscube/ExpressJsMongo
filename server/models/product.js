const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  product_id: { type: Number, required: true, unique: true },
  price: { type: Number, required: true },
});

let product = mongoose.model("product", productSchema);

const listing = (req) => {
  let page = req.query.page || 1;
  let limit = req.query.limit || 10;
  let key = req.query.key;
  let price = Number(req.query.price);

  let query = product.find({});

  if (price) {
    query = query.where("price", price);
  }

  if (key) {
    query = query.find({
      name: { $regex: ".*" + key + ".*", $options: "i" },
    });
  }
  return (query = query
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
    .exec());
};

module.exports = {product,listing};
