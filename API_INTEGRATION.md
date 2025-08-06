# API Integration Guide

This document explains how the React admin panel integrates with the restaurant API endpoints.

## Overview

The admin panel is designed to work with a RESTful API backend that provides all the necessary endpoints for restaurant management. The application includes both real API integration and mock data support for development.

## API Structure

### Base Configuration

- **Base URL**: `http://localhost:5000/api/restaurant`
- **Authentication**: Bearer token in Authorization header
- **Content-Type**: `application/json`

### Authentication Flow

1. User logs in with email/password
2. Backend returns JWT token
3. Token is stored in localStorage
4. All subsequent API calls include the token in Authorization header

## API Endpoints

### 1. Restaurant Management

```
GET    /api/restaurant          - Get restaurant profile
POST   /api/restaurant          - Create/Update restaurant
```

### 2. Menu Management

```
GET    /api/restaurant/menu     - Get all menu items
POST   /api/restaurant/menu     - Add new menu item
PUT    /api/restaurant/menu/:id - Update menu item
DELETE /api/restaurant/menu/:id - Delete menu item
```

### 3. Order Management

```
GET    /api/restaurant/orders                    - Get orders (with filters)
GET    /api/restaurant/orders/:id                - Get order details
PATCH  /api/restaurant/orders/:id/status         - Update order status
```

### 4. Dashboard Analytics

```
GET    /api/restaurant/dashboard                 - Get dashboard metrics
GET    /api/restaurant/reports                   - Get reports
GET    /api/restaurant/activity                  - Get recent activity
```

### 5. Settings Management

```
GET    /api/restaurant/settings                  - Get restaurant settings
PUT    /api/restaurant/settings                  - Update restaurant settings
```

### 6. Notifications

```
POST   /api/restaurant/notifications             - Send notification
```

### 7. Support Queries

```
GET    /api/restaurant/support                   - Get support queries
```

## Data Models

### Menu Item

```javascript
{
  id: "string",
  name: "string",
  description: "string",
  price: "number",
  category: "string",
  image: "string (URL)",
  isOutOfStock: "boolean",
  preparationTime: "number (minutes)",
  isVegetarian: "boolean",
  isSpicy: "boolean",
  allergens: ["string"],
  nutritionalInfo: {
    calories: "number",
    protein: "number",
    carbs: "number",
    fat: "number"
  }
}
```

### Order

```javascript
{
  id: "string",
  orderNumber: "string",
  customer: {
    name: "string",
    phone: "string"
  },
  items: [{
    name: "string",
    quantity: "number",
    price: "number"
  }],
  totalAmount: "number",
  status: "placed|confirmed|preparing|out_for_delivery|delivered|cancelled|rejected",
  createdAt: "ISO date string",
  deliveryAddress: "string",
  paymentMethod: "string",
  estimatedDeliveryTime: "ISO date string"
}
```

### Dashboard Metrics

```javascript
{
  sales: {
    today: { totalSales: "number", orderCount: "number" },
    week: { totalSales: "number", orderCount: "number" },
    month: { totalSales: "number", orderCount: "number" }
  },
  orderStatusCounts: {
    placed: "number",
    confirmed: "number",
    preparing: "number",
    out_for_delivery: "number",
    delivered: "number",
    cancelled: "number",
    rejected: "number"
  },
  recentOrders: ["Order objects"]
}
```

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000/api/restaurant

# Use mock data for development (set to 'true' to use mock data)
REACT_APP_USE_MOCK_DATA=false
```

### 2. Backend API Setup

Ensure your backend API is running on `http://localhost:5000` and implements all the required endpoints.

### 3. Authentication Setup

The login component currently uses mock authentication. To integrate with real authentication:

1. Update the login API call in `src/components/Login.jsx`
2. Ensure the backend returns a JWT token
3. The token will be automatically included in all API requests

## Development with Mock Data

For development without a backend, you can use mock data:

1. Set `REACT_APP_USE_MOCK_DATA=true` in your `.env` file
2. The application will use mock data from `src/services/mockData.js`
3. All API calls will be simulated with realistic delays

### Mock Data Features

- Realistic sample data for all entities
- Simulated API delays (600ms - 1000ms)
- Proper error handling
- Pagination support
- Filtering and sorting

## API Service Structure

### File Organization

```
src/services/
├── api.js          # Main API service with real and mock integration
├── mockData.js     # Mock data and API simulation
└── types.js        # TypeScript definitions (if using TS)
```

### Key Functions

#### Real API Integration

```javascript
import { menuAPI, orderAPI, dashboardAPI } from "../services/api";

// Get menu items
const menuItems = await menuAPI.getMenu();

// Add new item
const newItem = await menuAPI.addMenuItem(itemData);

// Update order status
await orderAPI.updateOrderStatus(orderId, { status: "preparing" });
```

#### Error Handling

```javascript
import { handleAPIError } from "../services/api";

try {
  const data = await apiCall();
} catch (error) {
  const errorMessage = handleAPIError(error);
  // Handle error appropriately
}
```

## Response Format

All API responses follow this format:

```javascript
{
  success: true,
  data: {
    // Response data
  },
  error: "Error message (if any)"
}
```

## Error Handling

The application includes comprehensive error handling:

1. **Network Errors**: Automatic retry with user feedback
2. **Authentication Errors**: Automatic logout and redirect to login
3. **Validation Errors**: Display specific error messages
4. **Server Errors**: Graceful degradation with user-friendly messages

## Testing

### API Testing

1. Use mock data for unit tests
2. Test real API integration with a running backend
3. Test error scenarios and edge cases

### Component Testing

1. Test components with mock API responses
2. Test loading and error states
3. Test user interactions and form submissions

## Deployment

### Production Setup

1. Set `REACT_APP_USE_MOCK_DATA=false`
2. Configure production API URL
3. Ensure proper CORS configuration on backend
4. Set up proper authentication and authorization

### Environment Variables

```env
# Production
REACT_APP_API_BASE_URL=https://your-api-domain.com/api/restaurant
REACT_APP_USE_MOCK_DATA=false

# Development
REACT_APP_API_BASE_URL=http://localhost:5000/api/restaurant
REACT_APP_USE_MOCK_DATA=true
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend allows requests from frontend domain
2. **Authentication Errors**: Check token format and expiration
3. **Network Errors**: Verify API URL and server status
4. **Data Format Errors**: Ensure API responses match expected format

### Debug Mode

Enable debug logging by setting:

```javascript
localStorage.setItem("debug", "true");
```

## Security Considerations

1. **Token Storage**: JWT tokens are stored in localStorage (consider httpOnly cookies for production)
2. **Input Validation**: All user inputs are validated before API calls
3. **Error Messages**: Avoid exposing sensitive information in error messages
4. **HTTPS**: Use HTTPS in production for all API communications

## Performance Optimization

1. **Caching**: Implement caching for frequently accessed data
2. **Pagination**: Use pagination for large datasets
3. **Debouncing**: Debounce search inputs to reduce API calls
4. **Loading States**: Show loading indicators for better UX

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live order updates
2. **Offline Support**: Service worker for offline functionality
3. **Advanced Analytics**: More detailed reporting and analytics
4. **Multi-language Support**: Internationalization for multiple languages
5. **Mobile App**: React Native version for mobile devices
