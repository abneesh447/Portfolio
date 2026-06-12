import React, { useState, useEffect } from 'react';
import axios from '../utils/api';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6">
      
      <div className="pt-8 pb-16 text-left">
        <div className="chip bg-white text-ink mb-4">
          🛠️ what i've been making
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          things i <span className="half-highlight-yellow">built</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-gray-800">
          A small museum of side projects, weekend hacks, and ideas that escaped my notes app. Some shipped. All taught me something.
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-[var(--color-ink)]/5 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {projects.map((project, i) => {
            const rotation = i % 2 === 0 ? 'rotate-1' : '-rotate-1';
            const isSingle = projects.length === 1;
            const colors = ['bg-coral', 'bg-mint', 'bg-lemon', 'bg-sky', 'bg-peach', 'bg-lavender'];
            const cardColor = colors[i % colors.length];
            
            return (
              <div 
                key={project._id || i} 
                className={`sticker ${cardColor} p-6 md:p-8 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 ${rotation} ${isSingle ? 'md:col-span-2 md:max-w-3xl w-full' : ''}`}
              >
                <div 
                  className="w-16 h-16 rounded-full bg-peach border-2 border-[var(--color-ink)] shadow-[4px_4px_0_0_var(--color-ink)] flex items-center justify-center font-display font-black text-2xl rotate-12 mb-6"
                >
                  {i + 1}
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="opacity-80 leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="chip bg-cream text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 4 && (
                    <span className="chip bg-cream text-xs opacity-70">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex gap-4 pt-4 border-t-2 border-[var(--color-ink)]/10">
                  {project.link && (
                    <a 
                      href={project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-bold hover:text-[var(--color-coral)] transition-colors"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-bold hover:text-[var(--color-sky)] transition-colors"
                    >
                      <FaGithub size={18} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default Projects;
