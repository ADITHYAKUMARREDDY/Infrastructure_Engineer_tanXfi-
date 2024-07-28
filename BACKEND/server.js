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
const PORT = 5002;

app.use(cors());

app.get("/api/data", async (req, res) => {
  try {
    const data = await readData("./data.csv");
    res.json(data);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ message: "Error reading data", error });
  }
});

app.get("/api/monthly-revenue", async (req, res) => {
  try {
    const data = await readData("./data.csv");
    const revenue = calculateMonthlyRevenue(data);
    res.json(revenue);
  } catch (error) {
    console.error("Error calculating monthly revenue:", error);
    res
      .status(500)
      .json({ message: "Error calculating monthly revenue", error });
  }
});

app.get("/api/revenue-by-product", async (req, res) => {
  try {
    const data = await readData("./data.csv");
    const revenue = calculateRevenueByProduct(data);
    res.json(revenue);
  } catch (error) {
    console.error("Error calculating revenue by product:", error);
    res
      .status(500)
      .json({ message: "Error calculating revenue by product", error });
  }
});

app.get("/api/revenue-by-customer", async (req, res) => {
  try {
    const data = await readData("./data.csv");
    const revenue = calculateRevenueByCustomer(data);
    res.json(revenue);
  } catch (error) {
    console.error("Error calculating revenue by customer:", error);
    res
      .status(500)
      .json({ message: "Error calculating revenue by customer", error });
  }
});

app.get("/api/top-customers", async (req, res) => {
  try {
    const data = await readData("./data.csv");
    const customerRevenue = calculateRevenueByCustomer(data);
    const topCustomers = await topCustomersByRevenue(customerRevenue, data);
    res.json(topCustomers);
  } catch (error) {
    console.error("Error calculating top customers:", error);
    res.status(500).json({ message: "Error calculating top customers", error });
  }
});
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
