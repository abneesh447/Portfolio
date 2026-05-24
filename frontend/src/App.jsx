import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CPStats from './pages/CPStats';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Analytics />
      <div className="app-container">
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cp" element={<CPStats />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
