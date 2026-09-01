import { useEffect, useRef } from 'react';
import educationData from '../data/education.json';

export default function Education() {
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
    <section id="education" className="py-20" ref={sectionRef}>
      <div className="text-center mb-16 fade-up opacity-0 translate-y-8 transition-all duration-700">
        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm">My Academic Path</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">Education</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((edu, index) => (
          <div 
            key={edu.id} 
            className="flex gap-4 md:gap-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 fade-up opacity-0 translate-y-8"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="text-4xl md:text-5xl flex-shrink-0 mt-1">{edu.icon}</div>
            
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-2">
                {edu.level}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{edu.degree}</h3>
              <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{edu.college}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{edu.affiliation}</p>
              
              <div className="mt-auto pt-2">
                <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold inline-block">
                  {edu.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}