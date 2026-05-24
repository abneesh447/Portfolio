import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/api';

const Overview = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const [projRes, msgRes] = await Promise.all([
          axios.get('/api/projects'),
          axios.get('/api/messages', { headers: { Authorization: token } })
        ]);
        setStats({ projects: projRes.data.length, messages: msgRes.data.length });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 style={{ marginBottom: '2rem' }}>Dashboard Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        
        <div 
          className="glass-card" 
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
          onClick={() => navigate('/admin/projects')}
        >
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <FileText size={24} color="var(--accent-color)" />
          </div>
          <div>
            <h3 style={{ fontSize: '2rem' }}>{stats.projects}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Total Projects</p>
          </div>
        </div>

        <div 
          className="glass-card" 
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
          onClick={() => navigate('/admin/messages')}
        >
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <MessageSquare size={24} color="var(--accent-color)" />
          </div>
          <div>
            <h3 style={{ fontSize: '2rem' }}>{stats.messages}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Total Messages</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Overview;
