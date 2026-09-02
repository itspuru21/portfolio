import { useEffect, useRef } from 'react';

export default function Contact() {
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
    <section id="contact" className="py-10" ref={sectionRef}>
      {/* Header & Availability Badge */}
      <div className="text-center mb-12 fade-up opacity-0 translate-y-8 transition-all duration-700">
        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm">Say Hello</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 mb-4">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          I'm open to new opportunities, technical collaborations, or just a friendly chat about Cloud and DevOps.
        </p>
        
        {/* --- NEW: Timezone & Availability Badge --- */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700 shadow-sm">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Maharashtra, India (IST - UTC+5:30) • Open to Global Remote
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
        
        {/* Email Card */}
        <a 
          href="mailto:garadpurushottam62@gmail.com" 
          className="flex flex-col items-center gap-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 fade-up opacity-0 translate-y-8"
          style={{ transitionDelay: '0ms' }}
        >
          <div className="text-4xl mb-2">✉️</div>
          <span className="font-bold text-gray-900 dark:text-white">Email</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center break-all">
            garadpurushottam62@gmail.com
          </span>
        </a>

        {/* GitHub Card */}
        <a 
          href="https://github.com/itspuru21" 
          target="_blank" 
          rel="noreferrer"
          className="flex flex-col items-center gap-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 fade-up opacity-0 translate-y-8"
          style={{ transitionDelay: '100ms' }}
        >
          <div className="text-gray-800 dark:text-white mb-2">
            <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </div>
          <span className="font-bold text-gray-900 dark:text-white">GitHub</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
            itspuru21
          </span>
        </a>

        {/* LinkedIn Card */}
        <a 
          href="https://www.linkedin.com/in/purushottam-garad-425284378/" 
          target="_blank" 
          rel="noreferrer"
          className="flex flex-col items-center gap-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 fade-up opacity-0 translate-y-8"
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-blue-600 dark:text-blue-500 mb-2">
            <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </div>
          <span className="font-bold text-gray-900 dark:text-white">LinkedIn</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Purushottam Garad
          </span>
        </a>
      </div>

      {/* --- NEW: Resume Download Button --- */}
      <div className="text-center fade-up opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '300ms' }}>
        <a 
          href="/portfolio/resume.pdf" 
          download="Purushottam_Garad_Resume.pdf"
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Resume
        </a>
      </div>
    </section>
  );
}