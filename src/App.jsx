import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';

const Home = () => (
  <div className="flex flex-col gap-10 pb-24">
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Education />
  </div>
);

export default function App() {
  return (
    <Router>
      {/* The background and text colors are controlled here globally for dark/light mode */}
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        
        {/* pt-24 pushes all page content down uniformly so the navbar never covers it */}
        <main className="pt-24 px-4 sm:px-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}