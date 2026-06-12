import React, { useState } from 'react';
import { Settings, FileText, MessageSquare, LogOut, UserCheck, GraduationCap, Code, File, Briefcase, Menu, X } from 'lucide-react';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Overview from './Overview';
import ProjectsManager from './ProjectsManager';
import MessagesViewer from './MessagesViewer';
import SettingsManager from './SettingsManager';
import EducationManager from './EducationManager';
import TechManager from './TechManager';
import ResumeManager from './ResumeManager';
import ExperienceManager from './ExperienceManager';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-cream overflow-hidden">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`w-72 bg-white border-r-4 border-ink p-6 fixed md:relative h-screen flex flex-col shadow-[4px_0_0_0_var(--color-ink)] z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} overflow-y-auto`}>
        
        {/* Mobile Close Button */}
        <button 
          className="md:hidden absolute top-4 right-4 p-2 bg-peach border-2 border-ink rounded-full"
          onClick={closeSidebar}
        >
          <X size={20} />
        </button>

        <div className="mb-10 px-2 mt-4 md:mt-0">
          <div className="chip bg-lemon mb-2 -rotate-2">⚙️ admin</div>
          <h2 className="text-3xl font-black">Admin Panel</h2>
        </div>
        
        <ul className="flex flex-col gap-4">
          <li>
            <Link to="/admin/dashboard" onClick={closeSidebar} className="sticker sticker-hover bg-white hover:bg-peach px-4 py-3 font-bold flex items-center gap-3 w-full transition-colors">
              <Settings size={20} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/projects" onClick={closeSidebar} className="sticker sticker-hover bg-white hover:bg-sky px-4 py-3 font-bold flex items-center gap-3 w-full transition-colors">
              <FileText size={20} /> Manage Projects
            </Link>
          </li>
          <li>
            <Link to="/admin/tech" onClick={closeSidebar} className="sticker sticker-hover bg-white hover:bg-mint px-4 py-3 font-bold flex items-center gap-3 w-full transition-colors">
              <Code size={20} /> Manage Tech Stack
            </Link>
          </li>
          <li>
            <Link to="/admin/education" onClick={closeSidebar} className="sticker sticker-hover bg-white hover:bg-lavender px-4 py-3 font-bold flex items-center gap-3 w-full transition-colors">
              <GraduationCap size={20} /> Manage Education
            </Link>
          </li>
          <li>
            <Link to="/admin/experience" onClick={closeSidebar} className="sticker sticker-hover bg-white hover:bg-lemon px-4 py-3 font-bold flex items-center gap-3 w-full transition-colors">
              <Briefcase size={20} /> Manage Experience
            </Link>
          </li>
          <li>
            <Link to="/admin/resume" onClick={closeSidebar} className="sticker sticker-hover bg-white hover:bg-peach px-4 py-3 font-bold flex items-center gap-3 w-full transition-colors">
              <File size={20} /> Manage Resume
            </Link>
          </li>
          <li>
            <Link to="/admin/messages" onClick={closeSidebar} className="sticker sticker-hover bg-white hover:bg-sky px-4 py-3 font-bold flex items-center gap-3 w-full transition-colors">
              <MessageSquare size={20} /> View Messages
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" onClick={closeSidebar} className="sticker sticker-hover bg-white hover:bg-mint px-4 py-3 font-bold flex items-center gap-3 w-full transition-colors">
              <UserCheck size={20} /> CP Handles
            </Link>
          </li>
        </ul>
        <div className="mt-auto pt-8">
          <button onClick={handleLogout} className="sticker sticker-hover bg-coral text-white px-4 py-3 font-bold flex items-center gap-3 w-full">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto h-screen w-full relative">
        <button 
          className="md:hidden mb-6 p-3 bg-white border-2 border-ink shadow-[3px_3px_0_0_var(--color-ink)] rounded-xl flex items-center justify-center transition-transform active:scale-95"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        <Routes>
          <Route path="dashboard" element={<Overview />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="tech" element={<TechManager />} />
          <Route path="education" element={<EducationManager />} />
          <Route path="experience" element={<ExperienceManager />} />
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
