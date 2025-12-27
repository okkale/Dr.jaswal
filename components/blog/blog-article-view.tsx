import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface BlogArticleViewProps {
  article: {
    title: string;
    content: string;
    date?: string;
    author?: string;
    image?: string;
  };
}

/**
 * IMPORTANT:
 * react-markdown types are intentionally loose.
 * This is the ONLY TS-safe way to define components in TS 5.
 */
const markdownComponents: Components = {
  p({ children }) {
    return <p className="mb-4 leading-relaxed">{children}</p>;
  },
  ul({ children }) {
    return <ul className="mb-4 ml-6 list-disc">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="mb-4 ml-6 list-decimal">{children}</ol>;
  },
  li({ children }) {
    return <li className="mb-1">{children}</li>;
  },
  h2({ children }) {
    return (
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="text-xl font-semibold mt-6 mb-3">
        {children}
      </h3>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">
        {children}
      </blockquote>
    );
  },
  a({ href, children }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {children}
      </a>
    );
  },
};

const BlogArticleView: React.FC<BlogArticleViewProps> = ({ article }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {(article.author || article.date) && (
        <div className="text-sm text-gray-500 mb-6">
          {article.author && <span>{article.author}</span>}
          {article.author && article.date && <span> · </span>}
          {article.date && <span>{article.date}</span>}
        </div>
      )}

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full rounded-lg mb-6"
        />
      )}

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {article.content}
      </ReactMarkdown>
    </article>
  );
};

export default BlogArticleView;
