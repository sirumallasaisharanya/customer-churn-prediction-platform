const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const predictionRoutes = require("./routes/predictionRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", predictionRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Customer Churn Backend is running"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});