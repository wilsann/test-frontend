import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { setToken, setRole } from "../../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      const { token, role } = res.data;

      setToken(token);
      setRole(role);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      alert("Login gagal");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Belum punya akun? <a href="/register">Daftar</a>
      </p>
    </div>
  );
}

export default Login;