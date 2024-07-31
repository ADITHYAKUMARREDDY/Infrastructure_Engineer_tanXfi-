  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { Input, message } from "antd";
  import { LockOutlined, UserOutlined } from "@ant-design/icons";
  import DottedButton from "./DottedButton"; // Assuming you have this component

  const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (userData && userData.email === email && userData.password === password) {
        navigate("/data");
      } else {
        message.error("Invalid email or password!");
      }
    };

    return (
      <section style={bgStyle}>
        <div className="container" style={container}>
          <div className="card shadow-sm mx-auto my-5" style={card}>
            <div className="card-body p-3 p-md-4 p-xl-5">
              <div className="text-center mb-4">
                <h2>Login</h2>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="row gy-3">
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter your email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <Input
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder="Enter your password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <DottedButton style={buttonStyle} onClick={handleLogin} />
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

  const inputStyle = {
    marginBottom: "1rem",
  };

  const buttonStyle = {
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
  };

  export default LoginPage;
