import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom smooth scroll function that respects the HashRouter
  const scrollToSection = (id) => {
    setIsMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      // Calculate position minus 80px to account for the fixed navbar height
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-gray-200 dark:border-slate-800 shadow-sm' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" onClick={() => window.scrollTo(0,0)} className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white cursor-pointer">
          PG<span className="text-blue-600 dark:text-blue-500">.</span>
        </Link>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          {isHome ? (
            <>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</button></li>
              <li><button onClick={() => scrollToSection('projects')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</button></li>
              <li><button onClick={() => scrollToSection('skills')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</button></li>
              <li><button onClick={() => scrollToSection('experience')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Experience</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</button></li>
            </>
          ) : (
            <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link></li>
          )}
          <li><Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
          <li><Link to="/admin" className="text-red-600 dark:text-red-400 hover:text-red-700 transition-colors">Admin</Link></li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2 text-gray-600 dark:text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-4 space-y-4 shadow-xl flex flex-col">
          {isHome ? (
            <>
              <button onClick={() => scrollToSection('about')} className="text-left text-gray-700 dark:text-gray-300">About</button>
              <button onClick={() => scrollToSection('skills')} className="text-left text-gray-700 dark:text-gray-300">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="text-left text-gray-700 dark:text-gray-300">Projects</button>
              <button onClick={() => scrollToSection('experience')} className="text-left text-gray-700 dark:text-gray-300">Experience</button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 dark:text-gray-300">Contact</button>
            </>
          ) : (
            <Link to="/" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300">Home</Link>
          )}
          <Link to="/blog" onClick={closeMenu} className="block text-gray-700 dark:text-gray-300">Blog</Link>
          <Link to="/admin" onClick={closeMenu} className="block text-red-600 font-bold">Admin</Link>
        </div>
      )}
    </nav>
  );
}