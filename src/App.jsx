import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';

// A temporary Home placeholder for now
const Home = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold">Home Page (Projects & Skills)</h1>
    <Link to="/blog" className="text-blue-500 hover:underline">Go to Blog</Link>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="max-w-4xl mx-auto p-4 font-sans text-gray-800">
        <nav className="flex gap-4 mb-8 border-b pb-4">
          <Link to="/" className="font-bold hover:text-blue-600">Home</Link>
          <Link to="/blog" className="font-bold hover:text-blue-600">Blog</Link>
          <Link to="/admin" className="font-bold hover:text-red-600 ml-auto">Admin</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}