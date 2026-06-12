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
      <h1 className="text-4xl font-black mb-8">Dashboard Overview</h1>
      <div className="flex flex-col gap-8">
        
        <div 
          className="sticker bg-lemon p-8 flex items-center gap-6 cursor-pointer hover:-translate-y-2 transition-transform -rotate-1" 
          onClick={() => navigate('/admin/projects')}
        >
          <div className="w-16 h-16 bg-white rounded-full border-2 border-[var(--color-ink)] flex items-center justify-center rotate-6">
            <FileText size={32} />
          </div>
          <div>
            <h3 className="text-5xl font-black">{stats.projects}</h3>
            <p className="font-bold opacity-80 text-lg">Total Projects</p>
          </div>
        </div>

        <div 
          className="sticker bg-mint p-8 flex items-center gap-6 cursor-pointer hover:-translate-y-2 transition-transform rotate-1" 
          onClick={() => navigate('/admin/messages')}
        >
          <div className="w-16 h-16 bg-white rounded-full border-2 border-[var(--color-ink)] flex items-center justify-center -rotate-6">
            <MessageSquare size={32} />
          </div>
          <div>
            <h3 className="text-5xl font-black">{stats.messages}</h3>
            <p className="font-bold opacity-80 text-lg">Total Messages</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Overview;
