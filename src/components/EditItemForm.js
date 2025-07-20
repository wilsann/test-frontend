import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function EditItemForm() {
  const { id } = useParams();
  const [item, setItem] = useState({
    name: "",
    description: "",
    director: "",
    year: "", // Inisialisasi sebagai string kosong
    genre: "",
    image: "",
  });
  const [file, setFile] = useState(null);

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
    if (e.target.name === "year") {
      setItem({ ...item, [e.target.name]: parseInt(e.target.value, 10) });
    } else {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item.name.trim()) {
      alert("Nama item harus diisi");
      return;
    }

    if (!item.description.trim()) {
      alert("Deskripsi harus diisi");
      return;
    }

    if (!item.director.trim()) {
      alert("Nama sutradara harus diisi");
      return;
    }

    if (!item.year) {
      alert("Tahun harus diisi");
      return;
    }

    if (!item.genre.trim()) {
      alert("Genre harus diisi");
      return;
    }

    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("description", item.description);
    formData.append("director", item.director);
    formData.append("year", item.year.toString()); // Pastikan dikirim sebagai string
    formData.append("genre", item.genre);
    formData.append("oldImage", item.image); // Sertakan image lama untuk backup
    
    if (file) {
        formData.append("image", file);
    }

    try {
        await api.put(`/items/${id}`, formData, { // Pastikan path /api/items
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        alert("Item berhasil diupdate!");
        window.location.href = "/admin/items";
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
        <label>
          Sutradara:
          <input
            type="text"
            name="director"
            value={item.director}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </label>
        <label>
          Tahun:
          <input
            type="number"
            name="year"
            value={item.year}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={item.genre}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </label>
        <label>
          Gambar:
          <input type="file" name="image" onChange={handleFileChange} />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Update Item
        </button>
      </form>
    </div>
  );
}

export default EditItemForm;