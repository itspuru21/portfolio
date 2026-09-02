import { useEffect, useState } from 'react';

export default function Hero() {
  const [typewriterText, setTypewriterText] = useState('');

  useEffect(() => {
    const roles = ['AWS Architecture ☁️', 'Terraform Configs 🛠️', 'Kubernetes Clusters 🚢', 'GitOps Pipelines ⚡', 'Chaos Engineering 💥'];
    let roleIndex = 0, charIndex = 0, deleting = false, timer;

    const type = () => {
      const current = roles[roleIndex];
      if (deleting) {
        setTypewriterText(current.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex < 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; timer = setTimeout(type, 500); return; }
      } else {
        setTypewriterText(current.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex > current.length) { deleting = true; timer = setTimeout(type, 1800); return; }
      }
      timer = setTimeout(type, deleting ? 60 : 100);
    };
    timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, []);

  // Custom smooth scroll function that respects the HashRouter and fixed navbar height
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80; // Offset for navbar
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-[calc(100vh-6rem)] flex items-center pt-10 md:pt-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-sm mb-2 border border-blue-200 dark:border-blue-800/30 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
            Cloud & DevOps Practitioner
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Purushottam <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Garad
            </span>
          </h1>
          
          <div className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium h-8 flex justify-center lg:justify-start">
            I build&nbsp;<span className="text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400 pr-1 animate-pulse">{typewriterText}</span>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            A Computer Science graduate architecting resilient cloud infrastructure, automating deployments, and building things that matter.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <button onClick={() => scrollToSection('projects')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors">
              View My Work
            </button>
            <button onClick={() => scrollToSection('contact')} className="px-6 py-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300 font-semibold rounded-lg shadow-sm transition-all">
              Get In Touch
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-end">
          <div className="w-full max-w-lg bg-[#0d1117] rounded-xl shadow-2xl overflow-hidden border border-gray-800 transform hover:-translate-y-2 transition-transform duration-500">
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-gray-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-500 text-xs font-mono">bash ~ deploy.sh</span>
            </div>
            <div className="p-6 text-sm font-mono leading-loose overflow-x-auto text-gray-300 space-y-2">
              <div className="flex gap-2"><span className="text-blue-400">$</span><span>terraform apply -auto-approve</span></div>
              <div className="text-green-400">✔ AWS EC2 Instances provisioned</div>
              <div className="flex gap-2 mt-2"><span className="text-blue-400">$</span><span>kubectl apply -f chaosforge.yaml</span></div>
              <div className="text-green-400">✔ deployment.apps/chaos-node created</div>
              <div className="text-green-400">✔ service/chaos-monitor exposed</div>
              <div className="flex gap-2 mt-2"><span className="text-blue-400">$</span><span>gh run watch</span></div>
              <div className="text-purple-400 animate-pulse">⟳ Running integration tests...</div>
              <div className="text-green-400">✔ Pipeline deployed successfully in 42s</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}