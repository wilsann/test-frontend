import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", role_id: 1 });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get(`/users/${id}`);
        const rolesRes = await api.get("/roles");

        setUser({
          username: userRes.data.username,
          email: userRes.data.email,
          role_id: userRes.data.role_id || 1,
        });
        setRoles(rolesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${id}`, user);
      alert("User updated successfully!");
      navigate("/admin/users");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={user.username} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Role:
          <select name="role_id" value={user.role_id} onChange={handleChange}>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;