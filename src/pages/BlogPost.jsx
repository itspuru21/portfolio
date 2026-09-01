import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import fm from 'front-matter';

const rawPosts = import.meta.glob('../content/blogs/*.md', { query: '?raw', import: 'default', eager: true });

export default function BlogPost() {
  const { slug } = useParams();
  
  const filePath = `../content/blogs/${slug}.md`;
  const fileContent = rawPosts[filePath];

  if (!fileContent) {
    return <div className="text-center py-20 text-xl dark:text-white">Post not found.</div>;
  }

  const parsed = fm(fileContent);

  return (
    <article className="max-w-3xl mx-auto py-10">
      <Link to="/blog" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-8 inline-block">
        &larr; Back to all posts
      </Link>
      
      <header className="mb-10 border-b border-gray-200 dark:border-slate-800 pb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
          {parsed.attributes.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Published on {parsed.attributes.date}
        </p>
      </header>

      {/* prose-invert automatically handles dark mode text colors for Markdown elements */}
      <div className="prose prose-lg dark:prose-invert prose-blue max-w-none">
        <Markdown>{parsed.body}</Markdown>
      </div>
    </article>
  );
}