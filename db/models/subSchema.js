const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  subName: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  frequency: { type: String, required: true },
  subDate: { type: Date, required: true },
});

module.exports = mongoose.model("Sub", subSchema);