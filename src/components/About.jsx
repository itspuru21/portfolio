import { useEffect, useRef } from 'react';

export default function About() {
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
    <section id="about" className="py-20" ref={sectionRef}>
      <div className="text-center mb-16 fade-up opacity-0 translate-y-8 transition-all duration-700">
        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm">Who I Am</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">About Me</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
        
        {/* Left Side: Text Content */}
        <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg fade-up opacity-0 translate-y-8 transition-all duration-700 delay-100">
          <p>I'm Purushottam Garad, a Computer Science graduate from Shreeyash College of Engineering and Technology, specializing in Cloud Architecture, Automation, and Site Reliability Engineering.</p>
          <p>My technical journey began with software development, but I quickly discovered my true passion lies in the infrastructure that powers those applications. I thrive on designing highly available AWS architectures, writing resilient Infrastructure as Code (IaC), and automating complex CI/CD pipelines.</p>
          <p>Whether it's containerizing microservices with Docker and Kubernetes, implementing GitOps workflows with ArgoCD, or writing custom Python scripts for AWS automation, I am dedicated to building secure, scalable, and self-healing systems.</p>
          
          {/* --- MOVED QUICK INFO (Degree, Location, Status) --- */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-4 pt-4 pb-2 border-b border-gray-200 dark:border-slate-800">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Degree</span>
              <span className="font-bold text-gray-900 dark:text-white">B.Tech — CST</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Location</span>
              <span className="font-bold text-gray-900 dark:text-white">Maharashtra, India</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Status</span>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 py-1 px-3 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                  Open to Work
                </span>
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 py-1 px-3 rounded-full text-xs font-bold border border-indigo-200 dark:border-indigo-800">
                  Open to Relocation
                </span>
              </div>
            </div>
          </div>
          
          {/* Facts/Stats */}
          <div className="flex flex-wrap gap-8 pt-4">
            <div className="flex flex-col">
              <span className="text-4xl font-black text-blue-600 dark:text-blue-500">2+</span>
              <span className="text-sm font-semibold uppercase tracking-wide mt-1">Years of<br />Coding</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-black text-blue-600 dark:text-blue-500">10+</span>
              <span className="text-sm font-semibold uppercase tracking-wide mt-1">Technologies<br />Learned</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-black text-blue-600 dark:text-blue-500">1</span>
              <span className="text-sm font-semibold uppercase tracking-wide mt-1">Internship<br />Completed</span>
            </div>
          </div>
        </div>

        {/* Right Side: Profile Image ONLY */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden fade-up opacity-0 translate-y-8 transition-all duration-700 delay-200">
          <div className="w-full aspect-[4/5] bg-gray-200 dark:bg-slate-800 relative">
            <img 
              src="/portfolio/profile.jpg" 
              alt="Purushottam Garad" 
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}