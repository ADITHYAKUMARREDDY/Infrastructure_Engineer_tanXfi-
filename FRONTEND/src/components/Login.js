import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DottedButton from "./DottedButton";

const LoginPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    navigate("/TaskPage");
  };

  return (
    <section style={bgStyle}>
      <div className="container" style={container}>
        <div className="card shadow-sm mx-auto my-5" style={card}>
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="text-center mb-4">
              <h2>Task - Infrastructure Engineer</h2>
              <p>Company: tanX</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row gy-3">
                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <DottedButton style={buttonStyle} />
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

const bgStyle = {
  backgroundImage: "url('https://as2.ftcdn.net/v2/jpg/04/48/14/11/1000_F_448141112_kmo2qtAHT5Fl2C2Y8HpLojnHu16Ji3Dv.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const container = {
  maxWidth: "600px",
};

const card = {
  backgroundColor: "#fff",
  borderRadius: "10px",
};

const buttonStyle = {
  fontSize: "0.875rem",
  padding: "0.5rem 1rem",
};

export default LoginPage;
