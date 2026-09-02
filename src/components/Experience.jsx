import { useEffect, useRef } from 'react';
import experienceData from '../data/experience.json';

export default function Experience() {
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
    <section id="experience" className="py-10" ref={sectionRef}>
      <div className="text-center mb-16 fade-up opacity-0 translate-y-8 transition-all duration-700">
        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm">What I've Done</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">Experience</h2>
      </div>

      <div className="max-w-4xl mx-auto border-l-2 border-gray-200 dark:border-slate-800 ml-4 md:mx-auto space-y-12">
        {experienceData.map((exp, index) => (
          <div 
            key={exp.id} 
            className="relative pl-8 md:pl-12 fade-up opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* The Timeline Dot */}
            <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-gray-50 dark:ring-slate-950"></div>
            
            {/* The Content Card */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                  <p className="font-semibold text-blue-600 dark:text-blue-400 mt-1">{exp.company}</p>
                </div>
                <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap self-start">
                  {exp.badge}
                </span>
              </div>
              
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">{exp.date}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <span key={tag} className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}