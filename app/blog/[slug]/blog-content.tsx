"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className } = props;
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;

            return isInline ? (
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                {children}
              </code>
            ) : (
              <div className="rounded-lg mt-6 mb-6 p-4 bg-muted animate-pulse">
                <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
              </div>
            );
          },
          // ... rest of components remain the same
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-12 mb-8">{children}</h1>
          ),
          h2: ({ children, ...props }) => {
            const id = children
              ?.toString()
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return (
              <h2 id={id} className="text-3xl font-bold mt-10 mb-6" {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const id = children
              ?.toString()
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return (
              <h3 id={id} className="text-2xl font-bold mt-8 mb-4" {...props}>
                {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="mb-6 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc my-6 ml-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal my-6 ml-6">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-2">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className } = props;
          const match = /language-(\w+)/.exec(className || "");
          const isInline = !match;

          return isInline ? (
            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
              {children}
            </code>
          ) : (
            <SyntaxHighlighter
              style={isDark ? oneDark : oneLight}
              language={match![1]}
              PreTag="div"
              className="rounded-lg !mt-6 !mb-6"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        },
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold mt-12 mb-8">{children}</h1>
        ),
        h2: ({ children, ...props }) => {
          const id = children
            ?.toString()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
          return (
            <h2 id={id} className="text-3xl font-bold mt-10 mb-6" {...props}>
              {children}
            </h2>
          );
        },
        h3: ({ children, ...props }) => {
          const id = children
            ?.toString()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
          return (
            <h3 id={id} className="text-2xl font-bold mt-8 mb-4" {...props}>
              {children}
            </h3>
          );
        },
        p: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc my-6 ml-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal my-6 ml-6">{children}</ol>
        ),
        li: ({ children }) => <li className="mb-2">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
