import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '', link: '', technologies: '' });

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('/api/projects', {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim())
      }, {
        headers: { Authorization: token }
      });
      setFormData({ title: '', description: '', imageUrl: '', link: '', technologies: '' });
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Failed to add project');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: token }
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Failed to delete project');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ marginBottom: '2rem' }}>Manage Projects</h2>
      
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3>Add New Project</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="text" name="imageUrl" placeholder="Image URL (e.g. /projects/1.jpg)" value={formData.imageUrl} onChange={handleChange} />
          <input type="text" name="link" placeholder="GitHub / Live Link" value={formData.link} onChange={handleChange} />
          <input type="text" name="technologies" placeholder="Technologies (comma separated)" value={formData.technologies} onChange={handleChange} required />
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Add Project</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {projects.map(p => (
          <div key={p._id} className="glass-card" style={{ position: 'relative' }}>
            <h4>{p.title}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{p.description}</p>
            <button onClick={() => handleDelete(p._id)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsManager;
