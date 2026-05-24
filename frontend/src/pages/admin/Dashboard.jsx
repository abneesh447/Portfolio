import React from 'react';
import { Settings, FileText, MessageSquare, LogOut, UserCheck, GraduationCap, Code, File } from 'lucide-react';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Overview from './Overview';
import ProjectsManager from './ProjectsManager';
import MessagesViewer from './MessagesViewer';
import SettingsManager from './SettingsManager';
import EducationManager from './EducationManager';
import TechManager from './TechManager';
import ResumeManager from './ResumeManager';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '250px', 
        background: 'var(--bg-color-lighter)', 
        borderRight: '1px solid var(--glass-border)',
        padding: '2rem 1rem',
        position: 'relative'
      }}>
        <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}>Admin Panel</h2>
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            <Link to="/admin/dashboard" className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', border: 'none' }}>
              <Settings size={18} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/projects" className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', border: 'none' }}>
              <FileText size={18} /> Manage Projects
            </Link>
          </li>
          <li>
            <Link to="/admin/tech" className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', border: 'none' }}>
              <Code size={18} /> Manage Tech Stack
            </Link>
          </li>
          <li>
            <Link to="/admin/education" className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', border: 'none' }}>
              <GraduationCap size={18} /> Manage Education
            </Link>
          </li>
          <li>
            <Link to="/admin/resume" className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', border: 'none' }}>
              <File size={18} /> Manage Resume
            </Link>
          </li>
          <li>
            <Link to="/admin/messages" className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', border: 'none' }}>
              <MessageSquare size={18} /> View Messages
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', border: 'none' }}>
              <UserCheck size={18} /> CP Handles
            </Link>
          </li>
        </ul>
        <div style={{ position: 'absolute', bottom: '2rem', left: '1rem', right: '1rem' }}>
          <button onClick={handleLogout} className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', border: 'none', color: '#ef4444' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <Routes>
          <Route path="dashboard" element={<Overview />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="tech" element={<TechManager />} />
          <Route path="education" element={<EducationManager />} />
          <Route path="resume" element={<ResumeManager />} />
          <Route path="messages" element={<MessagesViewer />} />
          <Route path="settings" element={<SettingsManager />} />
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
