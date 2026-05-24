import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import IconRenderer from '../../utils/IconRenderer';

const TechManager = () => {
  const [techStack, setTechStack] = useState([]);
  const [formData, setFormData] = useState({ name: '', iconName: '', color: '' });

  const fetchTech = async () => {
    try {
      const res = await axios.get('/api/tech');
      setTechStack(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTech();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('/api/tech', formData, {
        headers: { Authorization: token }
      });
      setFormData({ name: '', iconName: '', color: '' });
      fetchTech();
    } catch (err) {
      console.error(err);
      alert('Failed to add tech');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/tech/${id}`, {
        headers: { Authorization: token }
      });
      fetchTech();
    } catch (err) {
      console.error(err);
      alert('Failed to delete tech');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ marginBottom: '2rem' }}>Manage Tech Stack</h2>
      
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3>Add New Technology</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" name="name" placeholder="Tech Name (e.g. React)" value={formData.name} onChange={handleChange} required />
          <input type="text" name="iconName" placeholder="Icon Code (e.g. FaReact, SiMongodb)" value={formData.iconName} onChange={handleChange} required />
          <input type="text" name="color" placeholder="Hex Color (e.g. #61DAFB)" value={formData.color} onChange={handleChange} required />
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Add Tech</button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          * Find icon codes at <a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)' }}>React Icons</a> (use "fa" for FontAwesome or "si" for SimpleIcons).
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {techStack.map(t => (
          <div key={t._id} className="glass-card" style={{ position: 'relative', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', minWidth: '150px' }}>
            <IconRenderer iconName={t.iconName} size={32} color={t.color} />
            <span style={{ fontWeight: 500 }}>{t.name}</span>
            <button onClick={() => handleDelete(t._id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechManager;
