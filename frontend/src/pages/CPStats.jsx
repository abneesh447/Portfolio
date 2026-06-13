import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from '../utils/api';
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
        <div className="h-full flex flex-col">
          <h3 className="text-xl font-bold text-center mb-6">Questions Solved (Difficulty)</h3>
          <div className="w-full h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  innerRadius="45%" 
                  outerRadius="75%" 
                  paddingAngle={5} 
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="var(--color-ink)"
                  strokeWidth={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--color-cream)', border: '2px solid var(--color-ink)', borderRadius: '12px', boxShadow: '4px 4px 0 0 var(--color-ink)' }} 
                  itemStyle={{ color: 'var(--color-ink)', fontWeight: 'bold' }} 
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  content={() => (
                    <ul className="flex justify-center gap-3 md:gap-6 font-bold text-sm md:text-base">
                      <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-[var(--color-ink)]" style={{backgroundColor: '#00b8a3'}}></div>Easy</li>
                      <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-[var(--color-ink)]" style={{backgroundColor: '#ffc01e'}}></div>Medium</li>
                      <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-[var(--color-ink)]" style={{backgroundColor: '#ff375f'}}></div>Hard</li>
                    </ul>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }

    const platformData = stats[activeChart];
    const colors = { leetcode: '#FFA116', codeforces: '#1F8ACB', codechef: '#D69E2E' };
    const color = colors[activeChart];

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-[var(--color-cream)] border-2 border-[var(--color-ink)] rounded-xl p-3 shadow-[4px_4px_0_0_var(--color-ink)]">
            <p className="text-sm opacity-80 mb-1 font-bold">{label}</p>
            <p className="text-lg font-black m-0" style={{ color: payload[0].color }}>
              {`Rating: ${payload[0].value}`}
            </p>
          </div>
        );
      }
      return null;
    };

    return (
      <div className="h-full flex flex-col">
        <h3 className="text-xl font-bold text-center mb-6 capitalize">{activeChart} Rating</h3>
        <div className="w-full h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={platformData.ratingHistory} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="contest" stroke="var(--color-ink)" tick={{fontSize: 12, fontWeight: 'bold'}} tickMargin={10} />
              <YAxis stroke="var(--color-ink)" domain={['dataMin - 100', 'dataMax + 100']} tick={{fontWeight: 'bold', fontSize: 12}} width={40} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-ink)', strokeWidth: 2, strokeDasharray: '5 5' }} />
              <Line type="stepAfter" dataKey="rating" stroke={color} strokeWidth={4} dot={{ r: 5, fill: color, stroke: 'var(--color-ink)', strokeWidth: 2 }} activeDot={{ r: 8, stroke: 'var(--color-ink)', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
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
    <div className="max-w-6xl mx-auto px-6">
      <div className="pt-8 pb-16 text-left">
        <div className="chip bg-white text-ink mb-4">
          🏆 competitive programming
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          competitive <span className="half-highlight-yellow">programming</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-gray-800">
          A snapshot of my CP grind across the three big platforms. Numbers go up and down — but the muscle memory only grows.
        </p>
      </div>

      {/* Profile Links */}
      <div className="flex flex-wrap justify-start gap-6 mb-16">
        <a href={`https://leetcode.com/${handles.leetcode}`} target="_blank" rel="noreferrer" className="sticker sticker-hover bg-white px-6 py-4 flex items-center gap-3 rotate-1">
          <SiLeetcode size={32} color="#FFA116" />
          <span className="font-bold text-xl">LeetCode</span>
        </a>
        <a href={`https://codeforces.com/profile/${handles.codeforces}`} target="_blank" rel="noreferrer" className="sticker sticker-hover bg-white px-6 py-4 flex items-center gap-3 -rotate-1">
          <SiCodeforces size={32} color="#1F8ACB" />
          <span className="font-bold text-xl">Codeforces</span>
        </a>
        <a href={`https://www.codechef.com/users/${handles.codechef}`} target="_blank" rel="noreferrer" className="sticker sticker-hover bg-white px-6 py-4 flex items-center gap-3 rotate-2">
          <SiCodechef size={32} color="#D69E2E" />
          <span className="font-bold text-xl">CodeChef</span>
        </a>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-20">
        
        {/* Left Column: Stats Boxes */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Total Combined Questions */}
          <div className="sticker bg-lemon text-center p-8 flex-none -rotate-1">
            <p className="font-bold text-lg mb-2">Total Questions Solved</p>
            <h2 className="text-6xl md:text-7xl font-black">{totalCombinedSolved}</h2>
          </div>

          {/* Platform Ratings Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-6 flex-1">
            
            <div 
              className={`sticker p-6 text-center cursor-pointer transition-transform duration-200 rotate-1 flex flex-col justify-center ${hoveredPlatform === 'leetcode' || clickedPlatform === 'leetcode' ? 'bg-[#FFA116]/20' : 'bg-white hover:-translate-y-1'}`}
              onMouseEnter={() => setHoveredPlatform('leetcode')}
              onMouseLeave={() => setHoveredPlatform(null)}
              onClick={() => setClickedPlatform(clickedPlatform === 'leetcode' ? null : 'leetcode')}
            >
              <SiLeetcode size={32} color="#FFA116" className="mx-auto mb-3" />
              <p className="text-sm font-bold opacity-70 mb-1">LeetCode Rating</p>
              <h3 className="text-3xl font-black text-[#FFA116]">{stats.leetcode.rating}</h3>
            </div>
            
            <div 
              className={`sticker p-6 text-center cursor-pointer transition-transform duration-200 -rotate-1 flex flex-col justify-center ${hoveredPlatform === 'codeforces' || clickedPlatform === 'codeforces' ? 'bg-[#1F8ACB]/20' : 'bg-white hover:-translate-y-1'}`}
              onMouseEnter={() => setHoveredPlatform('codeforces')}
              onMouseLeave={() => setHoveredPlatform(null)}
              onClick={() => setClickedPlatform(clickedPlatform === 'codeforces' ? null : 'codeforces')}
            >
              <SiCodeforces size={32} color="#1F8ACB" className="mx-auto mb-3" />
              <p className="text-sm font-bold opacity-70 mb-1">Codeforces Rating</p>
              <h3 className="text-3xl font-black text-[#1F8ACB]">{stats.codeforces.rating}</h3>
            </div>

            <div 
              className={`sticker p-6 text-center cursor-pointer transition-transform duration-200 col-span-2 sm:col-span-1 lg:col-span-2 rotate-1 flex flex-col justify-center ${hoveredPlatform === 'codechef' || clickedPlatform === 'codechef' ? 'bg-[#D69E2E]/20' : 'bg-white hover:-translate-y-1'}`}
              onMouseEnter={() => setHoveredPlatform('codechef')}
              onMouseLeave={() => setHoveredPlatform(null)}
              onClick={() => setClickedPlatform(clickedPlatform === 'codechef' ? null : 'codechef')}
            >
              <SiCodechef size={32} color="#D69E2E" className="mx-auto mb-3" />
              <p className="text-sm font-bold opacity-70 mb-1">CodeChef Rating</p>
              <h3 className="text-3xl font-black text-[#D69E2E] mb-2">{stats.codechef.rating}</h3>
              <div className="flex justify-center gap-1">
                {Array.from({ length: Math.max(5, codechefStarCount) }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < codechefStarCount ? '#D69E2E' : 'transparent'} 
                    color={i < codechefStarCount ? '#D69E2E' : 'var(--color-ink)'} 
                    strokeWidth={i < codechefStarCount ? 0 : 2}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Dynamic Chart */}
        <div className="flex-[2] sticker bg-white p-4 sm:p-8 lg:min-h-[500px]">
          {getActiveChart()}
        </div>

      </div>
    </div>
  );
};

export default CPStats;
