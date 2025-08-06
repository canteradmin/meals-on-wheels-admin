import React, { useState, useEffect } from "react";
import { orderAPI, handleAPIError, formatOrderData } from "../../services/api";
import "./RecentOrders.scss";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [filterStatus, currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: currentPage,
        limit: 10,
      };

      if (filterStatus !== "all") {
        params.status = filterStatus;
      }

      const response = await orderAPI.getOrders(params);
      const formattedOrders = (response.data.orders || []).map(formatOrderData);

      setOrders(formattedOrders);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      const errorMessage = handleAPIError(err);
      setError(errorMessage);
      console.error("Orders fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, {
        status: newStatus,
        message: `Order status updated to ${newStatus}`,
      });

      // Update local state
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      const errorMessage = handleAPIError(err);
      console.error("Update order status error:", err);
      alert(`Failed to update order status: ${errorMessage}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "placed":
        return "warning";
      case "confirmed":
        return "info";
      case "preparing":
        return "primary";
      case "out_for_delivery":
        return "info";
      case "delivered":
        return "success";
      case "cancelled":
      case "rejected":
        return "error";
      default:
        return "gray";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusDisplayName = (status) => {
    const statusMap = {
      placed: "Pending",
      confirmed: "Confirmed",
      preparing: "Preparing",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
      cancelled: "Cancelled",
      rejected: "Rejected",
    };
    return statusMap[status] || status;
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      placed: "confirmed",
      confirmed: "preparing",
      preparing: "out_for_delivery",
      out_for_delivery: "delivered",
    };
    return statusFlow[currentStatus];
  };

  if (loading) {
    return (
      <div className="recent-orders">
        <div className="orders-header">
          <div className="header-content">
            <h2>Recent Orders</h2>
            <p>Manage and track all customer orders</p>
          </div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-orders">
        <div className="orders-header">
          <div className="header-content">
            <h2>Recent Orders</h2>
            <p>Manage and track all customer orders</p>
          </div>
        </div>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Orders</h3>
          <p>{error}</p>
          <button className="btn btn--primary" onClick={fetchOrders}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-orders">
      <div className="orders-header">
        <div className="header-content">
          <h2>Recent Orders</h2>
          <p>Manage and track all customer orders</p>
        </div>
        <div className="header-actions">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Orders</option>
            <option value="placed">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="btn btn--primary">Export Orders</button>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <span className="order-id">{order.orderNumber}</span>
                </td>
                <td>
                  <div className="customer-info">
                    <span className="customer-name">{order.customerName}</span>
                    <span className="customer-phone">
                      {order.customerPhone}
                    </span>
                    <span className="customer-address">
                      {order.deliveryAddress}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <span key={index} className="item-tag">
                        {item.name} (x{item.quantity})
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className="order-total">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge status-${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusDisplayName(order.status)}
                  </span>
                </td>
                <td>
                  <div className="order-time">
                    <div>{order.orderDate}</div>
                    <div className="time-small">{order.orderTime}</div>
                  </div>
                </td>
                <td>
                  <div className="order-actions">
                    {order.status === "placed" && (
                      <>
                        <button
                          className="btn btn--success btn-sm"
                          onClick={() =>
                            updateOrderStatus(order.id, "confirmed")
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn--danger btn-sm"
                          onClick={() =>
                            updateOrderStatus(order.id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {order.status === "confirmed" && (
                      <button
                        className="btn btn--primary btn-sm"
                        onClick={() => updateOrderStatus(order.id, "preparing")}
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === "preparing" && (
                      <button
                        className="btn btn--primary btn-sm"
                        onClick={() =>
                          updateOrderStatus(order.id, "out_for_delivery")
                        }
                      >
                        Ready for Delivery
                      </button>
                    )}
                    {order.status === "out_for_delivery" && (
                      <button
                        className="btn btn--success btn-sm"
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                      >
                        Mark Delivered
                      </button>
                    )}
                    {["placed", "confirmed", "preparing"].includes(
                      order.status
                    ) && (
                      <button
                        className="btn btn--danger btn-sm"
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                      >
                        Cancel
                      </button>
                    )}
                    <button className="btn btn--secondary btn-sm">
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="no-orders">
          <div className="no-orders-icon">📋</div>
          <h3>No orders found</h3>
          <p>There are no orders matching your current filter.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn--secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn--secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
