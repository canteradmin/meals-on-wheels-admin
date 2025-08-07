import React, { useState, useEffect } from "react";
import "./RecentOrders.scss";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const mockOrders = [
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
      ];

      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      placed: "#ff6b6b",
      confirmed: "#4ecdc4",
      preparing: "#45b7d1",
      out_for_delivery: "#96ceb4",
      delivered: "#60b246",
      cancelled: "#ff6b6b",
      rejected: "#ff6b6b",
    };
    return statusColors[status] || "#686b78";
  };

  const getStatusDisplayName = (status) => {
    const statusNames = {
      placed: "Placed",
      confirmed: "Confirmed",
      preparing: "Preparing",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
      cancelled: "Cancelled",
      rejected: "Rejected",
    };
    return statusNames[status] || status;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="recent-orders">
        <div className="orders-header">
          <h2>Recent Orders</h2>
          <p>Manage and track customer orders</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-orders">
      <div className="orders-header">
        <h2>Recent Orders</h2>
        <p>Manage and track customer orders</p>
      </div>

      <div className="orders-controls">
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="status-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="placed">Placed</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="actions">
          <button className="btn btn--secondary">Export Orders</button>
        </div>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>{order.orderNumber}</strong>
                </td>
                <td>
                  <div className="customer-info">
                    <p className="customer-name">{order.customer.name}</p>
                    <p className="customer-phone">{order.customer.phone}</p>
                  </div>
                </td>
                <td>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <span key={index} className="item">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <strong>{formatCurrency(order.totalAmount)}</strong>
                </td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusDisplayName(order.status)}
                  </span>
                </td>
                <td>
                  <div className="order-date">
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="time">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="order-actions">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="placed">Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="btn btn--small">View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="no-orders">
            <p>No orders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
