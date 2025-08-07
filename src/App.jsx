import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import RestaurantRegister from "./components/RestaurantRegister";
import Dashboard from "./components/Dashboard";
import "./styles/global.scss";

// Create authentication context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication status on component mount
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const userData = localStorage.getItem("user");

    setIsAuthenticated(authStatus);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setUser(null);
  };

  const authValue = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/restaurant-register"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <RestaurantRegister />
                )
              }
            />
            <Route
              path="/dashboard/*"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
