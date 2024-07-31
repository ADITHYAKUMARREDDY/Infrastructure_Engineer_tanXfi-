import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, message } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import DottedButton from './DottedButton'; // Assuming you have this component

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    const userData = { name, email, password };
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/login');
  };

  // Lock scroll when form is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Unlock scroll on cleanup
    };
  }, []);

  return (
    <section style={bgStyle}>
      <div className="container" style={container}>
        <div className="card shadow-sm mx-auto my-5" style={card}>
          <div className="card-body p-3">
            <div className="text-center mb-3">
              <h2 style={headingStyle}>Register</h2>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
              <div className="row gy-3">
                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <Input
                    prefix={<MailOutlined />}
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
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Confirm your password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <DottedButton style={buttonStyle} onClick={handleRegister} />
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
  padding: "0 10px", 
};

const container = {
  maxWidth: "100%",
  width: "100%",
  maxWidth: "400px", 
};

const card = {
  backgroundColor: "#fff",
  borderRadius: "8px", 
  padding: "1rem", 
};

const inputStyle = {
  marginBottom: "0.5rem",
};

const buttonStyle = {
  fontSize: "0.875rem",
  padding: "0.5rem 1rem",
};

const headingStyle = {
  fontSize: "1.25rem", 
};

export default RegisterPage;
