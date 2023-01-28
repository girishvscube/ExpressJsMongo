const mongoose = require("mongoose");

const connect = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect("mongodb://localhost/my_database", {
    useNewUrlParser: true,
  });
};

module.exports = connect;
