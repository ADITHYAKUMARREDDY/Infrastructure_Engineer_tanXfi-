const fs = require("fs");
const csv = require("csv-parser");
const moment = require("moment");
const nodemailer = require("nodemailer");

function readData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

function calculateMonthlyRevenue(data) {
  const monthlyRevenue = {};
  data.forEach((order) => {
    const monthYear = moment(order.order_date, "MM/DD/YYYY").format("YYYY-MM");
    const revenue =
      parseFloat(order.product_price) * parseInt(order.quantity, 10);
    if (!monthlyRevenue[monthYear]) {
      monthlyRevenue[monthYear] = 0;
    }
    monthlyRevenue[monthYear] += revenue;
  });
  return monthlyRevenue;
}

function calculateRevenueByProduct(data) {
  const productRevenue = {};
  data.forEach((order) => {
    const revenue =
      parseFloat(order.product_price) * parseInt(order.quantity, 10);
    if (!productRevenue[order.product_id]) {
      productRevenue[order.product_id] = 0;
    }
    productRevenue[order.product_id] += revenue;
  });
  return productRevenue;
}

function calculateRevenueByCustomer(data) {
  const customerRevenue = {};
  data.forEach((order) => {
    const revenue =
      parseFloat(order.product_price) * parseInt(order.quantity, 10);
    if (!customerRevenue[order.customer_id]) {
      customerRevenue[order.customer_id] = 0;
    }
    customerRevenue[order.customer_id] += revenue;
  });
  return customerRevenue;
}

async function topCustomersByRevenue(customerRevenue, customerNames) {
  try {
    const topCustomerIds = Object.entries(customerRevenue)
      .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
      .slice(0, 10)
      .map(([customerId]) => customerId);
    const topCustomerDetails = customerNames
      .filter(({ customer_id }) => topCustomerIds.includes(customer_id))
      .map(({ customer_id, customer_name }) => ({
        customer_id,
        customer_name,
      }));
    console.log(topCustomerDetails);
    return topCustomerDetails;
  } catch (error) {
    console.error("Error processing top customers:", error);
    throw error;
  }
}

const sendPriceAlertEmail = async (recipientEmail) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Setup email data
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: recipientEmail, // List of recipients
    subject: "Price Alert", // Subject line
    text: "The price has reached your target!", // Plain text body
    html: "<p>The price has reached your target!</p>", // HTML body (optional)
  };

  // Send mail
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};


module.exports = {
  readData,
  calculateMonthlyRevenue,
  calculateRevenueByProduct,
  calculateRevenueByCustomer,
  topCustomersByRevenue,
  sendPriceAlertEmail,
};
