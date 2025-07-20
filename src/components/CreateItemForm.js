import React, { useState } from "react";
import api from "../services/api";

function CreateItemForm() {
    const [item, setItem] = useState({
        name: "",
        description: "",
        director: "",
        year: "",
        genre: "",
        image: "",
    });
    const [file, setFile] = useState(null);

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
        formData.append("year", item.year.toString()); // Convert year to string
        formData.append("genre", item.genre);
        if (file) {
            formData.append("image", file);
        }

        try {
            await api.post("/items", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Item berhasil ditambahkan!");
            window.location.href = "/admin/items"; // Redirect ke daftar item
        } catch (err) {
            console.error("Error creating item:", err);
            alert("Gagal menambahkan item");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "20px auto" }}>
            <h2>Tambah Item</h2>
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
                    Tambah Item
                </button>
            </form>
        </div>
    );
}

export default CreateItemForm;