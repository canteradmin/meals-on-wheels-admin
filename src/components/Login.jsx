import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { authAPI, handleAPIError, tokenManager } from "../services/api";
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

    try {
      const response = await authAPI.login(formData);

      if (response.success) {
        // Store user data and token using tokenManager
        const userData = {
          ...response.data.user,
          token: response.data.token,
        };

        // Use tokenManager to set token
        tokenManager.setToken(response.data.token);

        login(userData);
        // Navigation will be handled automatically by the App component
      }
    } catch (err) {
      const errorMessage = handleAPIError(err);
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
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
