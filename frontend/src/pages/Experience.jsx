import React, { useState, useEffect } from 'react';
import axios from '../utils/api';

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, eduRes] = await Promise.all([
          axios.get('/api/experience').catch(() => ({ data: [] })),
          axios.get('/api/education').catch(() => ({ data: [] }))
        ]);
        setExperience(expRes.data);
        setEducation(eduRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6">
      
      <div className="pt-8 pb-16 text-left">
        <div className="chip bg-white text-ink mb-4">
          📜 the resume bit
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          where i've <span className="half-highlight-yellow">been</span>
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin-slow w-16 h-16 border-4 border-dashed border-[var(--color-ink)] rounded-full"></div>
        </div>
      ) : (
        <div className="space-y-16 mb-20">
          
          {/* Experience Section */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <span className="w-10 h-10 bg-mint rounded-full border-2 border-[var(--color-ink)] flex items-center justify-center">💼</span>
                Work Experience
              </h2>
              
              <div className="space-y-6">
                {experience.map((exp, i) => {
                  const colors = ['bg-coral', 'bg-mint', 'bg-lemon', 'bg-sky', 'bg-peach', 'bg-lavender'];
                  const cardColor = colors[i % colors.length];
                  
                  return (
                    <div key={exp._id || i} className={`sticker ${cardColor} p-6 md:p-8 relative`}>
                      <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-white border-2 border-[var(--color-ink)]"></div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold">{exp.role}</h3>
                          <p className="text-lg font-bold opacity-70">{exp.company}</p>
                        </div>
                        <div className="chip bg-white text-sm">
                          {exp.duration}
                        </div>
                      </div>
                      <ul className="space-y-2 ml-4 list-disc opacity-80 marker:text-[var(--color-ink)] font-medium">
                        {exp.bullets?.map((bullet, idx) => (
                          <li key={idx} className="pl-1">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Education Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
              <span className="w-10 h-10 rounded-full border-2 border-[var(--color-ink)] flex items-center justify-center">🎓</span>
              Education
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {education.length === 0 ? (
                <div className="sticker bg-white p-6 opacity-70 italic col-span-2 text-center">No education data available yet.</div>
              ) : (
                education.map((edu, i) => {
                  const rotation = i % 2 === 0 ? 'rotate-1' : '-rotate-1';
                  const colors = ['bg-sky', 'bg-peach', 'bg-lavender', 'bg-coral', 'bg-mint', 'bg-lemon'];
                  const cardColor = colors[i % colors.length];
                  
                  return (
                    <div key={edu._id || i} className={`sticker ${cardColor} p-6 ${rotation}`}>
                      <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                      <p className="font-bold opacity-70 mb-3">{edu.institution}</p>
                      <div className="chip bg-white text-xs mb-3">{edu.year}</div>
                      <p className="opacity-80 text-sm font-medium">{edu.details}</p>
                    </div>
                  );
                })
              )}
            </div>
          </section>

        </div>
      )}

    </div>
  );
};

export default Experience;
