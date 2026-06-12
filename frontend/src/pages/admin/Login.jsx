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
        className="sticker bg-white p-6 md:p-8 relative" 
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-lemon rounded-full border-2 border-[var(--color-ink)] shadow-[4px_4px_0_0_var(--color-ink)] flex items-center justify-center mb-6 -rotate-3 hover:rotate-3 transition-transform">
            <Lock size={36} className="text-[var(--color-ink)]" />
          </div>
          <h2 className="text-4xl font-black">Admin Login</h2>
        </div>
        
        {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block font-bold mb-2 text-left">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Admin Username"
              className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-bold mb-2 text-left">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium"
            />
          </div>
          <button type="submit" className="w-full sticker sticker-hover bg-coral text-white font-bold text-lg py-4 mt-2">
            Login to Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
