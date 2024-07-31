
const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

const {
  readData,
  calculateMonthlyRevenue,
  calculateRevenueByProduct,
  calculateRevenueByCustomer,
  topCustomersByRevenue,
  sendPriceAlertEmail
} = require("./Main");

const app = express();
const PORT = process.env.PORT || 3000;
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
    res.status(500).json({ message: "Failed to read data.", error: error.message });
  }
});

app.post("/api/price-alert", async (req, res) => {
  const { price, email } = req.body;  // Expecting email to be passed in the request body
  try {
    if (price === 66180 && email) {
      await sendPriceAlertEmail(email);  // Send email to the specified address
      res.json({ message: "Price alert email sent." });
    } else {
      res.status(400).json({ message: "No email provided or price does not match." });
    }
  } catch (error) {
    console.error("Error sending price alert email:", error);
    res.status(500).json({ message: "Failed to send price alert email.", error: error.message });
  }
});

app.get("/api/monthly-revenue", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const revenue = calculateMonthlyRevenue(data);
    res.json(revenue);
  } catch (error) {
    console.error("Error calculating monthly revenue:", error);
    res.status(500).json({ message: "Failed to calculate monthly revenue.", error: error.message });
  }
});

app.get("/api/revenue-by-product", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const revenue = calculateRevenueByProduct(data);
    res.json(revenue);
  } catch (error) {
    console.error("Error calculating revenue by product:", error);
    res.status(500).json({ message: "Failed to calculate revenue by product.", error: error.message });
  }
});

app.get("/api/revenue-by-customer", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const revenue = calculateRevenueByCustomer(data);
    res.json(revenue);
  } catch (error) {
    console.error("Error calculating revenue by customer:", error);
    res.status(500).json({ message: "Failed to calculate revenue by customer.", error: error.message });
  }
});

app.get("/api/top-customers", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const customerRevenue = calculateRevenueByCustomer(data);
    const topCustomers = await topCustomersByRevenue(customerRevenue, data);
    res.json(topCustomers);
  } catch (error) {
    console.error("Error in /api/top-customers:", error);
    res.status(500).json({ message: "Error calculating top customers", error: error.message });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
