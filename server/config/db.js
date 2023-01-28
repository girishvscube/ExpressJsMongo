const mongoose = require("mongoose")


const connect = () =>{
    // When strict option is set to true, Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database, and all other fields will not be saved (if some other fields are sent).
    mongoose.set('strictQuery', false)
    return mongoose.connect("mongodb://127.0.0.1:27017/mongodb");
}
module.exports = connect;