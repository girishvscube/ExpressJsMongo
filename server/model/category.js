const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true },
});

let Category = mongoose.model("category", categorySchema);



module.exports = Category;
