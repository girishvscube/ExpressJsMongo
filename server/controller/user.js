//convert the password to unread   npm i bcryptjs
const bcrypt = require("bcryptjs");

//to generate token
const jwt = require("jsonwebtoken");
//model you want to work
const User = require("../model/user");
const express = require("express");
//validte the payload before creating/updating
let Validator = require("validatorjs");
const authenticate = require("../middleware/authencticate");

const router = express.Router();

router.post("/register", async (req, res) => {
  let rules = {
    name: "required",
    email: "required|email",
    password: "required|min:3",
  };

  let validation = new Validator(req.body, rules);

  if (validation.fails()) {
    return res.status(422).send(validation.errors.errors);
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    user.password = await bcrypt.hash(password, salt);
    console.log(user.password);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, "hello", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  let rules = {
    email: "required|email",
    password: "required|min:3",
  };

  let validation = new Validator(req.body, rules);

  if (validation.fails()) {
    return res.status(422).send(validation.errors.errors);
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    let token = await jwt.sign(payload, "hello", { expiresIn: 360000 });
    if (!token) {
      return res.status(500).send({ message: "Internal Server Error" });
    }

    let userObj = {
      token: token,
      name: user.name,
      email: user.email,
    };
    return res.send(userObj);
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/user", authenticate, async (req, res) => {
  try {
    let user = await User.find().select('name email')
    return res.send({ data: user });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server error" });
  }
});
module.exports = router;
