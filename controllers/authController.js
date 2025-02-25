const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "supersecurekey"; // Change this to a strong secret key

// Predefined users
const USERS = [
  { email: "customer@hotelbooking.com", password: "Password@2025", role: "customer" },
  { email: "vendor@hotelbooking.com", password: "Password@2025", role: "vendor" }
];

// Login Route
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = USERS.find(user => user.email === email);
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  // Verify password (Since passwords are fixed, we're not hashing)
  if (password !== user.password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate JWT Token
  const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

  // Send token as HTTP-only cookie (secure and can't be accessed by JS)
  res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
  res.json({ message: "Login successful", role: user.role });
};

// Logout Route
exports.logout = (req, res) => {
  res.clearCookie("token"); // Remove token
  res.json({ message: "Logged out successfully" });
};

// Check Authentication
exports.checkAuth = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ email: decoded.email, role: decoded.role });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
