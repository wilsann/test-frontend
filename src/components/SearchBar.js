import React from "react";

function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Cari item berdasarkan nama..."
        onChange={handleChange}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "20px",
    textAlign: "center"
  },
  input: {
    width: "80%",
    padding: "10px",
    fontSize: "16px"
  }
};

export default SearchBar;