import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ItemList from "./pages/admin/ItemList";
import UserList from "./pages/admin/UserList";
import EditUser from "./pages/admin/EditUser";
import EditItemPage from "./pages/EditItemPage";
import CreateItemPage from "./pages/CreateItemPage";

// User Dashboard
import UserDashboard from "./pages/UserDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
        }>
          <Route index element={<ItemList />} /> {/* Default: /admin */}
          <Route path="items" element={<ItemList />} />
          <Route path="items/create" element={<CreateItemPage />} />
          <Route path="items/edit/:id" element={<EditItemPage />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/edit/:id" element={<EditUser />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<RedirectIfAuthenticated />} />
      </Routes>
    </Router>
  );
}

function RedirectIfAuthenticated() {
  const isAuthenticated = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (isAuthenticated) {
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (role === "user") {
      return <Navigate to="/user" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default App;