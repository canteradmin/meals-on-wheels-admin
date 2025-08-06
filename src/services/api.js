// Import mock data and API
import { mockAPI } from "./mockData";

// API Configuration
const API_BASE_URL = "http://localhost:5000/api";
const RESTAURANT_API_BASE_URL = `${API_BASE_URL}/restaurant`;
const AUTH_API_BASE_URL = `${API_BASE_URL}/auth`;
const USE_MOCK_DATA =
  process.env.REACT_APP_USE_MOCK_DATA === "true" || !API_BASE_URL;

// Token Management Utilities
export const tokenManager = {
  // Get auth token from localStorage
  getToken: () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.token || "";
    } catch (error) {
      console.error("Error getting token:", error);
      return "";
    }
  },

  // Set token in localStorage
  setToken: (token) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      user.token = token;
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Error setting token:", error);
      return false;
    }
  },

  // Remove token from localStorage
  removeToken: () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      return true;
    } catch (error) {
      console.error("Error removing token:", error);
      return false;
    }
  },

  // Check if token exists and is valid
  isTokenValid: () => {
    const token = tokenManager.getToken();
    if (!token) return false;

    // Basic token validation (you can add JWT decode logic here)
    return token.length > 10; // Simple check for token length
  },

  // Get user data from localStorage
  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch (error) {
      console.error("Error getting user data:", error);
      return {};
    }
  },
};

// Helper function to get auth token (legacy - use tokenManager.getToken() instead)
const getAuthToken = () => {
  return tokenManager.getToken();
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP error! status: ${response.status}`);
  }

  return data;
};

// Helper function to make API requests (for restaurant endpoints)
const apiRequest = async (endpoint, options = {}) => {
  const token = tokenManager.getToken();

  // Check if token exists before making request
  if (!token) {
    throw new Error("No authentication token found. Please login again.");
  }

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(
      `${RESTAURANT_API_BASE_URL}${endpoint}`,
      config
    );
    return await handleResponse(response);
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// Helper function to make API requests (for auth endpoints - no token required)
const authRequest = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${AUTH_API_BASE_URL}${endpoint}`, config);
    return await handleResponse(response);
  } catch (error) {
    console.error("Auth API Request Error:", error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  // Login
  login: async (credentials) => {
    if (USE_MOCK_DATA) {
      return await mockAPI.login(credentials);
    }
    return authRequest("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // Register
  register: async (userData) => {
    if (USE_MOCK_DATA) {
      return await mockAPI.register(userData);
    }
    return authRequest("/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Logout
  logout: async () => {
    if (USE_MOCK_DATA) {
      return await mockAPI.logout();
    }
    return authRequest("/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenManager.getToken()}`,
      },
    });
  },

  // Refresh token (if needed)
  refreshToken: async () => {
    if (USE_MOCK_DATA) {
      return await mockAPI.refreshToken();
    }
    return authRequest("/refresh", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenManager.getToken()}`,
      },
    });
  },
};

// Restaurant Management APIs
export const restaurantAPI = {
  // Get restaurant profile
  getProfile: () => apiRequest(""),

  // Create/Update restaurant
  updateProfile: (data) =>
    apiRequest("", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Menu Management APIs
export const menuAPI = {
  // Get all menu items
  getMenu: async () => {
    if (USE_MOCK_DATA) {
      return await mockAPI.getMenu();
    }
    return apiRequest("/menu");
  },

  // Add new menu item
  addMenuItem: async (itemData) => {
    if (USE_MOCK_DATA) {
      return await mockAPI.addMenuItem(itemData);
    }
    return apiRequest("/menu", {
      method: "POST",
      body: JSON.stringify(itemData),
    });
  },

  // Update menu item
  updateMenuItem: async (itemId, updateData) => {
    if (USE_MOCK_DATA) {
      return await mockAPI.updateMenuItem(itemId, updateData);
    }
    return apiRequest(`/menu/${itemId}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  },

  // Delete menu item
  deleteMenuItem: async (itemId) => {
    if (USE_MOCK_DATA) {
      return await mockAPI.deleteMenuItem(itemId);
    }
    return apiRequest(`/menu/${itemId}`, {
      method: "DELETE",
    });
  },
};

// Order Management APIs
export const orderAPI = {
  // Get orders with filters
  getOrders: async (params = {}) => {
    if (USE_MOCK_DATA) {
      return await mockAPI.getOrders(params);
    }
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/orders?${queryString}`);
  },

  // Get specific order details
  getOrderDetails: (orderId) => apiRequest(`/orders/${orderId}`),

  // Update order status
  updateOrderStatus: async (orderId, statusData) => {
    if (USE_MOCK_DATA) {
      return await mockAPI.updateOrderStatus(orderId, statusData);
    }
    return apiRequest(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify(statusData),
    });
  },
};

// Dashboard Analytics APIs
export const dashboardAPI = {
  // Get dashboard metrics
  getDashboardMetrics: async () => {
    if (USE_MOCK_DATA) {
      return await mockAPI.getDashboardMetrics();
    }
    return apiRequest("/dashboard");
  },

  // Get reports
  getReports: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/reports?${queryString}`);
  },

  // Get recent activity
  getRecentActivity: async (limit = 20) => {
    if (USE_MOCK_DATA) {
      return await mockAPI.getRecentActivity(limit);
    }
    return apiRequest(`/activity?limit=${limit}`);
  },
};

// Settings Management APIs
export const settingsAPI = {
  // Get restaurant settings
  getSettings: () => apiRequest("/settings"),

  // Update restaurant settings
  updateSettings: (settingsData) =>
    apiRequest("/settings", {
      method: "PUT",
      body: JSON.stringify(settingsData),
    }),
};

// Notifications API
export const notificationAPI = {
  // Send notification
  sendNotification: (notificationData) =>
    apiRequest("/notifications", {
      method: "POST",
      body: JSON.stringify(notificationData),
    }),
};

// Support Queries API
export const supportAPI = {
  // Get support queries
  getSupportQueries: async (params = {}) => {
    if (USE_MOCK_DATA) {
      return await mockAPI.getSupportQueries(params);
    }
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/support?${queryString}`);
  },
};

// Error handling utility
export const handleAPIError = (error) => {
  console.error("API Error:", error);

  if (error.message.includes("401") || error.message.includes("Unauthorized")) {
    // Handle authentication error
    tokenManager.removeToken();
    window.location.href = "/login";
    return "Session expired. Please login again.";
  }

  if (error.message.includes("403") || error.message.includes("Forbidden")) {
    return "Access denied. You don't have permission to perform this action.";
  }

  if (error.message.includes("404") || error.message.includes("Not Found")) {
    return "Resource not found. Please check your request.";
  }

  if (
    error.message.includes("500") ||
    error.message.includes("Internal Server Error")
  ) {
    return "Server error. Please try again later.";
  }

  return error.message || "An unexpected error occurred.";
};

// API response formatters
export const formatOrderData = (order) => ({
  id: order.id,
  orderNumber: order.orderNumber,
  customerName: order.customer?.name || "Unknown Customer",
  customerPhone: order.customer?.phone || "",
  items: order.items || [],
  totalAmount: order.totalAmount,
  status: order.status,
  orderDate: new Date(order.createdAt).toLocaleDateString(),
  orderTime: new Date(order.createdAt).toLocaleTimeString(),
  deliveryAddress: order.deliveryAddress,
  paymentMethod: order.paymentMethod,
  estimatedDeliveryTime: order.estimatedDeliveryTime,
});

export const formatMenuItemData = (item) => ({
  id: item.id,
  name: item.name,
  description: item.description,
  price: item.price,
  category: item.category,
  image: item.image,
  available: !item.isOutOfStock,
  preparationTime: item.preparationTime,
  isVegetarian: item.isVegetarian,
  isSpicy: item.isSpicy,
  allergens: item.allergens || [],
  nutritionalInfo: item.nutritionalInfo || {},
});

export const formatDashboardData = (data) => ({
  sales: data.sales || {},
  orderStatusCounts: data.orderStatusCounts || {},
  recentOrders: (data.recentOrders || []).map(formatOrderData),
});

// Export all APIs
export default {
  auth: authAPI,
  restaurant: restaurantAPI,
  menu: menuAPI,
  order: orderAPI,
  dashboard: dashboardAPI,
  settings: settingsAPI,
  notification: notificationAPI,
  support: supportAPI,
  tokenManager,
};
