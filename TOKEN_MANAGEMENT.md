# 🔐 Token Management System Documentation

## Overview

The Meels on Wheels Admin Panel implements a comprehensive JWT token-based authentication system that securely stores and manages authentication tokens for API access.

## 🏗️ Architecture

### Token Storage

- **Location**: `localStorage`
- **Structure**: Token is stored within the user object
- **Format**: JWT Bearer token

### Token Flow

```
Login/Register → API Response → Token Storage → API Requests → Authorization Header
```

## 📁 File Structure

```
src/
├── services/
│   ├── api.js              # Main API service with token management
│   └── mockData.js         # Mock API responses
├── components/
│   ├── Login.jsx           # Login component
│   ├── RestaurantRegister.jsx # Registration component
│   └── Dashboard.jsx       # Protected dashboard
└── App.jsx                 # Main app with auth context
```

## 🔧 Token Manager API

### `tokenManager` Object

Located in `src/services/api.js`, the `tokenManager` provides centralized token management:

```javascript
export const tokenManager = {
  // Get auth token from localStorage
  getToken: () => string,

  // Set token in localStorage
  setToken: (token: string) => boolean,

  // Remove token from localStorage
  removeToken: () => boolean,

  // Check if token exists and is valid
  isTokenValid: () => boolean,

  // Get user data from localStorage
  getUser: () => object,
};
```

### Usage Examples

```javascript
import { tokenManager } from "../services/api";

// Get current token
const token = tokenManager.getToken();

// Set new token
tokenManager.setToken("new-jwt-token");

// Check if token is valid
if (tokenManager.isTokenValid()) {
  // Make authenticated requests
}

// Get user data
const user = tokenManager.getUser();

// Remove token (logout)
tokenManager.removeToken();
```

## 🔄 Authentication Flow

### 1. Login Process

```javascript
// 1. User submits login form
const response = await authAPI.login(credentials);

// 2. Store token using tokenManager
if (response.success) {
  const userData = {
    ...response.data.user,
    token: response.data.token,
  };

  // Use tokenManager to set token
  tokenManager.setToken(response.data.token);

  // Update auth context
  login(userData);
}
```

### 2. Registration Process

```javascript
// 1. User submits registration form
const response = await authAPI.register(userData);

// 2. Auto-login after successful registration
if (response.success) {
  const loginResponse = await authAPI.login({
    email: formData.email,
    password: formData.password,
  });

  // 3. Store token using tokenManager
  if (loginResponse.success) {
    tokenManager.setToken(loginResponse.data.token);
    // Navigate to dashboard
  }
}
```

### 3. API Request Flow

```javascript
// 1. Get token before making request
const token = tokenManager.getToken();

// 2. Check if token exists
if (!token) {
  throw new Error("No authentication token found. Please login again.");
}

// 3. Add token to request headers
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

// 4. Make authenticated request
const response = await fetch(url, config);
```

### 4. Logout Process

```javascript
// 1. Remove token using tokenManager
tokenManager.removeToken();

// 2. Update auth context
setIsAuthenticated(false);
setUser(null);

// 3. Redirect to login
navigate("/login");
```

## 🛡️ Security Features

### Token Validation

- **Length Check**: Basic validation for token format
- **Storage Security**: Tokens stored in localStorage with error handling
- **Automatic Cleanup**: Tokens removed on logout or session expiry

### Error Handling

```javascript
// Handle 401 Unauthorized errors
if (error.message.includes("401") || error.message.includes("Unauthorized")) {
  tokenManager.removeToken();
  window.location.href = "/login";
  return "Session expired. Please login again.";
}
```

### API Request Protection

```javascript
const apiRequest = async (endpoint, options = {}) => {
  const token = tokenManager.getToken();

  // Check if token exists before making request
  if (!token) {
    throw new Error("No authentication token found. Please login again.");
  }

  // Add token to headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Make request
  const response = await fetch(url, config);
};
```

## 🔌 API Integration

### Real API Endpoints

```javascript
// Authentication endpoints
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh

// Protected endpoints (require token)
GET /api/restaurant/menu
POST /api/restaurant/menu
PUT /api/restaurant/menu/:id
DELETE /api/restaurant/menu/:id
GET /api/restaurant/orders
PATCH /api/restaurant/orders/:id/status
GET /api/restaurant/dashboard
GET /api/restaurant/support
```

### Mock API Support

The system includes comprehensive mock API support for development:

```javascript
// Enable mock data
REACT_APP_USE_MOCK_DATA = true;

// Mock authentication responses
mockAPI.login(credentials);
mockAPI.register(userData);
mockAPI.logout();
mockAPI.refreshToken();
```

## 📱 Component Integration

### Login Component

```javascript
import { authAPI, handleAPIError, tokenManager } from "../services/api";

const handleSubmit = async (e) => {
  const response = await authAPI.login(formData);

  if (response.success) {
    // Store token using tokenManager
    tokenManager.setToken(response.data.token);
    login(userData);
  }
};
```

### Restaurant Register Component

```javascript
// After successful registration and auto-login
if (loginResponse.success) {
  // Use tokenManager to set token
  tokenManager.setToken(loginResponse.data.token);

  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("user", JSON.stringify(userData));

  navigate("/dashboard");
}
```

### Dashboard Component

```javascript
// All API calls automatically include token
const orders = await orderAPI.getOrders();
const menu = await menuAPI.getMenu();
const dashboard = await dashboardAPI.getDashboardMetrics();
```

## 🚀 Usage Examples

### Making Authenticated API Calls

```javascript
import { menuAPI, orderAPI, dashboardAPI } from "../services/api";

// All these calls automatically include the token
const menuItems = await menuAPI.getMenu();
const orders = await orderAPI.getOrders();
const metrics = await dashboardAPI.getDashboardMetrics();
```

### Manual Token Management

```javascript
import { tokenManager } from "../services/api";

// Check authentication status
if (tokenManager.isTokenValid()) {
  console.log("User is authenticated");
}

// Get current user
const user = tokenManager.getUser();
console.log("Current user:", user.name);

// Manual logout
tokenManager.removeToken();
```

### Error Handling

```javascript
import { handleAPIError } from "../services/api";

try {
  const response = await apiCall();
} catch (error) {
  const errorMessage = handleAPIError(error);
  // Handle different error types:
  // - 401: Session expired, redirect to login
  // - 403: Access denied
  // - 404: Resource not found
  // - 500: Server error
}
```

## 🔧 Configuration

### Environment Variables

```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_USE_MOCK_DATA=true

# Token Configuration
REACT_APP_TOKEN_EXPIRY=3600  # 1 hour (if needed)
```

### API Base URLs

```javascript
const API_BASE_URL = "http://localhost:5000/api";
const RESTAURANT_API_BASE_URL = `${API_BASE_URL}/restaurant`;
const AUTH_API_BASE_URL = `${API_BASE_URL}/auth`;
```

## 🧪 Testing

### Token Validation Tests

```javascript
// Test token storage
tokenManager.setToken("test-token");
expect(tokenManager.getToken()).toBe("test-token");

// Test token removal
tokenManager.removeToken();
expect(tokenManager.getToken()).toBe("");

// Test token validation
expect(tokenManager.isTokenValid()).toBe(false);
```

### API Request Tests

```javascript
// Test authenticated requests
const response = await menuAPI.getMenu();
expect(response.success).toBe(true);

// Test unauthorized requests
tokenManager.removeToken();
await expect(menuAPI.getMenu()).rejects.toThrow(
  "No authentication token found"
);
```

## 🔒 Security Best Practices

1. **Token Storage**: Tokens stored securely in localStorage with error handling
2. **Automatic Cleanup**: Tokens removed on logout and session expiry
3. **Error Handling**: Comprehensive error handling for authentication failures
4. **Mock Support**: Development-friendly mock API system
5. **Validation**: Basic token validation before API requests
6. **Centralized Management**: Single source of truth for token operations

## 🚨 Troubleshooting

### Common Issues

1. **Token Not Found**

   - Check if user is logged in
   - Verify localStorage is accessible
   - Check for token expiration

2. **401 Unauthorized**

   - Token may be expired
   - Token may be invalid
   - User session may have ended

3. **API Calls Failing**
   - Verify token is being sent in headers
   - Check API endpoint configuration
   - Ensure proper error handling

### Debug Commands

```javascript
// Check token status
console.log("Token:", tokenManager.getToken());
console.log("Is Valid:", tokenManager.isTokenValid());
console.log("User:", tokenManager.getUser());

// Check localStorage
console.log("localStorage user:", localStorage.getItem("user"));
console.log("localStorage auth:", localStorage.getItem("isAuthenticated"));
```

This token management system provides a robust, secure, and user-friendly authentication experience for the Meels on Wheels Admin Panel.
