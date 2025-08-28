import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Import your page components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import MealPlanner from "./pages/MealPlanner";
import Rewards from "./pages/Rewards";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

// Dummy authentication check (replace with real auth logic)
const isAuthenticated = () => {
  // e.g., check localStorage for token
  return !!localStorage.getItem("token");
};

// Layout for protected routes (with Navbar)
const ProtectedLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default