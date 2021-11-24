const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  budget: { type: Number, required: true, default: 0},
  sub: [{type: mongoose.Schema.Types.ObjectId, ref: "Sub"}]
});

module.exports = mongoose.model("User", userSchema);