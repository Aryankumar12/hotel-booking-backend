const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

// Book a hotel (User requests booking)
exports.bookHotel = async (req, res) => {
  try {
    const { userId, hotelId } = req.body;

    if (!userId || !hotelId) {
      return res.status(400).json({ message: "User ID and Hotel ID are required" });
    }

    // Check if the hotel exists
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Create a booking
    const newBooking = new Booking({ userId, hotelId });
    await newBooking.save();

    res.status(201).json({ message: "Booking request sent", booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Error booking hotel", error });
  }
};

// Get bookings for a specific user
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find all bookings for this user
    const bookings = await Booking.find({ userId }).populate("hotelId");
    
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};
