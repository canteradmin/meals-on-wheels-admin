import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = ({ isOpen, onToggle, onLogout, user }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      icon: "📊",
      label: "Overview",
      exact: true,
    },
    {
      path: "/dashboard/orders",
      icon: "📋",
      label: "Recent Orders",
    },
    {
      path: "/dashboard/items",
      icon: "🍽️",
      label: "Restaurant Items",
    },
    {
      path: "/dashboard/help",
      icon: "💬",
      label: "Customer Help",
    },
  ];

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onToggle}
      ></div>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <h2>🍽️ Meels on Wheels</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            <span>{user.name?.charAt(0) || "A"}</span>
          </div>
          <div className="user-details">
            <h4>{user.name || "Admin User"}</h4>
            <p>{user.email || "admin@meels.com"}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  end={item.exact}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={onLogout} className="logout-button">
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
