import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BlogContent } from "./blog-content";
import { Navigation } from "@/components/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same tags, excluding current post)
  const allPosts = getBlogPosts();
  const relatedPosts = allPosts
    .filter(
      (p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 3);

  // Share data
  const shareUrl = `https://davidros.vercel.app/blog/${slug}`;
  const shareTitle = post.title;
  const shareText = post.excerpt;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ReadingProgress />

      {/* Header */}
      <section className="py-12 px-4 border-b border-white/10 md:mt-16">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" className="mb-8" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {post.featured && (
                <Badge variant="secondary" className="glass-button">
                  Featured
                </Badge>
              )}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.webp" alt={post.author} />
                  <AvatarFallback>
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-xs">{post.authorBio}</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <article className="prose prose-lg prose-invert max-w-none">
            <BlogContent content={post.content} />
          </article>

          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <ShareButtons url={shareUrl} title={shareTitle} text={shareText} />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 px-4 border-t border-white/10">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="glass-card border border-white/10 hover:border-primary/20 transition-all duration-300 group"
                >
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(relatedPost.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {relatedPost.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
                      asChild
                    >
                      <Link href={`/blog/${relatedPost.slug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
