import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug'; // <-- NEW IMPORT

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://raw.githubusercontent.com/itspuru21/portfolio/main/public/posts/${slug}.md`);
        
        if (!res.ok) throw new Error('Post not found');
        
        const text = await res.text();
        
        const titleMatch = text.match(/title:\s*"(.*?)"/);
        const dateMatch = text.match(/date:\s*"(.*?)"/);
        const projectMatch = text.match(/project:\s*"(.*?)"/);
        
        const content = text.replace(/---[\s\S]*?---/, '').trim();

        let displayDate = '';
        if (dateMatch && dateMatch[1]) {
          displayDate = new Date(dateMatch[1]).toLocaleDateString('en-US', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          });
        }

        setPost({
          title: titleMatch ? titleMatch[1] : 'Untitled',
          date: displayDate,
          project: projectMatch ? projectMatch[1] : '',
          content: content
        });
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return (
    <div className="flex justify-center items-center py-32 text-blue-600">
      <svg className="animate-spin h-10 w-10" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-32 text-gray-500 dark:text-gray-400">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Post not found.</h2>
      <p className="mb-6">This post might still be deploying via GitHub Actions. Wait 60 seconds and refresh!</p>
      <Link to="/blog" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
        Return to Logs
      </Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block font-semibold">
        &larr; Back to Logs
      </Link>
      
      <header className="mb-10 border-b border-gray-200 dark:border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{post.date}</span>
          {post.project && post.project !== 'General / Concept' && (
            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-full border border-indigo-200 dark:border-indigo-800/30">
              {post.project}
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>
      </header>

      <article className="prose prose-lg dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl prose-img:shadow-lg">
            <ReactMarkdown 
              rehypePlugins={[rehypeSlug]}
              components={{
                a: (props) => {
                  // Create a safe copy of props and remove 'node' to prevent React DOM warnings 
                  // while avoiding ESLint unused variable errors.
                  const safeProps = { ...props };
                  delete safeProps.node;

                  // If it's an internal anchor link (e.g., #architecture)
                  if (safeProps.href && safeProps.href.startsWith('#') && !safeProps.href.startsWith('#/')) {
                    return (
                      <a 
                        href={safeProps.href} 
                        onClick={(e) => {
                          e.preventDefault();
                          const target = document.getElementById(safeProps.href.substring(1));
                          if (target) {
                            const y = target.getBoundingClientRect().top + window.scrollY - 100;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }}
                      >
                        {safeProps.children}
                      </a>
                    );
                  }
                  // Otherwise, render a normal link
                  return <a {...safeProps} />;
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
    </div>
  );
}