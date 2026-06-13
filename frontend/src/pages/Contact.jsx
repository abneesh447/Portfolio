import React, { useState, useEffect } from 'react';
import axios from '../utils/api';
import toast from 'react-hot-toast';
import { Send, Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading('Sending message...');
    
    try {
      await axios.post('/api/messages', formData);
      toast.success('Message sent! I will get back to you soon.', { id: loadingToast });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message. Please try again.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      
      <div className="pt-8 pb-16 text-left">
        <div className="chip bg-white text-ink mb-4">
          📬 say hello
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          let's <span className="half-highlight-yellow">talk</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-gray-800">
          Got a project, a job, a question, or just want to nerd out about algorithms? My inbox is open.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        
        {/* Left: Contact Info */}
        <div className="flex flex-col gap-4 h-full">
          <div className="sticker bg-peach px-8 py-5 flex-[1.2] flex flex-col justify-center -rotate-1">
            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[var(--color-ink)] shrink-0">
                  <Mail className="text-[var(--color-ink)]" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold opacity-70 text-sm">Email</p>
                  <p className="font-bold text-base sm:text-lg break-all">abneeshpatel9@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[var(--color-ink)] shrink-0">
                  <MapPin className="text-[var(--color-ink)]" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold opacity-70 text-sm">Location</p>
                  <p className="font-bold text-lg">Earth</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-[2]">
            <a href="https://linkedin.com/in/abneeshpatel9" target="_blank" rel="noreferrer" className="sticker sticker-hover bg-sky px-6 py-4 flex-1 flex items-center justify-between group !rounded-full">
              <div className="flex items-center gap-4">
                <FaLinkedin size={24} className="text-[var(--color-ink)]" />
                <span className="font-bold text-lg text-[var(--color-ink)]">LinkedIn</span>
              </div>
              <span className="font-bold group-hover:translate-x-2 transition-transform text-[var(--color-ink)]">→</span>
            </a>
            <a href="https://github.com/abneeshpatel9" target="_blank" rel="noreferrer" className="sticker sticker-hover bg-mint px-6 py-4 flex-1 flex items-center justify-between group !rounded-full">
              <div className="flex items-center gap-4">
                <FaGithub size={24} className="text-[var(--color-ink)]" />
                <span className="font-bold text-lg text-[var(--color-ink)]">GitHub</span>
              </div>
              <span className="font-bold group-hover:translate-x-2 transition-transform text-[var(--color-ink)]">→</span>
            </a>
            <a href="https://twitter.com/abneeshpatel9" target="_blank" rel="noreferrer" className="sticker sticker-hover bg-lavender px-6 py-4 flex-1 flex items-center justify-between group !rounded-full">
              <div className="flex items-center gap-4">
                <FaTwitter size={24} className="text-[var(--color-ink)]" />
                <span className="font-bold text-lg text-[var(--color-ink)]">Twitter</span>
              </div>
              <span className="font-bold group-hover:translate-x-2 transition-transform text-[var(--color-ink)]">→</span>
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="sticker bg-white p-8 md:p-10 relative h-full flex flex-col justify-center rotate-1">
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-sky rounded-full border-2 border-[var(--color-ink)] animate-wiggle"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-bold mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium"
                placeholder="abc"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block font-bold mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium"
                placeholder="abc@gmail.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block font-bold mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border-2 border-[var(--color-ink)] rounded-xl px-4 py-3 bg-cream focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_0_var(--color-ink)] transition-all font-medium resize-none"
                placeholder="Hello!"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sticker sticker-hover bg-coral text-white font-bold text-lg py-4 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Sending...' : <>Send Message <Send size={20} /></>}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
