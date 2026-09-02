import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';

const Home = () => (
  <div className="flex flex-col gap-10">
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Education />
    <Contact />
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
        
        {/* --- NEW: Ambient Glowing Background --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Top left blue glow */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[100px]"></div>
          {/* Bottom right indigo glow */}
          <div className="absolute top-1/2 -right-20 w-[30rem] h-[30rem] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px]"></div>
        </div>
        {/* --------------------------------------- */}

        <Navbar />
        
        {/* Added relative z-10 so content sits above the background glow */}
        <main className="flex-grow pt-24 px-4 sm:px-6 max-w-6xl mx-auto w-full relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </Router>
  );
}