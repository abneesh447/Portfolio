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
      <h2 className="text-4xl font-black mb-8">Manage Projects</h2>
      
      <div className="sticker bg-white p-6 md:p-8 relative" style={{ marginBottom: '2rem' }}>
        <h3 className="text-2xl font-bold mb-6">Add New Project</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange}  required className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required  rows="4" className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium resize-none" />
          <input type="text" name="imageUrl" placeholder="Image URL (e.g. /projects/1.jpg)" value={formData.imageUrl} onChange={handleChange}  className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium" />
          <input type="text" name="link" placeholder="GitHub / Live Link" value={formData.link} onChange={handleChange}  className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium" />
          <input type="text" name="technologies" placeholder="Technologies (comma separated)" value={formData.technologies} onChange={handleChange}  required className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium" />
          <button type="submit" className="sticker sticker-hover bg-coral text-white font-bold text-lg px-8 py-3 mt-4" style={{ alignSelf: 'flex-start' }}>Add Project</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {projects.map(p => (
          <div key={p._id} className="sticker bg-white p-6 md:p-8 relative" style={{ position: 'relative' }}>
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
