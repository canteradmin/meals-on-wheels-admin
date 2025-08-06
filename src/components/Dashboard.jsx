import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "../App";
import Sidebar from "./Sidebar";
import Overview from "./dashboard/Overview";
import RecentOrders from "./dashboard/RecentOrders";
import RestaurantItems from "./dashboard/RestaurantItems";
import CustomerHelp from "./dashboard/CustomerHelp";
import "./Dashboard.scss";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    // Navigation will be handled automatically by the App component
  };

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
        user={user}
      />

      <div className="dashboard-main">
        <header className="dashboard-header">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="header-content">
            <h1>Dashboard</h1>
            <div className="user-info">
              <span>Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="btn btn--secondary logout-btn"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/orders" element={<RecentOrders />} />
            <Route path="/items" element={<RestaurantItems />} />
            <Route path="/help" element={<CustomerHelp />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
