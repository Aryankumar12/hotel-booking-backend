const Hotel = require("../models/Hotel");

// Add a new hotel
exports.addHotel = async (req, res) => {
  try {
    const { name, location, price, rating, type, image, description, facilities, availability } = req.body;

    // Validate required fields
    if (!name || !location || !price || !rating || !type || !image || !description) {
      return res.status(400).json({ message: "All fields except facilities and availability are required!" });
    }

    // Ensure price and rating are numbers
    if (isNaN(price) || isNaN(rating)) {
      return res.status(400).json({ message: "Price and rating must be numbers!" });
    }

    // Ensure rating is between 0 and 5
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 0 and 5!" });
    }

    // Ensure facilities is an array (optional)
    const facilitiesArray = Array.isArray(facilities) ? facilities : [];

    const newHotel = new Hotel({
      name,
      location,
      price,
      rating,
      type,
      image,
      description,
      facilities: facilitiesArray,
      availability: availability || true, // Default to true if not provided
    });

    await newHotel.save();
    res.status(201).json({ message: "Hotel added successfully!", hotel: newHotel });

  } catch (error) {
    console.error("Error adding hotel:", error);
    res.status(500).json({ message: "Error adding hotel", error: error.message });
  }
};

// Get all hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Error fetching hotels", error: error.message });
  }
};

// Get a hotel by ID
exports.getHotelsById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
