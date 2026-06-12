import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    duration: '',
    bullets: ['']
  });

  const fetchExperiences = async () => {
    try {
      const res = await axios.get('/api/experience');
      setExperiences(res.data);
    } catch (err) {
      toast.error('Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBulletChange = (index, value) => {
    const newBullets = [...formData.bullets];
    newBullets[index] = value;
    setFormData({ ...formData, bullets: newBullets });
  };

  const addBullet = () => {
    setFormData({ ...formData, bullets: [...formData.bullets, ''] });
  };

  const removeBullet = (index) => {
    const newBullets = formData.bullets.filter((_, i) => i !== index);
    setFormData({ ...formData, bullets: newBullets });
  };

  const resetForm = () => {
    setFormData({ role: '', company: '', duration: '', bullets: [''] });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const loadingToast = toast.loading(isEditing ? 'Updating...' : 'Adding...');

    try {
      const cleanData = {
        ...formData,
        bullets: formData.bullets.filter(b => b.trim() !== '')
      };

      if (isEditing) {
        await axios.put(`/api/experience/${editingId}`, cleanData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Experience updated successfully', { id: loadingToast });
      } else {
        await axios.post('/api/experience', cleanData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Experience added successfully', { id: loadingToast });
      }
      resetForm();
      fetchExperiences();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving experience', { id: loadingToast });
    }
  };

  const handleEdit = (exp) => {
    setFormData({
      role: exp.role,
      company: exp.company,
      duration: exp.duration,
      bullets: exp.bullets.length ? exp.bullets : ['']
    });
    setEditingId(exp._id);
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const confirmDelete = async (id, toastId) => {
    toast.dismiss(toastId);
    const token = localStorage.getItem('adminToken');
    const loadingToast = toast.loading('Deleting...');
    
    try {
      await axios.delete(`/api/experience/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Experience deleted successfully', { id: loadingToast });
      fetchExperiences();
    } catch (err) {
      toast.error('Error deleting experience', { id: loadingToast });
    }
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="font-bold text-ink">Are you sure you want to delete this experience?</p>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className="px-4 py-2 border-2 border-[var(--color-ink)] rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => confirmDelete(id, t.id)} 
            className="px-4 py-2 bg-coral text-white border-2 border-[var(--color-ink)] rounded-xl font-bold hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), { 
      duration: Infinity,
      style: {
        border: '2px solid var(--color-ink)',
        boxShadow: '4px 4px 0 0 var(--color-ink)',
        borderRadius: '1rem',
        padding: '1.5rem'
      }
    });
  };

  return (
    <div className="space-y-12">
      <div className="sticker bg-white p-6 md:p-8">
        <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
          {isEditing ? <Edit2 size={28} className="text-[var(--color-mint)]" /> : <Plus size={28} className="text-[var(--color-coral)]" />}
          {isEditing ? 'Edit Experience' : 'Add New Experience'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Role</label>
              <input
                type="text"
                name="role"
                required
                className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Company</label>
              <input
                type="text"
                name="company"
                required
                className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Acme Corp"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              required
              className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Jan 2023 - Present"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Bullets (Achievements / Responsibilities)</label>
            <div className="space-y-3">
              {formData.bullets.map((bullet, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleBulletChange(index, e.target.value)}
                    className="flex-1 border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium"
                    placeholder={`Bullet point ${index + 1}...`}
                  />
                  {formData.bullets.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeBullet(index)}
                      className="p-3 text-red-500 hover:bg-red-50 border-2 border-transparent hover:border-red-500 rounded-xl transition-all"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button 
              type="button"
              onClick={addBullet}
              className="mt-4 text-sm font-bold text-[var(--color-coral)] hover:underline flex items-center gap-1"
            >
              <Plus size={16} /> Add another bullet
            </button>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="sticker sticker-hover bg-coral text-white px-6 py-3 font-bold"
            >
              {isEditing ? 'Update Experience' : 'Save Experience'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="sticker sticker-hover bg-white px-6 py-3 font-bold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <h3 className="text-3xl font-black mb-6">Manage Experiences</h3>
        {loading ? (
          <div className="animate-pulse flex flex-col gap-4">
            {[1, 2].map(i => <div key={i} className="h-24 bg-[var(--color-ink)]/5 rounded-2xl"></div>)}
          </div>
        ) : experiences.length === 0 ? (
          <p className="text-gray-500 font-medium">No experiences found.</p>
        ) : (
          <div className="grid gap-4">
            {experiences.map(exp => (
              <div key={exp._id} className="sticker bg-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-bold text-xl">{exp.role}</h4>
                  <p className="text-gray-600 font-medium mt-1">{exp.company} <span className="mx-2 text-gray-300">•</span> {exp.duration}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="p-2 border-2 border-[var(--color-ink)] bg-mint rounded-xl shadow-[2px_2px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    <Edit2 size={18} className="text-ink" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="p-2 border-2 border-[var(--color-ink)] bg-coral rounded-xl shadow-[2px_2px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-white"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceManager;
