// import { useNavigate, Link } from 'react-router-dom';
// import React, { useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axiosInstance from './axiosInstance';

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         // Validation regex
//         const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
//         const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/; // Password criteria
    
//         // Frontend validation
//         if (!nameRegex.test(name)) {
//             toast.error('Name should only contain letters and spaces');
//             return;
//         }
    
//         if (!emailRegex.test(email)) {
//             toast.error('Please enter a valid email address');
//             return;
//         }
    
//         if (!passwordRegex.test(password)) {
//             toast.error(
//                 'Password must be 8-14 characters long, include at least one uppercase letter, one number, and one special character'
//             );
//             return;
//         }
    
//         try {
//             const response = await axiosInstance.post('/auth/register', { name, email, password });
//             toast.success('Registration successful');
//             setTimeout(() => {
//                 navigate('/login'); 
//             }, 3000);
//         } catch (err) {
//             if (err.response && err.response.data.errors) {
//                 // Handle OWASP and validation errors
//                 err.response.data.errors.forEach((error) => {
//                     toast.error(error.msg || error);
//                 });
//             } else if (err.response && err.response.data.message) {
//                 // Handle other messages
//                 toast.error(err.response.data.message);
//             } else {
//                 toast.error('An unexpected error occurred');
//             }
//         }
//     };
    
//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <ToastContainer />
//             <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl md:max-w-2xl mt-24 mb-24">
//                 <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">Join us</h2>
//                 <h5 className="text-lg text-gray-600 text-center mb-5">Create your personal account</h5>
//                 <form onSubmit={handleSubmit} className="space-y-3">
//                     {error && <p className="text-red-500 text-center">{error}</p>}
//                     <div>
//                         <label className="block text-left text-gray-700 font-medium">Full Name</label>
//                         <input
//                             type="text"
//                             placeholder="Fullname"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                             className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-left text-gray-700 font-medium">Email address</label>
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-left text-gray-700 font-medium">Password</label>
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                         />
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <input
//                             type="checkbox"
//                             name="checkbox"
//                             id="checkbox"
//                             required
//                             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-0"
//                         />
//                         <span>
//                             I agree to all statements in{' '}
//                             <a
//                                 href="https://google.com"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-500 hover:underline"
//                             >
//                                 terms of service
//                             </a>
//                             .
//                         </span>
//                     </div>
//                     <div className="flex justify-center">
//                         <button
//                             type="submit"
//                             className="w-1/2 bg-green-500 text-white py-3 px-2 rounded-md hover:bg-green-600 transition duration-300"
//                         >
//                             Register
//                         </button>
//                     </div>
//                 </form>
//                 <footer className="mt-4 text-center">
//                     <p className="text-gray-600">
//                         <Link to="/" className="text-blue-500 hover:underline">
//                             Back to Homepage
//                         </Link>
//                         .
//                     </p>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default Register;





import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './axiosInstance';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState({ name: false, email: false, password: false });
    const navigate = useNavigate();

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;

    const handleValidation = (field, value) => {
        if (field === 'name') setValidation((prev) => ({ ...prev, name: nameRegex.test(value) }));
        if (field === 'email') setValidation((prev) => ({ ...prev, email: emailRegex.test(value) }));
        if (field === 'password') setValidation((prev) => ({ ...prev, password: passwordRegex.test(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validation.name || !validation.email || !validation.password) {
            toast.error('Please correct the highlighted fields before submitting');
            return;
        }

        try {
            const response = await axiosInstance.post('/auth/register', { name, email, password });
            toast.success('Registration successful');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.forEach((error) => {
                    toast.error(error.msg || error);
                });
            } else if (err.response && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl md:max-w-2xl mt-24 mb-24">
                <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">Join us</h2>
                <h5 className="text-lg text-gray-600 text-center mb-5">Create your personal account</h5>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                handleValidation('name', e.target.value);
                            }}
                            required
                            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                                validation.name ? 'border-green-500 focus:ring-green-400' : 'border-red-500 focus:ring-red-400'
                            }`}
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Email address</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                handleValidation('email', e.target.value);
                            }}
                            required
                            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                                validation.email ? 'border-green-500 focus:ring-green-400' : 'border-red-500 focus:ring-red-400'
                            }`}
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleValidation('password', e.target.value);
                            }}
                            required
                            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                                validation.password ? 'border-green-500 focus:ring-green-400' : 'border-red-500 focus:ring-red-400'
                            }`}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="checkbox"
                            id="checkbox"
                            required
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-0"
                        />
                        <span>
                            I agree to all statements in{' '}
                            <a
                                href="https://google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                terms of service
                            </a>
                            .
                        </span>
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
                    <p className="text-gray-600">
                        <Link to="/" className="text-blue-500 hover:underline">
                            Back to Homepage
                        </Link>
                        .
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Register;
