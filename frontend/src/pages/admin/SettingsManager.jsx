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
      <h2 className="text-4xl font-black mb-8">CP Stats Settings</h2>
      
      <div className="sticker bg-white p-6 md:p-8 relative w-full">
        <h3 className="text-2xl font-bold mb-6">Competitive Programming Handles</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Update your platform handles here. The CP Stats page will fetch data for these users.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Leetcode Handle</label>
            <input type="text" name="leetcodeHandle" value={formData.leetcodeHandle} onChange={handleChange} placeholder="e.g. Abneesh"  className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium" />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Codeforces Handle</label>
            <input type="text" name="codeforcesHandle" value={formData.codeforcesHandle} onChange={handleChange} placeholder="e.g. Abneesh"  className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium" />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Codechef Handle</label>
            <input type="text" name="codechefHandle" value={formData.codechefHandle} onChange={handleChange} placeholder="e.g. abneesh"  className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium" />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="sticker sticker-hover bg-coral text-white font-bold text-lg px-8 py-3 mt-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
