import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, File } from 'lucide-react';
import toast from 'react-hot-toast';

const ResumeManager = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      if (selectedFile.size > 2 * 1024 * 1024) {
        toast.error('File size must be under 2MB for database storage.');
        return;
      }
      setFile(selectedFile);
    } else {
      toast.error('Please select a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result;
      try {
        const token = localStorage.getItem('adminToken');
        await axios.post('/api/resume', { data: base64data }, {
          headers: { Authorization: token }
        });
        toast.success('Resume updated successfully!');
        setFile(null);
      } catch (err) {
        console.error(err);
        toast.error('Failed to update resume.');
      } finally {
        setIsUploading(false);
      }
    };
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ marginBottom: '2rem' }}>Manage Resume</h2>
      
      <div className="glass-card" style={{ maxWidth: '600px' }}>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          Upload your latest PDF resume here. It will be securely stored in the database and automatically served to visitors who click the "Download CV" button on your homepage.
        </p>

        <div style={{
          border: '2px dashed var(--glass-border)',
          borderRadius: '8px',
          padding: '3rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          cursor: 'pointer'
        }} onClick={() => document.getElementById('resume-upload').click()}>
          <input 
            type="file" 
            id="resume-upload" 
            accept="application/pdf" 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
          />
          {file ? (
            <div style={{ color: 'var(--accent-color)' }}>
              <File size={48} style={{ margin: '0 auto 1rem auto' }} />
              <p>{file.name}</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          ) : (
            <div>
              <Upload size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem auto' }} />
              <p>Click to browse for a PDF file</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Max size: 2MB</p>
            </div>
          )}
        </div>

        <button 
          className="btn-primary" 
          onClick={handleUpload} 
          disabled={!file || isUploading}
          style={{ width: '100%', opacity: (!file || isUploading) ? 0.5 : 1 }}
        >
          {isUploading ? 'Uploading...' : 'Save Resume to Database'}
        </button>
      </div>
    </motion.div>
  );
};

export default ResumeManager;
