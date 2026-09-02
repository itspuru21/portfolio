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
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 fade-up opacity-0 translate-y-8"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b-2 border-blue-600 inline-block">
              {category.category}
            </h3>
            <div className="space-y-5">
              {category.skills.map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
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