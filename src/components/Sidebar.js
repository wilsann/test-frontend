import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h3>Admin Panel</h3>
      <ul>
        <li><Link to="/admin/items">Item</Link></li>
        <li><Link to="/admin/users">User</Link></li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRight: "1px solid #ccc",
  },
};

export default Sidebar;