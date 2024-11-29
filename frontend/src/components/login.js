import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import { AuthContext } from './authContext';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(null); // null = untouched, true = valid, false = invalid
    const [passwordValid, setPasswordValid] = useState(null);
    const navigate = useNavigate();

    const { login: loginContext } = useContext(AuthContext);

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(value);
        setEmailValid(emailRegex.test(value));
    };

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordValid(value.length >= 8 && value.length <= 14); // Password criteria
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!emailValid) {
            toast.error('Please enter a valid email address');
            return;
        }
    
        if (!passwordValid) {
            toast.error('Password must be between 8 and 14 characters');
            return;
        }
    
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
    
            toast.success('Login successful');
            const { token, role } = response.data;
    
            if (!token || !role) {
                throw new Error('Invalid response from the server');
            }
    
            // Store token in localStorage
            localStorage.setItem('token', token);

            loginContext({ email, role });
    
            // Redirect based on role
            if (role === 'Student') {
                setTimeout(() => {
                    navigate('/studenthome'); 
                }, 3000);
            } else if (role === 'Faculty') {
                setTimeout(() => {
                    navigate('/facultyhome'); 
                }, 3000);
            } else if (role === 'Admin') {
                setTimeout(() => {
                    navigate('/adminhome'); 
                }, 3000);
            } else {
                toast.error('Invalid role');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message || 'Login failed');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };    
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign in to us</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Email address</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            required
                            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                                emailValid === null
                                    ? 'border-gray-300'
                                    : emailValid
                                    ? 'border-green-500 focus:ring-green-400'
                                    : 'border-red-500 focus:ring-red-400'
                            }`}
                        />
                        {emailValid === false && (
                            <p className="text-red-500 text-sm mt-1">Invalid email format</p>
                        )}
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="block text-left text-gray-700 font-medium">Password</label>
                            <Link to="/forgot-password" className="text-blue-500 hover:underline text-sm">Forget password?</Link>
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
                            required
                            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                                passwordValid === null
                                    ? 'border-gray-300'
                                    : passwordValid
                                    ? 'border-green-500 focus:ring-green-400'
                                    : 'border-red-500 focus:ring-red-400'
                            }`}
                        />
                        {passwordValid === false && (
                            <p className="text-red-500 text-sm mt-1">Password must be 8-14 characters long</p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <footer className="mt-6 text-center">
                    <p className="text-gray-600">First time? <Link to="/register" className="text-blue-500 hover:underline">Create an account</Link>.</p>
                    <p className="text-gray-600"><Link to="/" className="text-blue-500 hover:underline">Back to Homepage</Link>.</p>
                </footer>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
