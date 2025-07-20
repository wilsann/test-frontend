import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import ConfirmModal from "../../components/ConfirmModal";

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/items');
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/items/edit/${id}`); // ✅ Redirect ke halaman edit
  };

  const handleDeleteClick = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.deleteItem(selectedId);
      setItems(items.filter((item) => item.id !== selectedId));
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div>
      <h2>Daftar Item</h2>
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Dibuat</th>
              <th>Diubah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
                <td>{new Date(item.updated_at).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)} style={styles.btnEdit}>Edit</button>
                  <button onClick={() => handleDeleteClick(item.id, item.name)} style={styles.btnDelete}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteConfirm}
        message={`Anda yakin ingin menghapus item "${selectedName}"?`}
      />
    </div>
  );
}

const styles = {
  btnEdit: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "6px 12px",
    marginRight: "8px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnDelete: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ItemList;