import './App.css';
import React, { useContext } from 'react';
import { AuthContext } from './components/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import Landing from './components/landing';
import Login from './components/login';
import Register from './components/register';
import Forgot from './components/forgot';
import StudentHome from './components/studenthome';
import FacultyHome from './components/facultyhome';
import AdminHome from './components/adminhome';
import AddRole from './components/addRole';

function App() {

  const { user } = useContext(AuthContext);

  return (
    <div className="App">
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<Forgot />} />

            {/* Protected Routes */}
            <Route
              path="/studenthome"
              element={
                <ProtectedRoute>
                  {user?.role === 'Student' ? <StudentHome /> : <div>Access Denied</div>}
                </ProtectedRoute>
              }
            />
            <Route
              path="/facultyhome"
              element={
                <ProtectedRoute>
                  {user?.role === 'Faculty' || user?.role === 'Admin' ? (
                    <FacultyHome />
                  ) : (
                    <div>Access Denied</div>
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminhome"
              element={
                <ProtectedRoute>
                  {user?.role === 'Admin' ? <AdminHome /> : <div>Access Denied</div>}
                </ProtectedRoute>
              }
            />
            <Route
              path="/addRole"
              element={
                <ProtectedRoute>
                  {user?.role === 'Admin' ? <AddRole /> : <div>Access Denied</div>}
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
