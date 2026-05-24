import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import axios from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="glass-card" 
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', display: 'inline-block', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <Lock size={32} color="var(--accent-color)" />
          </div>
          <h2>Admin Login</h2>
        </div>
        
        {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Admin Username" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Login to Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
