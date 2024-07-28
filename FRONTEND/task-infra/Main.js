const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');


// Function to read data from CSV
function readData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

// Function to calculate monthly revenue
async function calculateMonthlyRevenue(data) {
  const monthlyRevenue = {};
  data.forEach(order => {
    // Specify the date format if known
    const monthYear = moment(order.order_date, 'MM/DD/YYYY').format('YYYY-MM');
    const revenue = parseFloat(order.product_price) * parseInt(order.quantity, 10);
    if (!monthlyRevenue[monthYear]) {
      monthlyRevenue[monthYear] = 0;
    }
    monthlyRevenue[monthYear] += revenue;
  });
  return monthlyRevenue;
}


// Function to calculate revenue by product
async function calculateRevenueByProduct(data) {
  const productRevenue = {};
  data.forEach(order => {
    const revenue = parseFloat(order.product_price) * parseInt(order.quantity, 10);
    if (!productRevenue[order.product_id]) {
      productRevenue[order.product_id] = 0;
    }
    productRevenue[order.product_id] += revenue;
  });
  return productRevenue;
}

// Function to calculate revenue by customer
async function calculateRevenueByCustomer(data) {
  const customerRevenue = {};
  data.forEach(order => {
    const revenue = parseFloat(order.product_price) * parseInt(order.quantity, 10);
    if (!customerRevenue[order.customer_id]) {
      customerRevenue[order.customer_id] = 0;
    }
    customerRevenue[order.customer_id] += revenue;
  });
  return customerRevenue;
}


async function topCustomersByRevenue(customerRevenuePromise, customerNames) {
  try {
    const customerRevenue = await customerRevenuePromise;
    const topCustomerIds = Object.entries(customerRevenue)
      .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
      .slice(0, 10)
      .map(([customerId]) => customerId);
    const topCustomerDetails = customerNames
      .filter(({ customer_id }) => topCustomerIds.includes(customer_id))
      .map(({ customer_id, customer_name }) => ({
        customer_id,
        customer_name
      }));
    return topCustomerDetails;
  } catch (error) {
    console.error('Error reading data:', error);
    throw error;
  }
}


module.exports = {
  readData,
  calculateMonthlyRevenue,
  calculateRevenueByProduct,
  calculateRevenueByCustomer,
  topCustomersByRevenue
};
