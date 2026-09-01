import { useEffect, useState } from 'react';

export default function Hero() {
  const [typewriterText, setTypewriterText] = useState('');

  useEffect(() => {
    const roles = ['Android Apps 📱', 'Unity Games 🎮', 'C# Solutions 💻', 'Cloud Infra ☁️', 'Chaos Engineering 🛠️'];
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

  return (
    <section id="home" className="min-h-[calc(100vh-6rem)] flex items-center pt-10 md:pt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-blue-600 dark:text-blue-500 font-semibold tracking-wide">Hi, I'm</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Purushottam <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Garad
            </span>
          </h1>
          
          <div className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium h-8">
            I build <span className="text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400 pr-1 animate-pulse">{typewriterText}</span>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
            A Computer Science graduate passionate about Cloud Infrastructure, DevOps, and building things that matter.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300 font-semibold rounded-lg shadow-sm transition-all">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right Code Card */}
        <div className="hidden md:flex justify-end">
          <div className="w-full max-w-md bg-[#1e1e2e] rounded-xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="flex gap-2 px-4 py-3 bg-[#181825] border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="p-6 text-sm sm:text-base font-mono leading-loose overflow-x-auto">
              <span className="text-pink-400">class</span> <span className="text-yellow-300">Purushottam</span> {'{\n'}
              {'  '}<span className="text-red-400">name</span> = <span className="text-green-400">"Purushottam Garad"</span>;\n
              {'  '}<span className="text-red-400">focus</span> = <span className="text-green-400">"Cloud & DevOps"</span>;\n
              {'  '}<span className="text-red-400">degree</span> = <span className="text-green-400">"B.Tech CST"</span>;\n
              {'  '}<span className="text-red-400">loves</span> = [\n
              {'    '}<span className="text-green-400">"Chaos Engineering"</span>,\n
              {'    '}<span className="text-green-400">"Automation"</span>\n
              {'  '}];\n
              {'}'}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}