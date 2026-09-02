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

  return (
    <section id="skills" className="py-20" ref={sectionRef}>
      <div className="text-center mb-16 fade-up opacity-0 translate-y-8 transition-all duration-700">
        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm">Technical Arsenal</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">Proficiency Matrix</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((category, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 fade-up opacity-0 translate-y-8"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b-2 border-blue-600 inline-block">
              {category.category}
            </h3>
            
            <div className="space-y-6">
              {category.skills.map(skill => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800/30">
                      {skill.level}
                    </span>
                  </div>
                  
                  {/* 3-Tier Segmented Indicator */}
                  <div className="flex gap-1.5 w-full h-1.5">
                    {/* Segment 1: Always lit for Basic, Intermediate, Expert */}
                    <div className={`w-1/3 rounded-full transition-colors duration-500 ${['Basic', 'Intermediate', 'Expert'].includes(skill.level) ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-slate-800'}`}></div>
                    
                    {/* Segment 2: Lit only for Intermediate and Expert */}
                    <div className={`w-1/3 rounded-full transition-colors duration-500 ${['Intermediate', 'Expert'].includes(skill.level) ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-slate-800'}`}></div>
                    
                    {/* Segment 3: Lit only for Expert */}
                    <div className={`w-1/3 rounded-full transition-colors duration-500 ${skill.level === 'Expert' ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-slate-800'}`}></div>
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