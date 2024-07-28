import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { config } from "../App";

const TaskPage = () => {
  const [euserName, setEuserName] = useState("");

  const [monthlyRevenue, setMonthlyRevenue] = useState(null);
  const [revenueByProduct, setRevenueByProduct] = useState(null);
  const [revenueByCustomer, setRevenueByCustomer] = useState(null);
  const [topCustomers, setTopCustomers] = useState(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setEuserName(storedUserName);
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchMonthlyRevenue = async () => {
    try {
      const response = await fetch(`${config.endpoint}/api/monthly-revenue`);
      const data = await response.json();
      setMonthlyRevenue(data);
      setRevenueByProduct(null);
      setRevenueByCustomer(null);
      setTopCustomers(null);
    } catch (error) {
      console.error("Error fetching monthly revenue:", error);
    }
  };

  const fetchRevenueByProduct = async () => {
    try {
      const response = await fetch(`${config.endpoint}/api/revenue-by-product`);
      const data = await response.json();
      setRevenueByProduct(data);
      setMonthlyRevenue(null);
      setRevenueByCustomer(null);
      setTopCustomers(null);
    } catch (error) {
      console.error("Error fetching revenue by product:", error);
    }
  };

  const fetchRevenueByCustomer = async () => {
    try {
      const response = await fetch(
        `${config.endpoint}/api/revenue-by-customer`
      );
      const data = await response.json();
      // console.log(data);
      setRevenueByCustomer(data);
      setMonthlyRevenue(null);
      setRevenueByProduct(null);
      setTopCustomers(null);
    } catch (error) {
      console.error("Error fetching revenue by customer:", error);
    }
  };

  const fetchTopCustomers = async () => {
    try {
      const response = await fetch(`${config.endpoint}/api/top-customers`);
      const data = await response.json();
      console.log(data);
      setTopCustomers(data);
      setMonthlyRevenue(null);
      setRevenueByProduct(null);
      setRevenueByCustomer(null);
    } catch (error) {
      console.error("Error fetching top customers:", error);
    }
  };
  // console.log(topCustomers)
  return (
    <div className="container-fluid">
      <header className="text-center my-4">
        <h2>
          Welcome, <span style={{ color: "red" }}>{euserName}</span>
        </h2>
        <div className="d-flex flex-wrap justify-content-center">
          <button
            onClick={fetchMonthlyRevenue}
            className="btn btn-secondary my-2 mx-1 animate-button"
          >
            Compute Monthly Revenue
          </button>
          <button
            onClick={fetchRevenueByProduct}
            className="btn btn-secondary my-2 mx-1 animate-button"
          >
            Compute Revenue by Product
          </button>
          <button
            onClick={fetchRevenueByCustomer}
            className="btn btn-secondary my-2 mx-1 animate-button"
          >
            Compute Revenue by Customer
          </button>
          <button
            onClick={fetchTopCustomers}
            className="btn btn-secondary my-2 mx-1 animate-button"
          >
            Identify Top 10 Customers
          </button>
        </div>
      </header>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="accordion" id="welcomeAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSummary">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSummary"
                  aria-expanded="true"
                  aria-controls="collapseSummary"
                >
                  Summary
                </button>
              </h2>
              <div
                id="collapseSummary"
                className="accordion-collapse collapse show"
                aria-labelledby="headingSummary"
                data-bs-parent="#welcomeAccordion"
              >
                <div className="accordion-body">
                  <p>
                    As an aspiring developer with a solid foundation in
                    JavaScript (MERN) and related web technologies,
                    <strong>
                      <br />G Adithya Kumar Reddy
                    </strong>{" "}
                    (CGPA: 8.76), I am eager to expand my skills and adapt to
                    new programming languages, including Python. My experience
                    includes developing dynamic web applications, RESTful APIs,
                    and handling backend functionalities. While I have primarily
                    worked with JavaScript, I am committed to learning and
                    mastering Python during any internship or job opportunity.
                    You can reach me at <strong>8074726177</strong>.
                  </p>

                  <div className="button-container">
                    <a
                      href="https://www.crio.do/learn/portfolio/kumaradithya498/"
                      className="btn btn-primary rounded-circle mx-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Portfolio
                    </a>
                    <a
                      href="https://drive.google.com/file/d/14LKcXreP1y3JOYz3DOjcLGc0r9f13TiI/view?usp=sharing"
                      className="btn btn-secondary rounded-circle mx-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resume
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTask">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTask"
                  aria-expanded="false"
                  aria-controls="collapseTask"
                >
                  Task
                </button>
              </h2>
              <div
                id="collapseTask"
                className="accordion-collapse collapse"
                aria-labelledby="headingTask"
                data-bs-parent="#welcomeAccordion"
              >
                <div
                  className="accordion-body"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  <p>
                    <strong>Problem Statement:</strong> You have been given a
                    dataset of customer orders from an online store. The data is
                    in a CSV file <code>orders.csv</code> with the following
                    columns:
                  </p>
                  <ul>
                    <li>order_id: unique identifier for each order</li>
                    <li>customer_id: unique identifier for each customer</li>
                    <li>order_date: date when the order was placed</li>
                    <li>product_id: unique identifier for each product</li>
                    <li>product_name: name of the product</li>
                    <li>product_price: price of the product</li>
                    <li>quantity: quantity of the product ordered</li>
                  </ul>
                  <p>
                    Your task is to write a program that reads the data from the
                    CSV file and performs the following tasks:
                  </p>
                  <ul>
                    <li>
                      Compute the total revenue generated by the online store
                      for each month in the dataset.
                    </li>
                    <li>
                      Compute the total revenue generated by each product in the
                      dataset.
                    </li>
                    <li>
                      Compute the total revenue generated by each customer in
                      the dataset.
                    </li>
                    <li>Identify the top 10 customers by revenue generated.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="text-content p-3">
            {monthlyRevenue && (
              <div
                className="mb-4"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <h2 style={{ textAlign: "center" }}>Monthly Revenue</h2>
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>Month</th>
                      <th style={{ textAlign: "center" }}>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(monthlyRevenue).map(([month, revenue]) => (
                      <tr key={month}>
                        <td style={{ textAlign: "center" }}>{month}</td>
                        <td style={{ textAlign: "center" }}>
                          {revenue.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {revenueByProduct && (
              <div
                className="mb-4"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <h2 style={{ textAlign: "center" }}>Revenue by Product</h2>
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>Product</th>
                      <th style={{ textAlign: "center" }}>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(revenueByProduct).map(
                      ([product, revenue]) => (
                        <tr key={product}>
                          <td style={{ textAlign: "center" }}>{product}</td>
                          <td style={{ textAlign: "center" }}>
                            {revenue.toFixed(2)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {revenueByCustomer && (
              <div
                className="mb-4"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <h2 style={{ textAlign: "center" }}>Revenue by Customer</h2>
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>Customer</th>
                      <th style={{ textAlign: "center" }}>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(revenueByCustomer).map(
                      ([customer, revenue]) => (
                        <tr key={customer}>
                          <td style={{ textAlign: "center" }}>{customer}</td>
                          <td style={{ textAlign: "center" }}>
                            {revenue.toFixed(2)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {topCustomers && (
              <div
                className="mb-4"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <h2 style={{ textAlign: "center" }}>Top 10 Customers</h2>
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>Customer ID</th>
                      <th style={{ textAlign: "center" }}>Customer Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map((x) => (
                        <tr key={x.customer_id}>
                          <td style={{ textAlign: "center" }}>{x.customer_id}</td>
                          <td style={{ textAlign: "center" }}>
                            {x.customer_name}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
