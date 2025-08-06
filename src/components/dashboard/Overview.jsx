import React, { useState, useEffect } from "react";
import { dashboardAPI, handleAPIError } from "../../services/api";
import "./Overview.scss";

const Overview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch dashboard metrics and recent activity in parallel
      const [metricsResponse, activityResponse] = await Promise.all([
        dashboardAPI.getDashboardMetrics(),
        dashboardAPI.getRecentActivity(10),
      ]);

      setDashboardData(metricsResponse.data);
      setRecentActivity(activityResponse.data.activities || []);
    } catch (err) {
      const errorMessage = handleAPIError(err);
      setError(errorMessage);
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

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

  if (error) {
    return (
      <div className="overview">
        <div className="overview-header">
          <h2>Dashboard Overview</h2>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button className="btn btn--primary" onClick={fetchDashboardData}>
            Retry
          </button>
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
            <span className="stat-label">
              {sales.today?.orderCount || 0} orders
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-value">
              {Object.values(orderStatusCounts).reduce((a, b) => a + b, 0)}
            </p>
            <span className="stat-label">All time</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>Pending Orders</h3>
            <p className="stat-value">
              {(orderStatusCounts.placed || 0) +
                (orderStatusCounts.confirmed || 0) +
                (orderStatusCounts.preparing || 0)}
            </p>
            <span className="stat-label">Awaiting completion</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completed Today</h3>
            <p className="stat-value">{orderStatusCounts.delivered || 0}</p>
            <span className="stat-label">Delivered orders</span>
          </div>
        </div>
      </div>

      <div className="overview-content">
        <div className="recent-activity">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <button className="btn btn--secondary btn-sm">View All</button>
          </div>

          <div className="activity-list">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === "order" ? "📋" : "💬"}
                  </div>
                  <div className="activity-content">
                    <h4>{activity.action}</h4>
                    <p>{activity.description}</p>
                    <div className="activity-meta">
                      <span className="activity-time">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                      {activity.status && (
                        <span
                          className="activity-status"
                          style={{
                            backgroundColor: getStatusColor(activity.status),
                          }}
                        >
                          {activity.status.replace("_", " ")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-activity">
                <p>No recent activity</p>
              </div>
            )}
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
