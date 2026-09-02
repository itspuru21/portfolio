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
    <section id="contact" className="py-20" ref={sectionRef}>
      <div className="text-center mb-16 fade-up opacity-0 translate-y-8 transition-all duration-700">
        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm">Say Hello</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 mb-4">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          I'm open to opportunities, collaborations, or just a friendly chat. Reach out!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        
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
    </section>
  );
}