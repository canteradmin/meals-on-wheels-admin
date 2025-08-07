import React, { useState, useEffect } from "react";
import "./Overview.scss";

const Overview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setDashboardData({
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
      });

      setRecentActivity([
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
      ]);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="overview">
        <div className="overview-header">
          <h2>Dashboard Overview</h2>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const sales = dashboardData?.sales || {};
  const orderStatusCounts = dashboardData?.orderStatusCounts || {};

  return (
    <div className="overview">
      <div className="overview-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Today's Sales</h3>
            <p className="stat-value">
              {formatCurrency(sales.today?.totalSales || 0)}
            </p>
            <p className="stat-label">{sales.today?.orderCount || 0} orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Pending Orders</h3>
            <p className="stat-value">{orderStatusCounts.placed || 0}</p>
            <p className="stat-label">Awaiting confirmation</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👨‍🍳</div>
          <div className="stat-content">
            <h3>In Kitchen</h3>
            <p className="stat-value">{orderStatusCounts.preparing || 0}</p>
            <p className="stat-label">Being prepared</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div className="stat-content">
            <h3>Out for Delivery</h3>
            <p className="stat-value">
              {orderStatusCounts.out_for_delivery || 0}
            </p>
            <p className="stat-label">On the way</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-activity">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <button className="btn btn--secondary">View All</button>
          </div>

          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === "order" ? "📦" : "💬"}
                </div>
                <div className="activity-content">
                  <h4>{activity.action}</h4>
                  <p>{activity.description}</p>
                  <span className="activity-time">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div
                  className="activity-status"
                  style={{ backgroundColor: getStatusColor(activity.status) }}
                >
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <div className="section-header">
            <h3>Quick Actions</h3>
          </div>

          <div className="actions-grid">
            <button className="action-btn">
              <span className="action-icon">➕</span>
              <span>Add Menu Item</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📊</span>
              <span>View Reports</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">⚙️</span>
              <span>Settings</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📢</span>
              <span>Send Notification</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
