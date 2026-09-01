import { useState } from 'react';

export default function Admin() {
  const [token, setToken] = useState('');
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('portfolio');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  const utf8ToBase64 = (str) => {
    return window.btoa(unescape(encodeURIComponent(str)));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: 'Publishing to GitHub...', error: false });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const date = new Date().toISOString().split('T')[0];
    
    const categoryArray = categories.split(',').map(c => `"${c.trim()}"`).join(', ');
    const fileContent = `---
title: "${title}"
date: "${date}"
categories: [${categoryArray}]
excerpt: "${excerpt}"
---
${content}`;

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
      setTitle(''); setCategories(''); setExcerpt(''); setContent('');
      
    } catch (error) {
      setStatus({ loading: false, message: error.message, error: true });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-md mx-auto py-10">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Admin Login</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Enter your GitHub details to access the CMS.</p>
          <div className="space-y-5">
            <input type="text" placeholder="GitHub Username (e.g. itspuru21)" className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={owner} onChange={e => setOwner(e.target.value)} />
            <input type="text" placeholder="Repository Name (e.g. portfolio)" className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={repo} onChange={e => setRepo(e.target.value)} />
            <input type="password" placeholder="GitHub PAT Token" className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={token} onChange={e => setToken(e.target.value)} />
            <button onClick={() => setIsLoggedIn(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">Access CMS</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Write New Post</h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-sm font-semibold text-red-500 hover:text-red-600 hover:underline">Log Out</button>
      </div>
      
      <form onSubmit={handlePublish} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Title</label>
          <input required type="text" className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Categories (comma separated)</label>
          <input required type="text" placeholder="ChaosForge-Lab, DevOps" className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={categories} onChange={e => setCategories(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Excerpt (short summary)</label>
          <input required type="text" className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Markdown Content</label>
          <textarea required rows="12" className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={content} onChange={e => setContent(e.target.value)} placeholder="## Start writing here..."></textarea>
        </div>

        <button type="submit" disabled={status.loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg disabled:opacity-50 transition-colors">
          {status.loading ? 'Pushing to Repository...' : 'Publish to GitHub'}
        </button>

        {status.message && (
          <div className={`p-4 rounded-lg mt-6 border ${status.error ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400' : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'}`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}