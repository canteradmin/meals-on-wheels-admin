import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context";
import "./RestaurantRegister.scss";
import Context from "../Context/context";

const RestaurantRegister = () => {
  const {
    authInfo: { registerRestaurant },
  } = useContext(Context);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Sample data to pre-fill the form
  const sampleData = {
    // Owner Details
    ownerName: "John Doe",
    ownerEmail: "john@restaurant.com",
    ownerPhone: "9876543210",
    ownerPassword: "password123",
    confirmPassword: "password123",

    // Restaurant Details
    restaurantName: "Spice Garden Restaurant",
    description:
      "Authentic Indian cuisine with a modern twist. We serve the best butter chicken, biryani, and tandoori dishes in the city.",
    phone: "9876543211",
    email: "info@spicegarden.com",
    cuisine: ["Indian", "North Indian", "Mughlai", "Tandoori"],

    // Address
    street: "123 Spice Lane, Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400058",

    // Opening Hours
    monday: { open: "11:00", close: "23:00" },
    tuesday: { open: "11:00", close: "23:00" },
    wednesday: { open: "11:00", close: "23:00" },
    thursday: { open: "11:00", close: "23:00" },
    friday: { open: "11:00", close: "23:30" },
    saturday: { open: "11:00", close: "23:30" },
    sunday: { open: "12:00", close: "22:00" },

    // Delivery Settings
    deliveryRadius: 8,
    deliveryFee: 30,
    minimumOrder: 200,
  };

  const [formData, setFormData] = useState(sampleData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessPassword, setAccessPassword] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [submitClicked, setSubmitClicked] = useState(false);

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

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCuisineChange = (cuisine) => {
    setFormData((prev) => ({
      ...prev,
      cuisine: prev.cuisine.includes(cuisine)
        ? prev.cuisine.filter((c) => c !== cuisine)
        : [...prev.cuisine, cuisine],
    }));
  };

  const handleAccessSubmit = (e) => {
    e.preventDefault();
    if (accessPassword === "karthik1610") {
      setAccessGranted(true);
    } else {
      alert("Invalid access password!");
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    } else if (formData.ownerName.trim().length < 2) {
      newErrors.ownerName = "Owner name must be at least 2 characters";
    }

    if (!formData.ownerEmail.trim()) {
      newErrors.ownerEmail = "Owner email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
      newErrors.ownerEmail = "Please enter a valid email address";
    }

    if (!formData.ownerPhone.trim()) {
      newErrors.ownerPhone = "Owner phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.ownerPhone.replace(/\D/g, ""))) {
      newErrors.ownerPhone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.ownerPassword) {
      newErrors.ownerPassword = "Password is required";
    } else if (formData.ownerPassword.length < 6) {
      newErrors.ownerPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.ownerPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = "Restaurant name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Restaurant phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Restaurant email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.cuisine.length === 0) {
      newErrors.cuisine = "Please select at least one cuisine";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    console.log("Next step clicked - current step:", currentStep);
    if (currentStep === 1 && validateStep1()) {
      console.log("Moving from step 1 to step 2");
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      console.log("Moving from step 2 to step 3");
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    console.log("Previous step clicked - current step:", currentStep);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted - current step:", currentStep);
    console.log("Submit clicked flag:", submitClicked);

    // Only allow submission if submit button was clicked AND we're on step 3
    if (!submitClicked || currentStep !== 3) {
      console.log("Form submission blocked - submit not clicked or wrong step");
      return;
    }

    if (!validateStep3()) {
      console.log("Step 3 validation failed");
      return;
    }

    console.log("Starting API call for registration...");
    setIsLoading(true);

    try {
      // Prepare the API payload
      const apiPayload = {
        ownerName: formData.ownerName.trim(),
        ownerEmail: formData.ownerEmail.trim(),
        ownerPhone: formData.ownerPhone.trim(),
        ownerPassword: formData.ownerPassword,

        restaurantName: formData.restaurantName.trim(),
        description: formData.description.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        cuisine: formData.cuisine,

        address: {
          street: formData.street.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
        },

        openingHours: {
          monday: formData.monday,
          tuesday: formData.tuesday,
          wednesday: formData.wednesday,
          thursday: formData.thursday,
          friday: formData.friday,
          saturday: formData.saturday,
          sunday: formData.sunday,
        },

        deliveryRadius: formData.deliveryRadius,
        deliveryFee: formData.deliveryFee,
        minimumOrder: formData.minimumOrder,
      };

      // Make API call to register restaurant
      const response = await registerRestaurant(apiPayload);

      // if (!response.ok) {
      //   throw new Error(`Registration failed: ${response.status}`);
      // }

      console.log("Registration successful:", response);

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
      setSubmitClicked(false); // Reset the flag
    }
  };

  const handleKeyDown = (e) => {
    // Prevent Enter key form submission on non-final steps
    if (e.key === "Enter" && currentStep !== 3) {
      e.preventDefault();
      console.log("Enter key prevented - not on final step");
    }
  };

  const handleSubmitButtonClick = () => {
    console.log("Submit button clicked - setting flag");
    setSubmitClicked(true);
  };

  if (!accessGranted) {
    return (
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>🔐 Access Required</h1>
            <p>Enter the access password to register your restaurant</p>
          </div>

          <form onSubmit={handleAccessSubmit} className="access-form">
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

            <button type="submit" className="btn btn--primary">
              Continue to Registration
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderStep1 = () => (
    <div className="step-content">
      <h2>Owner Information</h2>
      <div className="form-group">
        <label htmlFor="ownerName">Owner Full Name</label>
        <input
          type="text"
          id="ownerName"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={errors.ownerName ? "error" : ""}
          required
        />
        {errors.ownerName && (
          <div className="error-message">{errors.ownerName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="ownerEmail">Owner Email Address</label>
        <input
          type="email"
          id="ownerEmail"
          name="ownerEmail"
          value={formData.ownerEmail}
          onChange={handleChange}
          placeholder="Enter your email address"
          className={errors.ownerEmail ? "error" : ""}
          required
        />
        {errors.ownerEmail && (
          <div className="error-message">{errors.ownerEmail}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="ownerPhone">Owner Phone Number</label>
        <input
          type="tel"
          id="ownerPhone"
          name="ownerPhone"
          value={formData.ownerPhone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className={errors.ownerPhone ? "error" : ""}
          required
        />
        {errors.ownerPhone && (
          <div className="error-message">{errors.ownerPhone}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="ownerPassword">Password</label>
        <input
          type="password"
          id="ownerPassword"
          name="ownerPassword"
          value={formData.ownerPassword}
          onChange={handleChange}
          placeholder="Create a password"
          className={errors.ownerPassword ? "error" : ""}
          required
        />
        {errors.ownerPassword && (
          <div className="error-message">{errors.ownerPassword}</div>
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
    </div>
  );

  const renderStep2 = () => (
    <div className="step-content">
      <h2>Restaurant Details</h2>
      <div className="form-group">
        <label htmlFor="restaurantName">Restaurant Name</label>
        <input
          type="text"
          id="restaurantName"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={handleChange}
          placeholder="Enter restaurant name"
          className={errors.restaurantName ? "error" : ""}
          required
        />
        {errors.restaurantName && (
          <div className="error-message">{errors.restaurantName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Restaurant Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your restaurant, cuisine, and specialties"
          className={errors.description ? "error" : ""}
          rows="4"
          required
        />
        {errors.description && (
          <div className="error-message">{errors.description}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Restaurant Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter restaurant phone number"
          className={errors.phone ? "error" : ""}
          required
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Restaurant Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter restaurant email address"
          className={errors.email ? "error" : ""}
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label>Cuisine Types</label>
        <div className="cuisine-options">
          {[
            "Indian",
            "North Indian",
            "South Indian",
            "Mughlai",
            "Tandoori",
            "Chinese",
            "Italian",
            "Mexican",
            "Thai",
            "Continental",
          ].map((cuisine) => (
            <label key={cuisine} className="cuisine-checkbox">
              <input
                type="checkbox"
                checked={formData.cuisine.includes(cuisine)}
                onChange={() => handleCuisineChange(cuisine)}
              />
              <span>{cuisine}</span>
            </label>
          ))}
        </div>
        {errors.cuisine && (
          <div className="error-message">{errors.cuisine}</div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="step-content">
      <h2>Address & Settings</h2>
      <div className="form-group">
        <label htmlFor="street">Street Address</label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Enter street address"
          className={errors.street ? "error" : ""}
          required
        />
        {errors.street && <div className="error-message">{errors.street}</div>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className={errors.city ? "error" : ""}
            required
          />
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className={errors.state ? "error" : ""}
            required
          />
          {errors.state && <div className="error-message">{errors.state}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="pincode">Pincode</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Enter 6-digit pincode"
          className={errors.pincode ? "error" : ""}
          maxLength="6"
          required
        />
        {errors.pincode && (
          <div className="error-message">{errors.pincode}</div>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="deliveryRadius">Delivery Radius (km)</label>
          <input
            type="number"
            id="deliveryRadius"
            name="deliveryRadius"
            value={formData.deliveryRadius}
            onChange={handleChange}
            min="1"
            max="20"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deliveryFee">Delivery Fee (₹)</label>
          <input
            type="number"
            id="deliveryFee"
            name="deliveryFee"
            value={formData.deliveryFee}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="minimumOrder">Minimum Order Amount (₹)</label>
        <input
          type="number"
          id="minimumOrder"
          name="minimumOrder"
          value={formData.minimumOrder}
          onChange={handleChange}
          min="0"
          required
        />
      </div>
    </div>
  );

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>🍽️ Restaurant Registration</h1>
          <p>Create your restaurant admin account - Step {currentStep} of 3</p>
        </div>

        <div className="step-indicator">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>1</div>
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>2</div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>3</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="register-form"
          onKeyDown={handleKeyDown}
        >
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <div className="form-actions">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="btn btn--secondary"
              >
                Previous
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn btn--primary"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn--primary register-btn"
                disabled={isLoading}
                onClick={handleSubmitButtonClick}
              >
                {isLoading ? "Creating Account..." : "Complete Registration"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantRegister;
