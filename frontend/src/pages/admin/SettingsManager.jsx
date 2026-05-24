import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

const SettingsManager = () => {
  const [formData, setFormData] = useState({
    leetcodeHandle: '',
    codeforcesHandle: '',
    codechefHandle: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings');
        if (res.data) {
          setFormData({
            leetcodeHandle: res.data.leetcodeHandle || '',
            codeforcesHandle: res.data.codeforcesHandle || '',
            codechefHandle: res.data.codechefHandle || ''
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('/api/settings', formData, {
        headers: { Authorization: token }
      });
      setStatus('Saved successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setStatus('Failed to save.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ marginBottom: '2rem' }}>CP Stats Settings</h2>
      
      <div className="glass-card" style={{ maxWidth: '600px' }}>
        <h3>Competitive Programming Handles</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Update your platform handles here. The CP Stats page will fetch data for these users.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Leetcode Handle</label>
            <input type="text" name="leetcodeHandle" value={formData.leetcodeHandle} onChange={handleChange} placeholder="e.g. Abneesh" />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Codeforces Handle</label>
            <input type="text" name="codeforcesHandle" value={formData.codeforcesHandle} onChange={handleChange} placeholder="e.g. Abneesh" />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Codechef Handle</label>
            <input type="text" name="codechefHandle" value={formData.codechefHandle} onChange={handleChange} placeholder="e.g. abneesh" />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Save size={18} /> Save Handles
            </button>
            {status && <span style={{ color: status.includes('Failed') ? '#ef4444' : '#10b981' }}>{status}</span>}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SettingsManager;
