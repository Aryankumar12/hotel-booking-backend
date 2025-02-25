const express = require("express");
const { bookHotel, getUserBookings } = require("../controllers/bookingController");

const router = express.Router();

router.post("/book", bookHotel); // User books a hotel
router.get("/:userId", getUserBookings); // Get all bookings for a user

module.exports = router;
