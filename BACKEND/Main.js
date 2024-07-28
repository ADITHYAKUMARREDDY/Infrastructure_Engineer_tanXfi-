const fs = require("fs");
const csv = require("csv-parser");
const moment = require("moment");

// reading csv file
function readData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    
    // readstream  helps to handle file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data)) // data 
      .on("end", () => resolve(results)) // resolve
      .on("error", (err) => reject(err)); // rej
  });
}

function calcMonthlyRev(data) {
  const monthlyRev = {};

  data.forEach((order) => {
    const month = moment(order.order_date, "MM/DD/YYYY").format("YYYY-MM");// change format using moment
    const rev = parseFloat(order.product_price) * parseInt(order.quantity, 10);
    monthlyRev[month] = (monthlyRev[month] || 0) + rev;
  });

  return monthlyRev;
}

function calcRevByProduct(data) {
  const productRev = {};

  data.forEach((order) => {
    const rev = parseFloat(order.product_price) * parseInt(order.quantity, 10);
    productRev[order.product_id] = (productRev[order.product_id] || 0) + rev;
  });

  return productRev;
}

function calcRevByCustomer(data) {
  const customerRev = {};

  data.forEach((order) => {
    const rev = parseFloat(order.product_price) * parseInt(order.quantity, 10);
    customerRev[order.customer_id] = (customerRev[order.customer_id] || 0) + rev;
  });

  return customerRev;
}
async function topCustByRev(customerRev, customerNames) {
 
    const topCustIds = Object.entries(customerRev)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([custId]) => custId);
    return customerNames
      .filter(({ customer_id }) => topCustIds.includes(customer_id))
      .map(({ customer_id, customer_name }) => ({
        customer_id,
        customer_name
      }));
  
}


module.exports = {
  readData,
  calcMonthlyRev,
  calcRevByProduct,
  calcRevByCustomer,
  topCustByRev,
};
