import { useState } from 'react';

// Pre-defined taxonomy for a DevOps portfolio
const AVAILABLE_CATEGORIES = ['AWS', 'Terraform', 'Kubernetes', 'CI/CD', 'Security', 'Networking', 'Python', 'Chaos Engineering', 'GitOps'];
const AVAILABLE_PROJECTS = ['General / Concept', 'ChaosForge-Lab', 'GitOps EKS Cluster', 'Serverless Log Pipeline', '3-Tier VPC Design', 'React Portfolio'];

export default function Admin() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [selectedProject, setSelectedProject] = useState('General / Concept');
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setStatus('Publishing...');

    const date = new Date().toISOString().split('T')[0];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const filename = `${date}-${slug}.md`;

    // The new Frontmatter includes project and multiple categories
    const fileContent = `---
title: "${title}"
date: "${date}"
summary: "${summary}"
project: "${selectedProject}"
categories: [${selectedCategories.map(c => `"${c}"`).join(', ')}]
---

${content}`;

    try {
      const response = await fetch(`https://api.github.com/repos/itspuru21/portfolio/contents/public/posts/${filename}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `blog: published ${title}`,
          content: btoa(unescape(encodeURIComponent(fileContent))), // Safe base64 encoding
          branch: 'main'
        })
      });

      if (response.ok) {
        setStatus('Published successfully! (Wait ~1 min for GitHub Actions to deploy)');
        setTitle(''); setSummary(''); setContent(''); setSelectedCategories([]); setSelectedProject('General / Concept');
      } else {
        setStatus('Error publishing. Check your token.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Failed to connect to GitHub API.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-slate-800 pb-4">
          Write a New Engineering Log
        </h1>
        
        <form onSubmit={handlePublish} className="space-y-6">
          {/* GitHub Token */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub Personal Access Token (PAT)</label>
            <input type="password" required value={token} onChange={e => setToken(e.target.value)} className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          {/* Title & Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Post Title</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Summary</label>
            <input type="text" required value={summary} onChange={e => setSummary(e.target.value)} className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          {/* NEW: Project Dropdown & Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Related Project</label>
              <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                {AVAILABLE_PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tags / Categories (Select multiple)</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_CATEGORIES.map(cat => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${selectedCategories.includes(cat) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-slate-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Markdown Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Markdown Content</label>
            <textarea required rows="10" value={content} onChange={e => setContent(e.target.value)} className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" placeholder="## Introduction..."></textarea>
            <p className="text-xs text-gray-500 mt-2">💡 Tip: To add images, drag & drop them into a GitHub Issue comment box, copy the markdown link it generates, and paste it here.</p>
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
            Commit & Deploy Post
          </button>
          
          {status && <p className="text-center font-semibold text-blue-600 dark:text-blue-400 mt-4">{status}</p>}
        </form>
      </div>
    </div>
  );
}