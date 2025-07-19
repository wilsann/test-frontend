import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <Outlet /> {/* Tempat konten dinamis: ItemList atau UserList */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
};

export default Dashboard;