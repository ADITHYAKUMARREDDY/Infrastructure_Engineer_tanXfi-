// index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const {
  readData,
  calcMonthlyRev,
  calcRevByProduct,
  calcRevByCustomer,
  topCustByRev,
} = require("./Main");

const app = express();
const PORT =  3000;
const fulldata = path.join(__dirname, "data.csv"); 

app.use(cors());
app.use(express.json());

// endpoints
app.get("/api/data", async (req, res) => {
  try {
    const data = await readData(fulldata);
    res.json(data);
  } catch (error) {
    console.error("Error reading data:", error);
    res
      .status(500 || 400)
      .json({ message: "Failed to read data.", error });
  }
});

app.get("/api/monthly-revenue", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const revenue = calcMonthlyRev(data);
    res.json(revenue);
  } catch (error) {
    res.status(500 || 400).json({
      message: "Failed to calculate monthly revenue.",
      error
    });
  }
});

app.get("/api/revenue-by-product", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const revenue = calcRevByProduct(data);
    res.json(revenue);
  } catch (error) {
    res.status(500 || 400).json({
      message: "Failed to calculate revenue by product.",
      error,
    });
  }
});

app.get("/api/revenue-by-customer", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const revenue = calcRevByCustomer(data);
    console.log(revenue);
    res.json(revenue);
  } catch (error) {
    res.status(500 || 400).json({
      message: "Failed to calculate revenue by customer.",
      error,
    });
  }
});


app.get("/api/top-customers", async (req, res) => {
  try {
    const data = await readData(fulldata);
    const customerRevenue =  calcRevByCustomer(data);
    const topCustomers = await topCustByRev(customerRevenue, data);
    console.log(topCustomers,"customer revenue");
    res.json(topCustomers);
  } catch (error) {
    res.status(500 || 400).json({ message: "Error calculating top customers", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
