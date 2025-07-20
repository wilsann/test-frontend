import React from "react";

function ItemCard({ item }) {
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = ""; // Clear the broken image
    e.target.style.display = "none"; // Hide the image element
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            style={styles.image}
            onError={handleImageError}
          />
        ) : (
          <div style={styles.noImage}>No Image</div>
        )}
      </div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p><strong>Genre:</strong> {item.genre}</p>
      <p><strong>Tahun:</strong> {item.year}</p>
      <p><strong>Sutradara:</strong> {item.director}</p>
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
    width: "250px",
    minHeight: "450px", // Memberikan ruang konsisten
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    width: "100%",
    height: "300px",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "5px",
  },
  noImage: {
    color: "#999",
    fontSize: "16px",
    textAlign: "center",
  },
};

export default ItemCard;