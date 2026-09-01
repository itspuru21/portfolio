
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import fm from 'front-matter';

const rawPosts = import.meta.glob('../content/blogs/*.md', { query: '?raw', import: 'default', eager: true });

export default function BlogPost() {
  const { slug } = useParams();
  
  // Reconstruct the file path based on the URL slug
  const filePath = `../content/blogs/${slug}.md`;
  const fileContent = rawPosts[filePath];

  if (!fileContent) {
    return <div className="text-center py-20 text-xl">Post not found.</div>;
  }

  const parsed = fm(fileContent);

  return (
    <article className="max-w-3xl mx-auto">
      <Link to="/blog" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Back to all posts
      </Link>
      
      <header className="mb-8 border-b pb-8">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight">{parsed.attributes.title}</h1>
        <p className="text-gray-500">{parsed.attributes.date}</p>
      </header>

      {/* The 'prose' class from Tailwind Typography handles all Markdown styling automatically */}
      <div className="prose prose-lg prose-blue max-w-none">
        <Markdown>{parsed.body}</Markdown>
      </div>
    </article>
  );
}