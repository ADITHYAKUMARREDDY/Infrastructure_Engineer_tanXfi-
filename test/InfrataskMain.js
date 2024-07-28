const filePath = "data.csv";
const { readData, calculateMonthlyRevenue, calculateRevenueByProduct, calculateRevenueByCustomer, topCustomersByRevenue } = require("./Main");

async function main() {
  try {
    const data = await readData(filePath);
    // console.log(data);
    const monthlyRevenue = calculateMonthlyRevenue(data);
    console.log("Monthly Revenue:", monthlyRevenue);

    const productRevenue = calculateRevenueByProduct(data);
    console.log("Revenue by Product:", productRevenue);

    const customerRevenue = calculateRevenueByCustomer(data);
    console.log("Revenue by Customer:", customerRevenue);

    const topCustomers = await topCustomersByRevenue(customerRevenue, data);
    console.log("Top 10 Customers:", topCustomers);
  } catch (error) {
    console.error("Error reading data:", error);
  }
}

main();
