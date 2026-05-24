import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const EducationManager = () => {
  const [educations, setEducations] = useState([]);
  const [formData, setFormData] = useState({ degree: '', institution: '', year: '', details: '' });

  const fetchEducations = async () => {
    try {
      const res = await axios.get('/api/education');
      setEducations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('/api/education', formData, {
        headers: { Authorization: token }
      });
      setFormData({ degree: '', institution: '', year: '', details: '' });
      fetchEducations();
    } catch (err) {
      console.error(err);
      alert('Failed to add education entry');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/education/${id}`, {
        headers: { Authorization: token }
      });
      fetchEducations();
    } catch (err) {
      console.error(err);
      alert('Failed to delete education entry');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ marginBottom: '2rem' }}>Manage Education</h2>
      
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3>Add New Entry</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" name="degree" placeholder="Degree / Level (e.g. B.Tech in CS)" value={formData.degree} onChange={handleChange} required />
          <input type="text" name="institution" placeholder="Institution (e.g. ABC University)" value={formData.institution} onChange={handleChange} required />
          <input type="text" name="year" placeholder="Year (e.g. 2022 - 2026)" value={formData.year} onChange={handleChange} required />
          <textarea name="details" placeholder="Details (Optional)" value={formData.details} onChange={handleChange} />
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Add Entry</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {educations.map(e => (
          <div key={e._id} className="glass-card" style={{ position: 'relative' }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{e.degree}</h4>
            <p style={{ color: 'var(--accent-color)', fontWeight: 500, marginBottom: '0.5rem' }}>
              {e.institution} <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem', fontSize: '0.9rem' }}>| {e.year}</span>
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{e.details}</p>
            <button onClick={() => handleDelete(e._id)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EducationManager;
