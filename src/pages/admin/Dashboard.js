import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import LogoutButton from "../../components/LogoutButton";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 overflow-hidden ml-64">
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Dashboard</h2>
          <div className="flex space-x-4">
            <LogoutButton />
          </div>
        </div>
        
        <div className="p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;