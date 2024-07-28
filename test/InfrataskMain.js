const filePath = "data.csv";
const {
  readData,
  calcMonthlyRev,
  calcRevByProduct,
  calcRevByCustomer,
  topCustByRev,
} = require("./Main");

async function main() {
  try {
    const data = await readData(filePath);
    // console.log(data);
    const monthlyRevenue = calcMonthlyRev(data);
    console.log("Monthly Revenue:", monthlyRevenue);

    const productRevenue = calcRevByProduct(data);
    console.log("Revenue by Product:", productRevenue);

    const customerRevenue = calcRevByCustomer(data);
    console.log("Revenue by Customer:", customerRevenue);

    const topCustomers = await topCustByRev(customerRevenue, data);
    console.log("Top 10 Customers:", topCustomers);
  } catch (error) {
    console.error("Error reading data:", error);
  }
}

main();
