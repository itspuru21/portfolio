import { useState } from 'react';
import { Link } from 'react-router-dom';
import fm from 'front-matter';

// Grabs all .md files in the blogs folder
const rawPosts = import.meta.glob('../content/blogs/*.md', { query: '?raw', import: 'default', eager: true });

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState('All');

  const posts = Object.entries(rawPosts).map(([path, content]) => {
    const parsed = fm(content);
    return {
      slug: path.split('/').pop().replace('.md', ''),
      frontmatter: parsed.attributes,
    };
  }).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

  const categories = ['All', ...new Set(posts.flatMap(post => post.frontmatter.categories || []))];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.frontmatter.categories?.includes(activeCategory));

  return (
    <div className="py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
        DevOps & Chaos Engineering Blog
      </h1>
      
      {/* Category Filters */}
      <div className="flex gap-3 mb-12 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              activeCategory === category 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Posts */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <Link 
            to={`/blog/${post.slug}`} 
            key={post.slug} 
            className="block group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-3 transition-colors">
              {post.frontmatter.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="font-medium">{post.frontmatter.date}</span>
              <span>•</span>
              <div className="flex gap-2">
                {post.frontmatter.categories?.map(cat => (
                  <span key={cat} className="bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {post.frontmatter.excerpt}
            </p>
          </Link>
        ))}
        {filteredPosts.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400 italic">No posts found in this category.</div>
        )}
      </div>
    </div>
  );
}