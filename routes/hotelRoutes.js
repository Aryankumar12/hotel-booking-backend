const express = require("express");
const { addHotel, getHotels, getHotelsById } = require("../controllers/hotelController");

const router = express.Router();

router.post("/add", addHotel); // Vendor adds a hotel
router.get("/", getHotels); // Get all hotels
router.get("/:id", getHotelsById); // 🔥 Correct Route for fetching by ID

module.exports = router;
