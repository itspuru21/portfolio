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
    <section id="education" className="py-10" ref={sectionRef}>
      <div className="text-center mb-12 fade-up opacity-0 translate-y-8 transition-all duration-700">
        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm">My Academic Path</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">Education</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {educationData.map((item, index) => (
          <div 
            key={item.id} 
            className="flex flex-col bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 fade-up opacity-0 translate-y-8"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5 h-full">
              
              {/* The Icon */}
              <div className="text-5xl flex-shrink-0 drop-shadow-md">
                {item.icon}
              </div>
              
              {/* The Content */}
              <div className="flex flex-col flex-grow">
                <span className="text-blue-600 dark:text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  {item.level}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 leading-tight">
                  {item.title}
                </h3>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {item.school}
                </h4>
                
                {/* Location and Affiliation */}
                <div className="flex flex-col gap-1.5 mb-6">
                  {/* Location */}
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5 leading-relaxed">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.location}
                  </span>
                  
                  {/* Affiliation */}
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5 leading-relaxed">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {item.affiliation}
                  </span>
                </div>
                
                {/* --- CHANGED: Bottom Badges Container stacked vertically --- */}
                <div className="flex flex-col items-start gap-2 mt-auto pt-2">
                  {/* Score Badge First */}
                  <span className="inline-flex items-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800/30 text-[11px] font-bold">
                    {item.score}
                  </span>

                  {/* Date Badge Second */}
                  <span className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded border border-blue-200 dark:border-blue-800/30 text-[11px] font-semibold">
                    {item.date}
                  </span>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}