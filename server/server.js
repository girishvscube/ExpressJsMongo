const express = require("express");
const app = express();
const connect = require("./config/db");
const product = require("./controllers/product");
const cors = require("cors");
const cart = require("./controllers/cart");
app.use(cors());

//The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

//URL encode for params
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  return res.send({ message: "Hello baby" });
});

app.use("", product);
app.use("", cart);

app.listen(3001, async () => {
  await connect();
  console.log("DB connected and Server started on port 3001");
});
