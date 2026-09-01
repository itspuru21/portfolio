import { useState } from 'react';

export default function Admin() {
  // Credentials State
  const [token, setToken] = useState('');
  const [owner, setOwner] = useState(''); // e.g., itspuru21
  const [repo, setRepo] = useState('portfolio'); // your repo name
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Post Form State
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  
  // UI State
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  // Safe Base64 encoding that handles special characters properly
  const utf8ToBase64 = (str) => {
    return window.btoa(unescape(encodeURIComponent(str)));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: 'Publishing to GitHub...', error: false });

    // 1. Generate a URL-friendly slug from the title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // 2. Format the Frontmatter and Markdown body
    const categoryArray = categories.split(',').map(c => `"${c.trim()}"`).join(', ');
    const fileContent = `---
title: "${title}"
date: "${date}"
categories: [${categoryArray}]
excerpt: "${excerpt}"
---
${content}`;

    // 3. Call the GitHub REST API
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/src/content/blogs/${slug}.md`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `docs: add new blog post - ${title}`,
          content: utf8ToBase64(fileContent),
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to push to GitHub');
      }

      setStatus({ loading: false, message: 'Success! Post published to GitHub.', error: false });
      // Clear form on success
      setTitle(''); setCategories(''); setExcerpt(''); setContent('');
      
    } catch (error) {
      setStatus({ loading: false, message: error.message, error: true });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your GitHub details to interact with the repository API.</p>
        <div className="space-y-4">
          <input type="text" placeholder="GitHub Username (e.g. itspuru21)" className="w-full p-2 border rounded" value={owner} onChange={e => setOwner(e.target.value)} />
          <input type="text" placeholder="Repository Name (e.g. portfolio)" className="w-full p-2 border rounded" value={repo} onChange={e => setRepo(e.target.value)} />
          <input type="password" placeholder="GitHub Personal Access Token" className="w-full p-2 border rounded" value={token} onChange={e => setToken(e.target.value)} />
          <button onClick={() => setIsLoggedIn(true)} className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">Access CMS</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Write New Post</h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-sm text-red-500 hover:underline">Log Out</button>
      </div>
      
      <form onSubmit={handlePublish} className="space-y-4 border p-6 rounded-lg shadow-sm">
        <div>
          <label className="block text-sm font-bold mb-1">Title</label>
          <input required type="text" className="w-full p-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-1">Categories (comma separated)</label>
          <input required type="text" placeholder="ChaosForge-Lab, DevOps" className="w-full p-2 border rounded" value={categories} onChange={e => setCategories(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Excerpt (short summary)</label>
          <input required type="text" className="w-full p-2 border rounded" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Markdown Content</label>
          <textarea required rows="10" className="w-full p-2 border rounded font-mono text-sm" value={content} onChange={e => setContent(e.target.value)} placeholder="## Start writing here..."></textarea>
        </div>

        <button type="submit" disabled={status.loading} className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 disabled:opacity-50 transition-opacity">
          {status.loading ? 'Pushing to Repository...' : 'Publish to GitHub'}
        </button>

        {status.message && (
          <div className={`p-3 rounded mt-4 ${status.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}