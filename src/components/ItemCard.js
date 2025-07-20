import React from "react";

function ItemCard({ item }) {
  return (
    <div style={styles.card}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <small>{new Date(item.created_at).toLocaleDateString()}</small>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "15px",
    margin: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    width: "250px"
  }
};

export default ItemCard;