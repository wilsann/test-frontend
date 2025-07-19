import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ConfirmModal from "../../components/ConfirmModal";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/users/edit/${id}`); // ✅ Redirect ke halaman edit
  };

  const handleDeleteClick = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/users/${selectedId}`);
      setUsers(users.filter((user) => user.id !== selectedId));
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div>
      <h2>Daftar Pengguna</h2>
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Dibuat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                  <button onClick={() => handleDeleteClick(user.id, user.username)}>Hapus</button>
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
        message={`Anda yakin ingin menghapus pengguna "${selectedName}"?`}
      />
    </div>
  );
}

export default UserList;