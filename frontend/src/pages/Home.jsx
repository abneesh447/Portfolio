import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Briefcase, GraduationCap } from 'lucide-react';
import axios from '../utils/api';
import IconRenderer from '../utils/IconRenderer';
import { SkeletonCard } from '../components/Skeleton';
import toast from 'react-hot-toast';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(null, '', '/');
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const [techStack, setTechStack] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  
  const [loadingTech, setLoadingTech] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingEdu, setLoadingEdu] = useState(true);
  const [showAllTech, setShowAllTech] = useState(false);

  useEffect(() => {
    const fetchWithRetry = async (url, setter, loadingSetter, retries = 3) => {
      try {
        const res = await axios.get(url);
        setter(res.data);
      } catch (err) {
        if (retries > 0) {
          console.warn(`Fetch failed for ${url}, retrying...`);
          setTimeout(() => fetchWithRetry(url, setter, loadingSetter, retries - 1), 1000);
          return;
        } else {
          console.error(`Failed to fetch ${url} after retries:`, err);
        }
      }
      loadingSetter(false);
    };

    fetchWithRetry('/api/tech', setTechStack, setLoadingTech);
    fetchWithRetry('/api/projects', setProjects, setLoadingProjects);
    fetchWithRetry('/api/education', setEducation, setLoadingEdu);
  }, []);

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.id]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading('Sending message...');
    try {
      await axios.post('/api/messages', contactForm);
      toast.success('Message sent successfully!', { id: loadingToast });
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCV = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Fetching latest resume...');
    try {
      const res = await axios.get('/api/resume');
      if (res.data && res.data.data) {
        const link = document.createElement('a');
        link.href = res.data.data;
        link.download = 'Abneesh_Resume.pdf';
        link.click();
        toast.success('Resume downloaded successfully!', { id: loadingToast });
      } else {
        toast.error('Resume is not available yet.', { id: loadingToast });
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching resume from server.', { id: loadingToast });
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      
      {/* Hero Section */}
      <section id="home" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', paddingTop: '4rem' }}>
        <div className="container hero-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ flex: '1 1 500px' }} className="hero-text">
            <motion.div variants={fadeInUp} style={{ display: 'inline-block', backgroundColor: 'var(--accent-color)', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '4px', fontWeight: 500, fontSize: '0.9rem', marginBottom: '1.5rem', position: 'relative' }}>
              Hello, I am
              <div style={{ position: 'absolute', bottom: '-8px', left: '20px', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid var(--accent-color)' }}></div>
            </motion.div>
            <motion.h1 variants={fadeInUp} style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff' }}>
              Abneesh
            </motion.h1>
            <motion.p variants={fadeInUp} style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '2.5rem', fontWeight: 500 }}>
              A Web Developer who loves solving complex problems. Passionate about Artificial Intelligence and emerging tech.
            </motion.p>
            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '1rem' }} className="hero-buttons">
              <button onClick={handleDownloadCV} className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '8px', cursor: 'pointer' }}>
                Download CV
              </button>
              <a href="#projects" className="btn-secondary" style={{ padding: '0.8rem 2rem', borderRadius: '8px' }}>My Work</a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }} style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <img src="/hero-avatar.png" alt="Tech Avatar" className="floating-img" style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }} />
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" style={{ padding: '6rem 0', background: 'var(--bg-color-lighter)' }}>
        <div className="container">
          <h2 className="section-title">Tech Stack</h2>
          <motion.div 
            key={loadingTech ? 'loading' : (showAllTech ? 'expanded' : 'collapsed')}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}
          >
            {loadingTech ? (
              Array(6).fill(0).map((_, i) => <SkeletonCard key={i} height="100px" />)
            ) : (
              (showAllTech ? techStack : techStack.slice(0, 6)).map((tech, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp} 
                  className="glass-card" 
                  style={{ padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', minWidth: '110px' }}
                  whileHover={{ scale: 1.15, zIndex: 10, y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <IconRenderer iconName={tech.iconName} size={26} color={tech.color} />
                  <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{tech.name}</span>
                </motion.div>
              ))
            )}
          </motion.div>
          {!loadingTech && techStack.length > 6 && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button onClick={() => setShowAllTech(!showAllTech)} className="btn-secondary" style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}>
                {showAllTech ? 'Show Less' : `See More (${techStack.length - 6})`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ padding: '8rem 0' }}>
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <motion.div 
            key={loadingProjects ? 'loading' : 'loaded'}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
          >
            {loadingProjects ? (
              Array(3).fill(0).map((_, i) => <SkeletonCard key={i} height="250px" />)
            ) : (
              projects.map((project, index) => (
                <motion.div key={index} variants={fadeInUp} className="glass-card" whileHover={{ y: -10 }}>
                  <Briefcase size={32} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{project.description}</p>
                  {project.link ? (
                    <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                      View Project
                    </a>
                  ) : (
                    <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', opacity: 0.5, cursor: 'not-allowed' }} disabled>
                      No Link Provided
                    </button>
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={{ padding: '6rem 0', background: 'var(--bg-color-lighter)' }}>
        <div className="container">
          <h2 className="section-title">Education</h2>
          <motion.div 
            key={loadingEdu ? 'loading' : 'loaded'}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
          >
            {loadingEdu ? (
              Array(2).fill(0).map((_, i) => <SkeletonCard key={i} height="200px" />)
            ) : (
              education.map((edu, index) => (
                <motion.div key={index} variants={fadeInUp} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }} whileHover={{ y: -10 }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                    <GraduationCap size={28} color="var(--accent-color)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{edu.degree}</h3>
                    <p style={{ color: 'var(--accent-color)', fontWeight: 500, marginBottom: '0.5rem' }}>{edu.institution}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{edu.year}</p>
                    <p style={{ color: 'var(--text-secondary)' }}>{edu.details}</p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '4rem 0 2rem 0' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 className="section-title">Get In Touch</h2>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="glass-card"
            style={{ padding: '1.5rem 1.5rem 1rem 1.5rem' }}
          >
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" value={contactForm.name} onChange={handleContactChange} required disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" value={contactForm.email} onChange={handleContactChange} required disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Your Message" value={contactForm.message} onChange={handleContactChange} required disabled={isSubmitting}></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <>Send Message <Send size={18} /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
