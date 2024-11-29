import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from './axiosInstance';

const AddRole = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

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
        } catch (err) {
            toast.error("An error occurred during logout.");
            console.error("Logout error:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/auth/addRole', { name, email, role });
            if (response.status === 201) {
                toast.success("Role added successfully! Temporary password sent to email.");
                navigate('/adminhome');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error occurred while adding role");
            toast.error("Failed to add role. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-lg fixed top-0 w-full z-10">
                <Link to="/adminhome"><h1 className="text-xl font-bold">User Management</h1></Link>
                <div className="flex space-x-4">
                    <Link to="/addRole">
                        <button className="bg-green-500 hover:bg-green-600 text-sm px-4 py-2 rounded-md transition duration-200">
                            Add Users
                        </button>
                    </Link>
                    <button 
                        className="bg-red-500 hover:bg-red-600 text-sm px-4 py-2 rounded-md transition duration-200"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl md:max-w-2xl mt-24 mb-24">
                <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">Join us</h2>
                <h5 className="text-lg text-gray-600 text-center mb-5">Create your personal account</h5>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            placeholder="Fullname"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Email address</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        >
                            <option value="" disabled>Select a role</option>
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-1/2 bg-green-500 text-white py-3 px-2 rounded-md hover:bg-green-600 transition duration-300"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <footer className="mt-4 text-center">
                    <p className="text-gray-600"><Link to="/" className="text-blue-500 hover:underline">Back to Homepage</Link>.</p>
                </footer>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddRole;
