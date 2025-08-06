import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authAPI, handleAPIError, tokenManager } from "../services/api";
import "./RestaurantRegister.scss";

const RestaurantRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessPassword, setAccessPassword] = useState("");

  // Check URL for password parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const passwordParam = urlParams.get("karthik1610");

    if (passwordParam === "karthik1610") {
      setAccessGranted(true);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: "restaurant_owner",
      };

      const response = await authAPI.register(userData);

      if (response.success) {
        // Auto-login after successful registration
        const loginResponse = await authAPI.login({
          email: formData.email,
          password: formData.password,
        });

        if (loginResponse.success) {
          // Store user data and token using tokenManager
          const userData = {
            ...loginResponse.data.user,
            token: loginResponse.data.token,
          };

          // Use tokenManager to set token
          tokenManager.setToken(loginResponse.data.token);

          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(userData));

          // Redirect to dashboard
          navigate("/dashboard");
        }
      }
    } catch (error) {
      const errorMessage = handleAPIError(error);
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccessSubmit = (e) => {
    e.preventDefault();
    if (accessPassword === "karthik1610") {
      setAccessGranted(true);
    } else {
      setErrors({ access: "Invalid access password" });
    }
  };

  // Show access password form if not granted access
  if (!accessGranted) {
    return (
      <div className="restaurant-register">
        <div className="register-card">
          <div className="register-header">
            <div className="logo">
              <h1>🍽️ Meels on Wheels</h1>
              <p>Restaurant Registration</p>
            </div>
          </div>

          <div className="access-form">
            <h2>Access Required</h2>
            <p>Please enter the access password to register your restaurant.</p>

            <form onSubmit={handleAccessSubmit}>
              <div className="form-group">
                <label htmlFor="accessPassword">Access Password</label>
                <input
                  type="password"
                  id="accessPassword"
                  value={accessPassword}
                  onChange={(e) => setAccessPassword(e.target.value)}
                  placeholder="Enter access password"
                  required
                />
              </div>

              {errors.access && (
                <div className="error-message">{errors.access}</div>
              )}

              <button type="submit" className="btn btn--primary">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-register">
      <div className="register-card">
        <div className="register-header">
          <div className="logo">
            <h1>🍽️ Meels on Wheels</h1>
            <p>Restaurant Registration</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Restaurant Owner Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? "error" : ""}
              required
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={errors.email ? "error" : ""}
              required
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={errors.phone ? "error" : ""}
              required
            />
            {errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={errors.password ? "error" : ""}
              required
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? "error" : ""}
              required
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}

          <button
            type="submit"
            className={`btn btn--primary register-btn ${
              isLoading ? "loading" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Register Restaurant"}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account?</p>
          <button
            className="btn btn--secondary"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantRegister;
