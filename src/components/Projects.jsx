import { useEffect, useRef, useState } from 'react';
import projectsData from '../data/projects.json';

export default function Projects() {
  const sectionRef = useRef(null);
  // State to track which project card is currently expanded
  const [expandedId, setExpandedId] = useState(null);

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

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="py-10" ref={sectionRef}>
      <div className="text-center mb-12 fade-up opacity-0 translate-y-8 transition-all duration-700">
        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm">What I've Built</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">Projects</h2>
      </div>

      {/* --- FIXED: Added 'items-start' to prevent adjacent cards from stretching --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {projectsData.map((project, index) => {
          const isExpanded = expandedId === project.id;

          return (
            <div 
              key={project.id} 
              onClick={() => toggleExpand(project.id)}
              className="flex flex-col bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 fade-up opacity-0 translate-y-8 cursor-pointer group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Top Row: Type on Left, Icons on Right */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">
                  {project.type}
                </span>
                
                {/* --- FIXED: Added Text Labels to Icons --- */}
                <div className="flex gap-4 items-center" onClick={(e) => e.stopPropagation()}>
                  
                  {/* Live Link */}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors" title="Open Live Site">
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block mt-0.5">Live Demo</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  )}
                  
                  {/* GitHub Link */}
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors" title="View Source Code">
                    <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block mt-0.5">Source</span>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                  </a>
                  
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </span>
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                {project.description}
              </p>
              
              {/* Expandable Details Section */}
              <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="pt-2 pb-6 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-slate-800 mt-2">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-1">Architecture & Impact:</span>
                    {project.details}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Tech Stack & Expand Icon */}
              <div className="flex justify-between items-end mt-auto pt-2">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Expand/Collapse Chevron Icon */}
                <div className="flex-shrink-0 ml-4 text-gray-400 group-hover:text-blue-500 transition-colors">
                  <svg 
                    className={`w-6 h-6 transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-500' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}