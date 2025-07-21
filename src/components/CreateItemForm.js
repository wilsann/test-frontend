import React, { useState } from "react";
import api from "../services/api";

function CreateItemForm() {
    const [item, setItem] = useState({
        name: "",
        description: "",
        director: "",
        year: "",
        genre: "",
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prev => ({
            ...prev,
            [name]: name === "year" ? parseInt(value, 10) || "" : value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Generate preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi tetap sama...

        const formData = new FormData();
        formData.append("name", item.name);
        formData.append("description", item.description);
        formData.append("director", item.director);
        formData.append("year", item.year.toString());
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
            window.location.href = "/admin/items";
        } catch (err) {
            console.error("Error creating item:", err);
            alert("Gagal menambahkan item");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Form Tambah Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Preview Image */}
                <div className="flex flex-col items-center">
                    {preview ? (
                        <img 
                            src={preview} 
                            alt="Preview" 
                            className="w-64 h-64 object-cover rounded-lg border border-gray-300 dark:border-gray-600 mb-4"
                        />
                    ) : (
                        <div className="w-64 h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-gray-500 dark:text-gray-400">No Image</span>
                        </div>
                    )}
                    <label className="block w-full">
                        <span className="sr-only">Pilih gambar</span>
                        <input 
                            type="file" 
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                dark:file:bg-gray-700 dark:file:text-gray-200
                                dark:hover:file:bg-gray-600"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Nama</label>
                    <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                    <textarea
                        name="description"
                        value={item.description}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Sutradara</label>
                        <input
                            type="text"
                            name="director"
                            value={item.director}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Tahun</label>
                        <input
                            type="number"
                            name="year"
                            value={item.year}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={item.genre}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300"
                >
                    Tambah Item
                </button>
            </form>
        </div>
    );
}

export default CreateItemForm;