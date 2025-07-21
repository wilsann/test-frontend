import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2.5 px-5 bg-red-500 text-white border-none rounded-md cursor-pointer" // [cite: 9, 10] Refactored button styles
    >
      Logout
    </button>
  );
}

export default LogoutButton;