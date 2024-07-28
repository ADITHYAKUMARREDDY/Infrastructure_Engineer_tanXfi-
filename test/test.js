const { calculateMonthlyRevenue, calculateRevenueByProduct, calculateRevenueByCustomer, topCustomersByRevenue } = require('./yourModule'); // Replace 'yourModule' with the actual file name
const assert = require('assert');

// Sample data for testing
const sampleData = [
  { order_id: '1', customer_id: '101', order_date: '2021-01-01', product_id: 'P01', product_name: 'Product 1', product_price: '100.00', quantity: '2' },
  { order_id: '2', customer_id: '102', order_date: '2021-01-15', product_id: 'P02', product_name: 'Product 2', product_price: '150.00', quantity: '1' },
  { order_id: '3', customer_id: '101', order_date: '2021-02-01', product_id: 'P01', product_name: 'Product 1', product_price: '100.00', quantity: '1' },
  { order_id: '4', customer_id: '103', order_date: '2021-03-01', product_id: 'P03', product_name: 'Product 3', product_price: '200.00', quantity: '2' },
  { order_id: '5', customer_id: '104', order_date: '2022-01-01', product_id: 'P01', product_name: 'Product 1', product_price: '150.00', quantity: '2' },
  { order_id: '6', customer_id: '105', order_date: '2021/01/05', product_id: 'P02', product_name: 'Product 2', product_price: '0.00', quantity: '0' }, // Invalid order
];

const sampleCustomerNames = [
  { customer_id: '101', customer_name: 'Customer 1' },
  { customer_id: '102', customer_name: 'Customer 2' },
  { customer_id: '103', customer_name: 'Customer 3' },
  { customer_id: '104', customer_name: 'Customer 4' },
  { customer_id: '105', customer_name: 'Customer 5' },
];

(async () => {
  try {
    // Calculate monthly revenue
    const monthlyRevenue = calculateMonthlyRevenue(sampleData);
    assert.strictEqual(monthlyRevenue['2021-01'], 350, 'January 2021 revenue should be 350');
    assert.strictEqual(monthlyRevenue['2021-02'], 100, 'February 2021 revenue should be 100');
    assert.strictEqual(monthlyRevenue['2021-03'], 400, 'March 2021 revenue should be 400');
    assert.strictEqual(monthlyRevenue['2022-01'], 300, 'January 2022 revenue should be 300');
    assert.strictEqual(monthlyRevenue['2021/01'], undefined, 'Invalid date should be ignored');

    // Calculate revenue by product
    const productRevenue = calculateRevenueByProduct(sampleData);
    assert.strictEqual(productRevenue['P01'], 600, 'Product P01 revenue should be 600');
    assert.strictEqual(productRevenue['P02'], 150, 'Product P02 revenue should be 150');
    assert.strictEqual(productRevenue['P03'], 400, 'Product P03 revenue should be 400');
    assert.strictEqual(productRevenue['P04'], undefined, 'Non-existent product should not be in results');
    assert.strictEqual(productRevenue['P05'], undefined, 'Invalid order data should be ignored');

    // Calculate revenue by customer
    const customerRevenue = calculateRevenueByCustomer(sampleData);
    assert.strictEqual(customerRevenue['101'], 300, 'Customer 101 revenue should be 300');
    assert.strictEqual(customerRevenue['102'], 150, 'Customer 102 revenue should be 150');
    assert.strictEqual(customerRevenue['103'], 400, 'Customer 103 revenue should be 400');
    assert.strictEqual(customerRevenue['104'], 300, 'Customer 104 revenue should be 300');
    assert.strictEqual(customerRevenue['105'], undefined, 'Invalid order data should be ignored');

    // Get top customers by revenue
    const topCustomers = await topCustomersByRevenue(customerRevenue, sampleCustomerNames);
    assert.strictEqual(topCustomers.length, 4, 'There should be 4 top customers');
    assert.deepStrictEqual(topCustomers, [
      { customer_id: '103', customer_name: 'Customer 3' },
      { customer_id: '101', customer_name: 'Customer 1' },
      { customer_id: '104', customer_name: 'Customer 4' },
      { customer_id: '102', customer_name: 'Customer 2' }
    ], 'Top customers details should match');

    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
})();
