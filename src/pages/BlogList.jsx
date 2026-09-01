
import { useState } from 'react';
import { Link } from 'react-router-dom';
import fm from 'front-matter';

// Vite magic: This grabs all .md files in the blogs folder as raw strings
const rawPosts = import.meta.glob('../content/blogs/*.md', { query: '?raw', import: 'default', eager: true });

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Parse the markdown files and sort them by date
  const posts = Object.entries(rawPosts).map(([path, content]) => {
    const parsed = fm(content);
    return {
      slug: path.split('/').pop().replace('.md', ''),
      frontmatter: parsed.attributes,
    };
  }).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

  // Extract unique categories for our filter buttons
  const categories = ['All', ...new Set(posts.flatMap(post => post.frontmatter.categories || []))];

  // Filter posts based on active category
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.frontmatter.categories?.includes(activeCategory));

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">DevOps & Chaos Engineering Blog</h1>
      
      {/* Category Filter Buttons */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors
              ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Post List */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <Link to={`/blog/${post.slug}`} key={post.slug} className="block group border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold group-hover:text-blue-600 mb-2">{post.frontmatter.title}</h2>
            <div className="flex gap-2 text-sm text-gray-500 mb-3">
              <span>{post.frontmatter.date}</span>
              <span>•</span>
              <span className="flex gap-2">
                {post.frontmatter.categories?.map(cat => (
                  <span key={cat} className="bg-gray-100 px-2 py-0.5 rounded">{cat}</span>
                ))}
              </span>
            </div>
            <p className="text-gray-600">{post.frontmatter.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}