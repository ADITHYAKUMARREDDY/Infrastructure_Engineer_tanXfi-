import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { config } from "../App";

const TaskPage = () => {
  const [locname, setlocname] = useState("");
  const [MonthlyRev, setMonthlyRev] = useState(null);
  const [RevByProduct, setRevByProduct] = useState(null);
  const [RevByCustomer, setRevByCustomer] = useState(null);
  const [topCustByRev, settopCustByRev] = useState(null);
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setlocname(storedUserName);
    }
  }, []);

 

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      const currentPrice = parseFloat(data.c);
      setBitcoinPrice(currentPrice);

      if (currentPrice >65143) {
        try {
          const response = await fetch(`${config.endpoint}/api/price-alert`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: currentPrice }),
          });

          const result = await response.json();
          console.log(result.message);
        } catch (error) {
          console.error("Error sending price alert:", error);
        }
      }
    };

    return () => ws.close(); // Clean up the WebSocket connection on component unmount
  }, []);

  const fetchMonthlyRev = async () => {
    try {
      const response = await fetch(`${config.endpoint}/api/monthly-revenue`);
      const data = await response.json();
      setMonthlyRev(data);
      setRevByProduct(null);
      setRevByCustomer(null);
      settopCustByRev(null);
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
      settopCustByRev(null);
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
      settopCustByRev(null);
    } catch (error) {
      console.error("Error fetching revenue by customer:", error);
    }
  };

  const fetchtopCustByRev = async () => {
    try {
      const response = await fetch(`${config.endpoint}/api/top-customers`);
      const data = await response.json();
      console.log(data);
      settopCustByRev(data);
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
          Welcome, <span style={{ color: "red" }}>{locname}</span>
        </h2>
        <div className="d-flex flex-wrap justify-content-center">
          <button
            onClick={fetchMonthlyRev}
            className="btn btn-secondary my-2 mx-1 animate-button"
          >
            Compute Monthly Revenue
          </button>
          <button
            onClick={fetchRevByProduct}
            className="btn btn-secondary my-2 mx-1 animate-button"
          >
            Compute Revenue by Product
          </button>
          <button
            onClick={fetchRevByCustomer}
            className="btn btn-secondary my-2 mx-1 animate-button"
          >
            Compute Revenue by Customer
          </button>
          <button
            onClick={fetchtopCustByRev}
            className="btn btn-secondary my-2 mx-1 animate-button"
          >
            Identify Top 10 Customers
          </button>
        </div>
        <div className="text-center my-4">
          <h4>
            <strong>Current Bitcoin Price:</strong>{" "}
            {bitcoinPrice !== null
              ? `$${bitcoinPrice.toFixed(2)}`
              : "Loading..."}
          </h4>
        </div>
      </header>

      <div className="row">
        <div className="col-md-4">
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
                      Identify the top 10 customers who have generated the
                      highest revenue.
                    </li>
                    <li>
                      Compute the total revenue generated by each product.
                    </li>
                    <li>
                      Compute the total revenue generated by each customer.
                    </li>
                  </ul>
                  <p>
                    Write the implementation in JavaScript using Node.js and
                    deploy the solution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="p-4">
            {MonthlyRev && (
              <div className="my-4">
                <h4>Monthly Revenue:</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(MonthlyRev).map(
                      ([month, revenue], index) => (
                        <tr key={index}>
                          <td>{month}</td>
                          <td>{revenue}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {RevByProduct && (
              <div className="my-4">
                <h4>Revenue by Product:</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Total Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(RevByProduct).map(
                      ([product_name, total_revenue], index) => (
                        <tr key={index}>
                          <td>{product_name}</td>
                          <td>{total_revenue}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {RevByCustomer && (
              <div className="my-4">
                <h4>Revenue by Customer:</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Customer ID</th>
                      <th>Total Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(RevByCustomer).map(
                      ([customer_id, total_revenue], index) => (
                        <tr key={index}>
                          <td>{customer_id}</td>
                          <td>{total_revenue}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {topCustByRev && topCustByRev.length > 0 && (
              <div className="my-4">
                <h4>Top 10 Customers by Revenue:</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Customer ID</th>
                      <th>Customer Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustByRev.map((item, index) => (
                      <tr key={index}>
                        <td>{item.customer_id}</td>
                        <td>{item.customer_name}</td>
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
