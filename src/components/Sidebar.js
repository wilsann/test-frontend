import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBox, FaUsers, FaHome } from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  // Fungsi untuk menentukan apakah link aktif
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</h3>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/admin"
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive('/admin') 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/items"
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive('/admin/items') 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <FaBox className="mr-3" />
              Item Management
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/users"
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive('/admin/users') 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <FaUsers className="mr-3" />
              User Management
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          v1.0.0
        </div>
      </div>
    </div>
  );
}

export default Sidebar;