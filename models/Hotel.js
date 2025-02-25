const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  type: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  facilities: { type: [String], required: true },
  availability: { type: [String], required: true },
});

module.exports = mongoose.model("Hotel", HotelSchema);
