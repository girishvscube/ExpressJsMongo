const mongoose = require("mongoose");

let cartSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
});

let cart = mongoose.model("cart", cartSchema);

module.exports = cart;

//mongoose schema to rela

// username: {
//     type: String,
//     required: true,
//     trim: true
// },
// });

//   const ClientSchema = new mongoose.Schema({

//     _id: Number,

//     org_name: {
//         type: String,
//         required: true,
//         trim: true,
//     },

//         user:{ type: mongoose.Schema.Types.ObjectId,ref:'user'},

//     });

// const user= new User({
//        'myusername'
//     });

// const result = await user.save();

// const clientschema= new clientSchema({
//         'myorg_name',
//         user // user object
//     });

// const clientresult = await clientschema.save();

//Source: https://stackoverflow.com/questions/70576471
