import { useEffect, useRef } from 'react';
import skillsData from '../data/skills.json';

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('opacity-100', 'translate-y-0');
          e.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.fade-up');
      elements.forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  // NEW: Professional DevOps Color Palette (Cool Tones)
  const getActiveColor = (level) => {
    switch (level) {
      case 'Basic': return 'bg-slate-400 dark:bg-slate-500';
      case 'Intermediate': return 'bg-blue-500';
      case 'Expert': return 'bg-indigo-600 dark:bg-indigo-500';
      default: return 'bg-gray-200 dark:bg-slate-800';
    }
  };

  const getBadgeStyle = (level) => {
    switch (level) {
      case 'Basic': return 'text-slate-700 bg-slate-100 border-slate-200 dark:text-slate-300 dark:bg-slate-800/80 dark:border-slate-700';
      case 'Intermediate': return 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800/30';
      case 'Expert': return 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-900/20 dark:border-indigo-800/30';
      default: return '';
    }
  };

  return (
    <section id="skills" className="py-10" ref={sectionRef}>
      <div className="text-center mb-12 fade-up opacity-0 translate-y-8 transition-all duration-700">
        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm">Technical Arsenal</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">Proficiency Matrix</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((category, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 fade-up opacity-0 translate-y-8"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b-2 border-blue-600 inline-block">
              {category.category}
            </h3>
            
            <div className="space-y-5">
              {category.skills.map(skill => (
                <div key={skill.name} className="group flex justify-between items-center">
                  
                  {/* Skill Name */}
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  
                  {/* Compact Right-Aligned Indicator + Badge */}
                  <div className="flex items-center gap-3">
                    
                    {/* Tiny 3-Segment Dash */}
                    <div className="hidden sm:flex gap-1 w-12 h-1.5 opacity-90">
                      <div className={`w-1/3 rounded-full transition-colors duration-500 ${getActiveColor(skill.level)}`}></div>
                      <div className={`w-1/3 rounded-full transition-colors duration-500 ${['Intermediate', 'Expert'].includes(skill.level) ? getActiveColor(skill.level) : 'bg-gray-200 dark:bg-slate-800'}`}></div>
                      <div className={`w-1/3 rounded-full transition-colors duration-500 ${skill.level === 'Expert' ? getActiveColor(skill.level) : 'bg-gray-200 dark:bg-slate-800'}`}></div>
                    </div>
                    
                    {/* Color-Coded Badge */}
                    <span className={`text-[10px] w-24 text-center font-bold tracking-widest uppercase px-2 py-1 rounded border ${getBadgeStyle(skill.level)}`}>
                      {skill.level}
                    </span>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}