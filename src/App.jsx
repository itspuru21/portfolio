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
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        
        {/* The main content flex-grows to push the footer to the bottom of the page */}
        <main className="flex-grow pt-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}