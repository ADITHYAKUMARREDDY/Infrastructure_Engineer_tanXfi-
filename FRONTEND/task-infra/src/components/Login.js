import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DottedButton from "./DottedButton"; // Import the DottedButton component

const LoginPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("userName", name);
    navigate("/TaskPage");
  };

  return (
    <section style={loginBackgroundStyle}>
      <div className="container" style={containerStyle}>
        <div
          className="card border-light-subtle shadow-sm mx-auto my-5"
          style={loginCardStyle}
        >
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl">
                Task - Infrastructure Engineer
              </h2>
              <p className="text-sm sm:text-base">Company: tanX</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row gy-3 gy-md-4">
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <DottedButton style={dottedButtonStyle} />{" "}
                    {/* Use the DottedButton component */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const loginBackgroundStyle = {
  backgroundImage:
    "url(https://as2.ftcdn.net/v2/jpg/04/48/14/11/1000_F_448141112_kmo2qtAHT5Fl2C2Y8HpLojnHu16Ji3Dv.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
};

const loginCardStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  overflow: "hidden",
};

const dottedButtonStyle = {
  fontSize: "0.875rem", // Smaller button size
  padding: "0.5rem 1rem",
};

export default LoginPage;
