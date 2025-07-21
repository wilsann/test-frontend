import React from "react";

function ItemCard({ item }) {
  const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Jika sudah berupa URL lengkap
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Gabungkan dengan base URL - sesuaikan dengan backend Anda
  return `http://localhost:8080/uploads/${imagePath}`;
};

  const imageUrl = getImageUrl(item.image);

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={item.name} 
            style={styles.image}
            onError={(e) => {
              // Jika gambar gagal load, sembunyikan element img
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div style={{...styles.noImage, display: imageUrl ? 'none' : 'flex'}}>
          <span>No Image</span>
        </div>
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