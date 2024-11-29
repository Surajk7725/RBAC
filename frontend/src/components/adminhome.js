import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./axiosInstance";

function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout'); 

      if (response.status === 200) {
        toast.success("You have logged out successfully!");
        setTimeout(() => {
          navigate('/'); 
      }, 2000);
      } else {
        toast.error("Failed to logout. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-lg fixed top-0 w-full z-10">
        <Link to="/adminhome"><h1 className="text-xl font-bold">User Management</h1></Link>
        <div className="flex space-x-4">
          <Link to="/addRole">
            <button
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"

            >
              Add Users
            </button>
          </Link>
          <button
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

        {/* Main Content */}
        <div className="flex items-center justify-center flex-grow">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to Admin Home!</h1>
            <p className="text-lg text-gray-600 mt-2">
              🎉 Congratulations on visiting the Admin Home Page! 🎉
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
      );
};

export default AdminHome;
