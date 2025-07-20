import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({ name: "", description: "" });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item.name.trim()) {
        alert("Nama item harus diisi");
        return;
    }

    try {
      await api.put(`/items/${id}`, item);
      alert("Item berhasil diupdate!");
      navigate("/admin/items"); // Redirect ke daftar item
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Gagal mengupdate item");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama:
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </label>
        <label>
          Deskripsi:
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Update Item
        </button>
      </form>
    </div>
  );
}

export default EditItemForm;