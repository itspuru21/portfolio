import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter & Sort State
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProject, setActiveProject] = useState('All Projects');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/itspuru21/portfolio/contents/public/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        
        const files = await res.json();
        const mdFiles = files.filter(file => file.name.endsWith('.md'));
        
        const parsedPosts = await Promise.all(mdFiles.map(async (file) => {
          const fileRes = await fetch(file.download_url);
          const text = await fileRes.text();
          
          // Robust regex to extract frontmatter data
          const titleMatch = text.match(/title:\s*"(.*?)"/);
          const dateMatch = text.match(/date:\s*"(.*?)"/);
          const summaryMatch = text.match(/summary:\s*"(.*?)"/);
          const projectMatch = text.match(/project:\s*"(.*?)"/);
          
          // Extract categories array: categories: ["AWS", "CI/CD"]
          let categories = [];
          const catArrayMatch = text.match(/categories:\s*\[(.*?)\]/);
          if (catArrayMatch) {
            categories = catArrayMatch[1].split(',').map(s => s.replace(/['"]/g, '').trim()).filter(Boolean);
          } else {
            // Fallback for older posts that just used category: "DevOps"
            const singleCatMatch = text.match(/category:\s*"(.*?)"/);
            if (singleCatMatch) categories = [singleCatMatch[1]];
          }

          return {
            slug: file.name.replace('.md', ''),
            title: titleMatch ? titleMatch[1] : 'Untitled',
            date: dateMatch ? dateMatch[1] : '2024-01-01',
            summary: summaryMatch ? summaryMatch[1] : '',
            project: projectMatch && projectMatch[1] !== '' ? projectMatch[1] : 'General / Concept',
            categories: categories.length > 0 ? categories : ['Uncategorized'],
          };
        }));
        
        setPosts(parsedPosts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Derive unique categories and projects from the fetched posts
  const allCategories = ['All', ...new Set(posts.flatMap(p => p.categories))];
  const allProjects = ['All Projects', ...new Set(posts.map(p => p.project))];

  // Apply Filters and Sorting
  const filteredPosts = posts
    .filter(post => activeCategory === 'All' || post.categories.includes(activeCategory))
    .filter(post => activeProject === 'All Projects' || post.project === activeProject)
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    });

  return (
    <div className="py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12 border-b border-gray-200 dark:border-slate-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Engineering Logs
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Deep dives into Cloud architecture, CI/CD automation, and lessons learned while building highly available systems.
        </p>
      </div>

      {/* Control Panel: Filters & Sorting */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 mb-10 shadow-sm">
        
        {/* Top Row: Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Filter by Project</label>
            <select 
              value={activeProject} 
              onChange={(e) => setActiveProject(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            >
              {allProjects.map(proj => <option key={proj} value={proj}>{proj}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sort By Date</label>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Category Pills */}
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Filter by Tech Topic</label>
        <div className="flex flex-wrap gap-2">
          {allCategories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-blue-600">
          <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          No posts match your selected filters. Try broadening your search.
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map(post => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className="group block bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                
                {/* Project Tag */}
                {post.project !== 'General / Concept' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold border border-indigo-200 dark:border-indigo-800/30">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                    {post.project}
                  </span>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                {post.summary}
              </p>
              
              {/* Category Tags */}
              <div className="flex flex-wrap gap-2">
                {post.categories.map(cat => (
                  <span key={cat} className="text-xs font-semibold px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full">
                    {cat}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}