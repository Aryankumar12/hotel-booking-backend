const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
