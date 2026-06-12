import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/api';
import IconRenderer from '../utils/IconRenderer';
import Marquee from '../components/ui/Marquee';
import toast from 'react-hot-toast';

const Home = () => {
  const [techStack, setTechStack] = useState([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [techRes, projRes] = await Promise.all([
          axios.get('/api/tech'),
          axios.get('/api/projects')
        ]);
        setTechStack(techRes.data);
        setProjectsCount(projRes.data.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const handleDownloadResume = async () => {
    try {
      const res = await axios.get('/api/resume');
      if (res.data && res.data.data) {
        const a = document.createElement('a');
        a.href = res.data.data;
        a.download = 'Resume.pdf';
        a.click();
      } else {
        toast.error('Resume not found.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to download resume.');
    }
  };

  return (
    <div className="pt-2 max-w-6xl mx-auto px-6">
      
      {/* Hero Section */}
      <section className="pt-8 pb-6 md:pt-4 md:pb-8 relative">
        <div className="absolute top-10 right-10 w-24 h-24 bg-peach rounded-full mix-blend-multiply opacity-70 animate-float-slow hidden md:block"></div>
        <div className="absolute top-40 left-10 w-32 h-32 bg-mint rounded-full mix-blend-multiply opacity-60 animate-wiggle hidden md:block"></div>
        <div className="absolute bottom-10 right-32 w-28 h-28 bg-lavender rounded-full mix-blend-multiply opacity-80 animate-spin-slow hidden md:block"></div>

        <div className="chip bg-white text-ink mb-4 z-10 relative">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
          Available for cool stuff
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-4 leading-[1.1] z-10 relative">
          <div className="mb-2">hey, i'm <span className="half-highlight-yellow">abneesh.</span></div>
          <div className="leading-[1.2]">
            i build software{' '}
            <span className="sticker rounded-full bg-coral text-ink px-4 py-1 md:px-6 md:py-2 inline-block -rotate-2 align-middle text-3xl sm:text-4xl md:text-5xl ml-2 mb-2">that sparks joy</span>
          </div>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-muted-foreground mb-8 text-gray-800">
          Software engineer with a soft spot for elegant systems, weird side projects, and the occasional 2 AM competitive programming contest.
        </p>

        <div className="flex flex-wrap gap-4 z-10 relative">
          <Link to="/projects" className="sticker sticker-hover bg-coral text-white px-8 py-3 font-semibold text-lg flex items-center gap-2">
            See my projects →
          </Link>
          <button onClick={handleDownloadResume} className="sticker sticker-hover bg-lemon px-8 py-3 font-semibold text-lg flex items-center gap-2 cursor-pointer">
            📄Resume
          </button>
          <Link to="/contact" className="sticker sticker-hover bg-white px-8 py-3 font-semibold text-lg">
            Say hi
          </Link>
          <Link to="/cp" className="sticker sticker-hover bg-sky px-8 py-3 font-semibold text-lg">
            ⚡CP stats
          </Link>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <Marquee />
      </div>

      {/* About Section */}
      <section className="pt-18 pb-8 grid md:grid-cols-12 gap-12 items-stretch">
        <div className="md:col-span-5">
          <div className="chip bg-white mb-4 -rotate-1">
            📜 the about bit
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A little bit <span className="half-highlight-yellow inline-block">about</span> me.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground mb-8 text-gray-800">
            I love diving into complex problems and writing clean, scalable code.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="sticker bg-lemon p-4 rotate-1">
              <div className="font-display font-bold text-3xl">200+</div>
              <div className="text-sm font-medium">DSA Solved</div>
            </div>
            <Link to="/projects" className="sticker sticker-hover bg-sky p-4 -rotate-1 block text-ink hover:text-ink">
              <div className="font-display font-bold text-3xl">{projectsCount > 3 ? '3+' : projectsCount}</div>
              <div className="text-sm font-medium">Projects</div>
            </Link>
            <div className="sticker bg-mint p-4 -rotate-2">
              <div className="font-display font-bold text-3xl">3</div>
              <div className="text-sm font-medium">CP Platforms</div>
            </div>
            <div className="sticker bg-peach p-4 rotate-2">
              <div className="font-display font-bold text-3xl">∞</div>
              <div className="text-sm font-medium">Cups of Chai</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 h-full">
          <div className="sticker bg-card p-8 md:p-12 rotate-[0.5deg] h-full flex flex-col justify-center">
            <p className="text-lg leading-relaxed mb-6">
              Hi! I'm a passionate Software Engineer who believes that code isn't just instructions for a machine, but a medium for expressing creativity and solving real-world problems.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              When I'm not writing full-stack applications, you can usually find me grinding algorithms on competitive programming platforms or exploring new technologies to add to my toolbox.
            </p>
            <p className="text-lg leading-relaxed">
              I thrive in fast-paced environments where I can build impactful products from the ground up. Whether it's designing scalable backend architectures or obsessing over pixel-perfect UI micro-interactions, I'm always looking for the next big challenge to dive into!
            </p>
          </div>
        </div>
      </section>

      {/* Toolbox Section */}
      <section className="pt-20 pb-5">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            my <span className="half-highlight-yellow inline-block">toolbox</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground mb-8 text-gray-800">
            The tech I reach for most. I'm not religious about any of it — pick the right tool, ship the thing.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-start gap-4 max-w-4xl mb-16">
          {loading ? (
            <div className="flex gap-4">
              <div className="w-24 h-10 bg-[var(--color-ink)]/10 rounded-full animate-pulse"></div>
              <div className="w-32 h-10 bg-[var(--color-ink)]/10 rounded-full animate-pulse"></div>
            </div>
          ) : (
            techStack.map((tech, i) => {
              const rotation = (i % 2 === 0 ? 1 : -1) * (1 + Math.random() * 2);
              const colors = ['var(--color-coral)', 'var(--color-mint)', 'var(--color-lemon)', 'var(--color-sky)', 'var(--color-peach)', 'var(--color-lavender)'];
              const color = colors[i % colors.length];
              
              return (
                <div 
                  key={tech._id} 
                  className={`sticker px-5 py-3 flex items-center gap-3 hover:scale-110 cursor-default`}
                  style={{ transform: `rotate(${rotation}deg)`, backgroundColor: color }}
                >
                  <div className="flex items-center justify-center">
                    <IconRenderer iconName={tech.iconName} size={24} color={tech.color || 'var(--color-ink)'} />
                  </div>
                  <span className="font-bold text-lg">{tech.name}</span>
                </div>
              );
            })
          )}
        </div>

        <div className="sticker bg-white p-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Got a wild idea?</h2>
            <p className="text-lg opacity-80">Let's build it together.</p>
          </div>
          <Link to="/contact" className="sticker sticker-hover rounded-full bg-coral text-ink px-8 py-4 font-bold text-lg flex items-center gap-2">
            Start a conversation →
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
