import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function EditItemForm() {
  const { id } = useParams();
  const [item, setItem] = useState({
    name: "",
    description: "",
    director: "",
    year: "",
    genre: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  // Fungsi untuk mendapatkan URL gambar lengkap
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // Jika sudah URL lengkap
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
      return imagePath;
    }
    
    // Gabungkan dengan base URL
    return `http://localhost:8080/uploads/${imagePath}`;
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        setItem(res.data);
        
        // Set preview dengan URL yang benar
        if (res.data.image) {
          setPreview(getImageUrl(res.data.image));
        }
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };

    fetchItem();
  }, [id]);

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
      // Generate preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
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
    formData.append("year", item.year.toString());
    formData.append("genre", item.genre);
    formData.append("oldImage", item.image);
    
    if (file) {
      formData.append("image", file);
    }

    try {
      await api.put(`/items/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Item berhasil diupdate!");
      window.location.href = "/admin/items";
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Gagal mengupdate item");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Edit Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Preview Image */}
        <div className="flex flex-col items-center">
          {preview ? (
            <img 
              src={preview} 
              alt="Current" 
              className="w-64 h-64 object-cover rounded-lg border border-gray-300 dark:border-gray-600 mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-64 h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500 dark:text-gray-400">No Image</span>
            </div>
          )}
          <label className="block">
            <span className="sr-only">Choose image</span>
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

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-4">
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              rows="3"
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
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300"
        >
          Update Item
        </button>
      </form>
    </div>
  );
}

export default EditItemForm;