import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import { SiLeetcode, SiCodeforces, SiCodechef } from 'react-icons/si';
import { Star } from 'lucide-react';

const CPStats = () => {
  const [handles, setHandles] = useState({
    leetcode: 'astri_',
    codeforces: 'astri_',
    codechef: 'astri'
  });

  const [stats, setStats] = useState({
    leetcode: { totalSolved: 0, easy: 0, medium: 0, hard: 0, rating: 0, ratingHistory: [], loading: true },
    codeforces: { rating: 0, totalSolved: 0, ratingHistory: [], loading: true },
    codechef: { rating: 0, stars: '', totalSolved: 0, ratingHistory: [], loading: true }
  });

  const [hoveredPlatform, setHoveredPlatform] = useState(null);
  const [clickedPlatform, setClickedPlatform] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchStats = async () => {
      try {
        const settingsRes = await axios.get('/api/settings');
        const handleData = settingsRes.data || {};
        const leetcodeHandle = handleData.leetcodeHandle || 'astri_';
        const codeforcesHandle = handleData.codeforcesHandle || 'astri_';
        const codechefHandle = handleData.codechefHandle || 'astri';
        
        setHandles({ leetcode: leetcodeHandle, codeforces: codeforcesHandle, codechef: codechefHandle });

        const [lcRes, cfRes, ccRes] = await Promise.all([
          axios.get(`/api/cp/leetcode/${leetcodeHandle}`).catch(() => ({ 
            data: { totalSolved: 500, easySolved: 200, mediumSolved: 250, hardSolved: 50, rating: 2500, ratingHistory: [] }
          })),
          axios.get(`/api/cp/codeforces/${codeforcesHandle}`).catch(() => ({ data: { rating: 3800, totalSolved: 500, ratingHistory: [] }})),
          axios.get(`/api/cp/codechef/${codechefHandle}`).catch(() => ({ data: { rating: 3200, totalSolved: 400, ratingHistory: [] }}))
        ]);

        setStats({
          leetcode: { 
            totalSolved: lcRes.data.totalSolved || 0, 
            easy: lcRes.data.easySolved || 0,
            medium: lcRes.data.mediumSolved || 0,
            hard: lcRes.data.hardSolved || 0,
            rating: lcRes.data.rating || 0,
            ratingHistory: lcRes.data.ratingHistory || [],
            loading: false 
          },
          codeforces: { 
            rating: cfRes.data.rating || 0, 
            totalSolved: cfRes.data.totalSolved || 0,
            ratingHistory: cfRes.data.ratingHistory || [],
            loading: false 
          },
          codechef: { 
            rating: ccRes.data.rating || 0, 
            stars: ccRes.data.stars || '',
            totalSolved: ccRes.data.totalSolved || 0,
            ratingHistory: ccRes.data.ratingHistory || [],
            loading: false 
          }
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  const totalCombinedSolved = stats.leetcode.totalSolved + stats.codeforces.totalSolved + stats.codechef.totalSolved;

  const pieData = [
    { name: 'Easy', value: stats.leetcode.easy, color: '#00b8a3' },
    { name: 'Medium', value: stats.leetcode.medium, color: '#ffc01e' },
    { name: 'Hard', value: stats.leetcode.hard, color: '#ff375f' }
  ];

  const activeChart = hoveredPlatform || clickedPlatform;

  const getActiveChart = () => {
    if (!activeChart) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Questions Solved (Difficulty)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={pieData} 
                innerRadius={80} 
                outerRadius={120} 
                paddingAngle={5} 
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(30, 30, 30, 0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} itemStyle={{ color: 'var(--text-primary)' }} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                content={() => (
                  <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', gap: '1.5rem', padding: 0, margin: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00b8a3' }}><span style={{ width: 12, height: 12, backgroundColor: '#00b8a3', display: 'inline-block' }}></span>Easy</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffc01e' }}><span style={{ width: 12, height: 12, backgroundColor: '#ffc01e', display: 'inline-block' }}></span>Medium</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff375f' }}><span style={{ width: 12, height: 12, backgroundColor: '#ff375f', display: 'inline-block' }}></span>Hard</li>
                  </ul>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      );
    }

    const platformData = stats[activeChart];
    const colors = { leetcode: '#FFA116', codeforces: '#1F8ACB', codechef: '#D69E2E' };
    const color = colors[activeChart];

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div style={{ backgroundColor: 'rgba(30, 30, 30, 0.95)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '12px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '4px', fontSize: '0.85rem' }}>{label}</p>
            <p style={{ color: payload[0].color, fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>
              {`Rating: ${payload[0].value}`}
            </p>
          </div>
        );
      }
      return null;
    };

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem', textTransform: 'capitalize' }}>{activeChart} Rating</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={platformData.ratingHistory} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="contest" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
            <YAxis stroke="var(--text-secondary)" domain={['dataMin - 100', 'dataMax + 100']} />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--text-secondary)', strokeWidth: 1, strokeDasharray: '5 5' }} />
            <Line type="monotone" dataKey="rating" stroke={color} strokeWidth={3} dot={{ r: 4, fill: color }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  const getCodechefStars = () => {
    if (stats.codechef.stars) {
      const match = stats.codechef.stars.match(/\d+/);
      if (match) return parseInt(match[0], 10);
    }
    const r = stats.codechef.rating;
    if (r === 0) return 0;
    if (r < 1400) return 1;
    if (r < 1600) return 2;
    if (r < 1800) return 3;
    if (r < 2000) return 4;
    if (r < 2200) return 5;
    if (r < 2500) return 6;
    return 7;
  };

  const codechefStarCount = getCodechefStars();

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <h1 className="section-title">Competitive Programming</h1>
        
        {/* Profile Links */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <a href={`https://leetcode.com/${handles.leetcode}`} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.3s' }}>
            <SiLeetcode size={32} color="#FFA116" />
            <span style={{ fontWeight: 600 }}>LeetCode</span>
          </a>
          <a href={`https://codeforces.com/profile/${handles.codeforces}`} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.3s' }}>
            <SiCodeforces size={32} color="#1F8ACB" />
            <span style={{ fontWeight: 600 }}>Codeforces</span>
          </a>
          <a href={`https://www.codechef.com/users/${handles.codechef}`} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.3s' }}>
            <SiCodechef size={32} color="#D69E2E" />
            <span style={{ fontWeight: 600 }}>CodeChef</span>
          </a>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'stretch' }}>
          
          {/* Left Column: Stats Boxes */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Total Combined Questions */}
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem', flex: '0 0 auto' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Total Questions Solved (Combined)</p>
              <h2 style={{ fontSize: '4rem', color: 'var(--accent-color)', lineHeight: 1 }}>{totalCombinedSolved}</h2>
            </div>

            {/* Platform Ratings Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem', flex: '1 1 auto' }}>
              
              <div 
                className="glass-card" 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1.5rem 1rem', cursor: 'pointer', transition: 'all 0.3s', borderColor: (hoveredPlatform === 'leetcode' || clickedPlatform === 'leetcode') ? '#FFA116' : 'var(--glass-border)' }}
                onMouseEnter={() => setHoveredPlatform('leetcode')}
                onMouseLeave={() => setHoveredPlatform(null)}
                onClick={() => setClickedPlatform(clickedPlatform === 'leetcode' ? null : 'leetcode')}
              >
                <SiLeetcode size={32} color="#FFA116" style={{ marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>LeetCode Rating</p>
                <h3 style={{ fontSize: '1.8rem', color: '#FFA116' }}>{stats.leetcode.rating}</h3>
              </div>
              
              <div 
                className="glass-card" 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1.5rem 1rem', cursor: 'pointer', transition: 'all 0.3s', borderColor: (hoveredPlatform === 'codeforces' || clickedPlatform === 'codeforces') ? '#1F8ACB' : 'var(--glass-border)' }}
                onMouseEnter={() => setHoveredPlatform('codeforces')}
                onMouseLeave={() => setHoveredPlatform(null)}
                onClick={() => setClickedPlatform(clickedPlatform === 'codeforces' ? null : 'codeforces')}
              >
                <SiCodeforces size={32} color="#1F8ACB" style={{ marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Codeforces Rating</p>
                <h3 style={{ fontSize: '1.8rem', color: '#1F8ACB' }}>{stats.codeforces.rating}</h3>
              </div>

              <div 
                className="glass-card" 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1.5rem 1rem', cursor: 'pointer', transition: 'all 0.3s', borderColor: (hoveredPlatform === 'codechef' || clickedPlatform === 'codechef') ? '#D69E2E' : 'var(--glass-border)' }}
                onMouseEnter={() => setHoveredPlatform('codechef')}
                onMouseLeave={() => setHoveredPlatform(null)}
                onClick={() => setClickedPlatform(clickedPlatform === 'codechef' ? null : 'codechef')}
              >
                <SiCodechef size={32} color="#D69E2E" style={{ marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>CodeChef</p>
                <h3 style={{ fontSize: '1.8rem', color: '#D69E2E', marginBottom: '0.5rem' }}>
                  {stats.codechef.rating}
                </h3>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                  {Array.from({ length: Math.max(5, codechefStarCount) }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < codechefStarCount ? '#D69E2E' : 'transparent'} 
                      color={i < codechefStarCount ? '#D69E2E' : 'var(--text-secondary)'} 
                    />
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Dynamic Chart */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', minHeight: '450px' }}>
            <AnimatePresence mode="wait">
              {getActiveChart()}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default CPStats;
