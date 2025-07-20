import React, { useEffect, useState } from "react";
import api from "../services/api";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import LogoutButton from "../components/LogoutButton";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../services/authService";

function UserDashboard() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get(`/items`);
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      const res = await api.get(`/items`);
      setItems(res.data);
      return;
    }

    try {
      const res = await api.get(`/items`);
      const filtered = res.data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setItems(filtered);
    } catch (err) {
      console.error("Error searching items:", err);
    }
  };

  const role = isAdmin() ? "admin" : "user";
  if (role === "admin") {
    return <Navigate to="/admin" />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.container}>
        <h2>User Dashboard</h2>
        <LogoutButton />
      </div>
      <SearchBar onSearch={handleSearch} />

      <div style={styles.cardContainer}>
        {items.length > 0 ? (
          items.map(item => <ItemCard key={item.id} item={item} />)
        ) : (
          <p>Tidak ada item ditemukan</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px"
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
};

export default UserDashboard;