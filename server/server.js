const express = require("express");
const connect = require("./config/db");
const user = require("./controller/user");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  return res.send({ message: "Hello baby" });
});

app.use("/", user);

//server created
app.listen(3000, async (req, res) => {
  await connect();
  console.log("DB connected");
});
