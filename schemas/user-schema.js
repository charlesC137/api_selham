const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userLogins: {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  cart: [
    {
      quantity: { type: Number, required: true },
      currentProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      deliveryOptionId: { type: String, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
