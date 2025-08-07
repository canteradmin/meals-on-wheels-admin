import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Demo credentials check
      if (
        formData.email === "admin@meels.com" &&
        formData.password === "admin123"
      ) {
        const userData = {
          id: "user_001",
          name: "Admin User",
          email: formData.email,
          role: "restaurant_owner",
          restaurantId: "rest_123456",
        };

        login(userData);
        // Navigation will be handled automatically by the App component
      } else {
        setError("Invalid email or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <h1>🍽️ Meels on Wheels</h1>
            <p>Admin Panel</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className={`btn btn--primary login-btn ${
              isLoading ? "loading" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo Credentials:</p>
          <p>Email: admin@meels.com</p>
          <p>Password: admin123</p>
          <div className="register-link">
            <p>Don't have an account?</p>
            <button
              className="btn btn--secondary"
              onClick={() => navigate("/restaurant-register")}
            >
              Register Restaurant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
