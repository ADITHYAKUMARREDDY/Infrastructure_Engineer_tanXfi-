// index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const {
  readData,
  calculateMonthlyRevenue,
  calculateRevenueByProduct,
  calculateRevenueByCustomer,
  topCustomersByRevenue,
} = require("./Main");

const app = express();
const PORT = process.env.PORT || 5002;
const fulldata = path.join(__dirname, "data.csv");

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.get("/api/data", async (req, res) => {
  try {
    const data = await readData(fulldata);
    res.json(data);
  } catch (error) {
    console.error("Error reading data:", error);
    res
      .status(500)
      .json({ message: "Failed to read data.", error: error.message });
  }
});

app.get("/api/monthly-revenue", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const revenue = calculateMonthlyRevenue(data);
    res.json(revenue);
  } catch (error) {
    console.error("Error calculating monthly revenue:", error);
    res.status(500).json({
      message: "Failed to calculate monthly revenue.",
      error: error.message,
    });
  }
});

app.get("/api/revenue-by-product", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const revenue = calculateRevenueByProduct(data);
    res.json(revenue);
  } catch (error) {
    console.error("Error calculating revenue by product:", error);
    res.status(500).json({
      message: "Failed to calculate revenue by product.",
      error: error.message,
    });
  }
});

app.get("/api/revenue-by-customer", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const revenue = calculateRevenueByCustomer(data);
    res.json(revenue);
  } catch (error) {
    console.error("Error calculating revenue by customer:", error);
    res.status(500).json({
      message: "Failed to calculate revenue by customer.",
      error: error.message,
    });
  }
});


app.get("/api/top-customers", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const customerRevenue = calculateRevenueByCustomer(data);
    const topCustomers = topCustomersByRevenue(customerRevenue, data);
    console.log(topCustomers);
    res.json(topCustomers);
  } catch (error) {
    console.error("Error in /api/top-customers:", error);
    res.status(500).json({ message: "Error calculating top customers", error: error.message });
  }
});


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "frontend/build")));

// Catch-all handler to serve React app for any request that doesn't match API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
