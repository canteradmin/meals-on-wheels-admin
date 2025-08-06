// Mock data for development and testing
// This file provides sample API responses when the real API is not available

export const mockDashboardData = {
  success: true,
  data: {
    sales: {
      today: { totalSales: 15000, orderCount: 25 },
      week: { totalSales: 85000, orderCount: 150 },
      month: { totalSales: 350000, orderCount: 650 },
    },
    orderStatusCounts: {
      placed: 8,
      confirmed: 5,
      preparing: 3,
      out_for_delivery: 2,
      delivered: 120,
      cancelled: 3,
      rejected: 1,
    },
    recentOrders: [
      {
        id: "order_001",
        orderNumber: "#1234",
        customer: { name: "John Doe", phone: "+91 9876543210" },
        items: [
          { name: "Chicken Biryani", quantity: 2, price: 350 },
          { name: "Naan Bread", quantity: 3, price: 30 },
        ],
        totalAmount: 790,
        status: "placed",
        createdAt: "2024-01-15T10:30:00Z",
        deliveryAddress: "123 Main St, Mumbai, Maharashtra",
        paymentMethod: "online",
        estimatedDeliveryTime: "2024-01-15T11:30:00Z",
      },
      {
        id: "order_002",
        orderNumber: "#1233",
        customer: { name: "Jane Smith", phone: "+91 9876543211" },
        items: [
          { name: "Butter Chicken", quantity: 1, price: 380 },
          { name: "Rice", quantity: 1, price: 80 },
        ],
        totalAmount: 460,
        status: "preparing",
        createdAt: "2024-01-15T09:15:00Z",
        deliveryAddress: "456 Oak Ave, Mumbai, Maharashtra",
        paymentMethod: "cod",
        estimatedDeliveryTime: "2024-01-15T10:30:00Z",
      },
    ],
  },
};

export const mockMenuData = {
  success: true,
  data: [
    {
      id: "item_001",
      name: "Chicken Biryani",
      description: "Aromatic rice dish with tender chicken and spices",
      price: 350,
      category: "Main Course",
      image: "https://example.com/chicken-biryani.jpg",
      isOutOfStock: false,
      preparationTime: 25,
      isVegetarian: false,
      isSpicy: true,
      allergens: ["dairy"],
      nutritionalInfo: {
        calories: 450,
        protein: 25,
        carbs: 15,
        fat: 30,
      },
    },
    {
      id: "item_002",
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken",
      price: 380,
      category: "Main Course",
      image: "https://example.com/butter-chicken.jpg",
      isOutOfStock: false,
      preparationTime: 20,
      isVegetarian: false,
      isSpicy: false,
      allergens: ["dairy"],
      nutritionalInfo: {
        calories: 380,
        protein: 22,
        carbs: 12,
        fat: 28,
      },
    },
    {
      id: "item_003",
      name: "Dal Makhani",
      description: "Creamy black lentils slow-cooked with spices",
      price: 180,
      category: "Main Course",
      image: "https://example.com/dal-makhani.jpg",
      isOutOfStock: false,
      preparationTime: 15,
      isVegetarian: true,
      isSpicy: false,
      allergens: ["dairy"],
      nutritionalInfo: {
        calories: 280,
        protein: 12,
        carbs: 45,
        fat: 8,
      },
    },
  ],
};

export const mockOrdersData = {
  success: true,
  data: {
    orders: [
      {
        id: "order_001",
        orderNumber: "#1234",
        customer: { name: "John Doe", phone: "+91 9876543210" },
        items: [
          { name: "Chicken Biryani", quantity: 2, price: 350 },
          { name: "Naan Bread", quantity: 3, price: 30 },
        ],
        totalAmount: 790,
        status: "placed",
        createdAt: "2024-01-15T10:30:00Z",
        deliveryAddress: "123 Main St, Mumbai, Maharashtra",
        paymentMethod: "online",
        estimatedDeliveryTime: "2024-01-15T11:30:00Z",
      },
      {
        id: "order_002",
        orderNumber: "#1233",
        customer: { name: "Jane Smith", phone: "+91 9876543211" },
        items: [
          { name: "Butter Chicken", quantity: 1, price: 380 },
          { name: "Rice", quantity: 1, price: 80 },
        ],
        totalAmount: 460,
        status: "preparing",
        createdAt: "2024-01-15T09:15:00Z",
        deliveryAddress: "456 Oak Ave, Mumbai, Maharashtra",
        paymentMethod: "cod",
        estimatedDeliveryTime: "2024-01-15T10:30:00Z",
      },
      {
        id: "order_003",
        orderNumber: "#1232",
        customer: { name: "Mike Johnson", phone: "+91 9876543212" },
        items: [
          { name: "Tandoori Chicken", quantity: 1, price: 420 },
          { name: "Raita", quantity: 1, price: 60 },
        ],
        totalAmount: 480,
        status: "delivered",
        createdAt: "2024-01-15T08:00:00Z",
        deliveryAddress: "789 Pine Rd, Mumbai, Maharashtra",
        paymentMethod: "online",
        estimatedDeliveryTime: "2024-01-15T09:00:00Z",
      },
    ],
    totalPages: 1,
    currentPage: 1,
    totalOrders: 3,
  },
};

export const mockActivityData = {
  success: true,
  data: {
    activities: [
      {
        id: "order_001",
        type: "order",
        action: "Order #1234 placed",
        description: "2 items - ₹790",
        timestamp: "2024-01-15T10:30:00Z",
        status: "placed",
        customer: "John Doe",
      },
      {
        id: "order_002",
        type: "order",
        action: "Order #1233 status updated",
        description: "Status changed to preparing",
        timestamp: "2024-01-15T09:45:00Z",
        status: "preparing",
        customer: "Jane Smith",
      },
      {
        id: "support_001",
        type: "support",
        action: "Support ticket opened",
        description: "Late delivery issue",
        timestamp: "2024-01-15T09:15:00Z",
        status: "open",
        customer: "Alice Johnson",
      },
    ],
    total: 3,
  },
};

export const mockSupportData = {
  success: true,
  data: {
    tickets: [
      {
        id: "T001",
        customerName: "Alice Johnson",
        customerEmail: "alice@example.com",
        customerPhone: "+91 9876543213",
        subject: "Order not delivered on time",
        message:
          "I placed an order 2 hours ago and it still hasn't been delivered. The estimated delivery time was 45 minutes.",
        status: "open",
        priority: "high",
        createdAt: "2024-01-15T08:30:00Z",
        assignedTo: "support_team",
      },
      {
        id: "T002",
        customerName: "Bob Smith",
        customerEmail: "bob@example.com",
        customerPhone: "+91 9876543214",
        subject: "Wrong item received",
        message:
          "I ordered Chicken Biryani but received Butter Chicken instead. Please help me resolve this issue.",
        status: "in_progress",
        priority: "medium",
        createdAt: "2024-01-15T06:45:00Z",
        assignedTo: "admin",
      },
      {
        id: "T003",
        customerName: "Carol Davis",
        customerEmail: "carol@example.com",
        customerPhone: "+91 9876543215",
        subject: "Payment refund request",
        message:
          "I would like to request a refund for my last order as the food was cold when it arrived.",
        status: "resolved",
        priority: "low",
        createdAt: "2024-01-14T15:20:00Z",
        assignedTo: "support_team",
      },
    ],
    totalPages: 1,
    currentPage: 1,
    totalTickets: 3,
  },
};

// Mock API functions for development
export const mockAPI = {
  // Simulate API delay
  delay: (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Mock Authentication API
  login: async (credentials) => {
    await mockAPI.delay(800);

    // Simulate login validation
    if (
      credentials.email === "admin@meels.com" &&
      credentials.password === "admin123"
    ) {
      return {
        success: true,
        data: {
          user: {
            id: "user_001",
            name: "Admin User",
            email: credentials.email,
            role: "restaurant_owner",
            restaurantId: "rest_123456",
          },
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6InJlc3RhdXJhbnRfb3duZXIiLCJpYXQiOjE3MzQ1Njc4OTAsImV4cCI6MTczNDY1NDI5MH0.example_token",
        },
      };
    } else {
      throw new Error("Invalid email or password");
    }
  },

  register: async (userData) => {
    await mockAPI.delay(1000);

    // Simulate registration
    return {
      success: true,
      data: {
        user: {
          id: `user_${Date.now()}`,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role || "restaurant_owner",
          restaurantId: `rest_${Date.now()}`,
        },
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6InJlc3RhdXJhbnRfb3duZXIiLCJpYXQiOjE3MzQ1Njc4OTAsImV4cCI6MTczNDY1NDI5MH0.example_token",
        message: "Registration successful",
      },
    };
  },

  logout: async () => {
    await mockAPI.delay(500);
    return {
      success: true,
      data: {
        message: "Logout successful",
      },
    };
  },

  refreshToken: async () => {
    await mockAPI.delay(600);
    return {
      success: true,
      data: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6InJlc3RhdXJhbnRfb3duZXIiLCJpYXQiOjE3MzQ1Njc4OTAsImV4cCI6MTczNDY1NDI5MH0.refreshed_token",
        message: "Token refreshed successfully",
      },
    };
  },

  // Mock dashboard API
  getDashboardMetrics: async () => {
    await mockAPI.delay(800);
    return mockDashboardData;
  },

  getRecentActivity: async (limit = 10) => {
    await mockAPI.delay(600);
    return {
      ...mockActivityData,
      data: {
        ...mockActivityData.data,
        activities: mockActivityData.data.activities.slice(0, limit),
      },
    };
  },

  // Mock menu API
  getMenu: async () => {
    await mockAPI.delay(700);
    return mockMenuData;
  },

  addMenuItem: async (itemData) => {
    await mockAPI.delay(1000);
    const newItem = {
      id: `item_${Date.now()}`,
      ...itemData,
      isOutOfStock: false,
    };
    return {
      success: true,
      data: newItem,
    };
  },

  updateMenuItem: async (itemId, updateData) => {
    await mockAPI.delay(800);
    return {
      success: true,
      data: { id: itemId, ...updateData },
    };
  },

  deleteMenuItem: async (itemId) => {
    await mockAPI.delay(600);
    return {
      success: true,
      data: { id: itemId },
    };
  },

  // Mock orders API
  getOrders: async (params = {}) => {
    await mockAPI.delay(900);
    let filteredOrders = [...mockOrdersData.data.orders];

    if (params.status && params.status !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === params.status
      );
    }

    return {
      success: true,
      data: {
        orders: filteredOrders,
        totalPages: 1,
        currentPage: params.page || 1,
        totalOrders: filteredOrders.length,
      },
    };
  },

  updateOrderStatus: async (orderId, statusData) => {
    await mockAPI.delay(800);
    return {
      success: true,
      data: { id: orderId, ...statusData },
    };
  },

  // Mock support API
  getSupportQueries: async (params = {}) => {
    await mockAPI.delay(700);
    let filteredTickets = [...mockSupportData.data.tickets];

    if (params.status && params.status !== "all") {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.status === params.status
      );
    }

    return {
      success: true,
      data: {
        tickets: filteredTickets,
        totalPages: 1,
        currentPage: params.page || 1,
        totalTickets: filteredTickets.length,
      },
    };
  },
};
