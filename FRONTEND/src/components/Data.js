import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { config } from "../App";

const TaskPage = () => {
  const [userName, setUserName] = useState("");
  const [monthlyRev, setMonthlyRev] = useState(null);
  const [revByProduct, setRevByProduct] = useState(null);
  const [revByCustomer, setRevByCustomer] = useState(null);
  const [topCustomers, setTopCustomers] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchMonthlyRev = async () => {
    try {
      const response = await fetch(`${config.endpoint}/api/monthly-revenue`);
      const data = await response.json();
      setMonthlyRev(data);
      setRevByProduct(null);
      setRevByCustomer(null);
      setTopCustomers(null);
    } catch (error) {
      console.error("Error fetching monthly revenue:", error);
    }
  };

  const fetchRevByProduct = async () => {
    try {
      const response = await fetch(`${config.endpoint}/api/revenue-by-product`);
      const data = await response.json();
      setRevByProduct(data);
      setMonthlyRev(null);
      setRevByCustomer(null);
      setTopCustomers(null);
    } catch (error) {
      console.error("Error fetching revenue by product:", error);
    }
  };

  const fetchRevByCustomer = async () => {
    try {
      const response = await fetch(
        `${config.endpoint}/api/revenue-by-customer`
      );
      const data = await response.json();
      setRevByCustomer(data);
      setMonthlyRev(null);
      setRevByProduct(null);
      setTopCustomers(null);
    } catch (error) {
      console.error("Error fetching revenue by customer:", error);
    }
  };

  const fetchTopCustomers = async () => {
    try {
      const response = await fetch(`${config.endpoint}/api/top-customers`);
      const data = await response.json();
      setTopCustomers(data);
      setMonthlyRev(null);
      setRevByProduct(null);
      setRevByCustomer(null);
    } catch (error) {
      console.error("Error fetching top customers:", error);
    }
  };

  return (
    <div className="container-fluid">
      <header className="text-center my-4">
        <h2>
          Welcome, <span style={{ color: "red" }}>{userName}</span>
        </h2>
        <div className="d-flex flex-wrap justify-content-center">
          <button
            onClick={fetchMonthlyRev}
            className="btn btn-secondary my-2 mx-1"
          >
            Compute Monthly Revenue
          </button>
          <button
            onClick={fetchRevByProduct}
            className="btn btn-secondary my-2 mx-1"
          >
            Compute Revenue by Product
          </button>
          <button
            onClick={fetchRevByCustomer}
            className="btn btn-secondary my-2 mx-1"
          >
            Compute Revenue by Customer
          </button>
          <button
            onClick={fetchTopCustomers}
            className="btn btn-secondary my-2 mx-1"
          >
            Identify Top 10 Customers
          </button>
        </div>
      </header>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="accordion" id="infoAccordion">
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
                data-bs-parent="#infoAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      I have a solid foundation in JavaScript (MERN) and related
                      web technologies.
                    </li>
                    <li>
                      <strong>My name is G Adithya Kumar Reddy</strong>, and I
                      have a CGPA of 8.76.
                    </li>
                    <li>
                      I am eager to expand my skills and adapt to new
                      programming languages, including Python.
                    </li>
                    <li>
                      My experience includes developing dynamic web
                      applications, RESTful APIs, and handling backend
                      functionalities.
                    </li>
                    <li>
                      While I have primarily worked with JavaScript, I am
                      committed to learning and mastering Python during any
                      internship or job opportunity.
                    </li>
                    <li>
                      <strong>You can reach me at 8074726177.</strong>
                    </li>
                  </ul>

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
                data-bs-parent="#infoAccordion"
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
            {monthlyRev && (
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
                    {Object.entries(monthlyRev).map(([month, revenue]) => (
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

            {revByProduct && (
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
                    {Object.entries(revByProduct).map(([product, revenue]) => (
                      <tr key={product}>
                        <td style={{ textAlign: "center" }}>{product}</td>
                        <td style={{ textAlign: "center" }}>
                          {revenue.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {revByCustomer && (
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
                    {Object.entries(revByCustomer).map(
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
                      <th style={{ textAlign: "center" }}>Customer</th>
                      <th style={{ textAlign: "center" }}>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(topCustomers).map(([customer, revenue]) => (
                      <tr key={customer}>
                        <td style={{ textAlign: "center" }}>{customer}</td>
                        <td style={{ textAlign: "center" }}>
                          {revenue.toFixed(2)}
                        </td>
                      </tr>
                    ))}
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
