import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ItemList from "./pages/admin/ItemList";
import UserList from "./pages/admin/UserList";
import EditUser from "./pages/admin/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="items" element={<ItemList />} />
          <Route path="users" element={<UserList />} />
          <Route path="/admin/users/edit/:id" element={<EditUser />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;