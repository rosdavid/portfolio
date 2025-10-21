import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";

export function BlogSection() {
  const blogPosts = getBlogPosts();

  if (blogPosts.length === 0) {
    return null; // Don't show section if no posts
  }

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured).slice(0, 6); // Limit regular posts

  return (
    <section id="blog" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Latest Articles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, technology,
            and best practices.
          </p>
        </div>

        <div className="space-y-12">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Featured Articles
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="glass-card border border-white/10 hover:border-primary/20 transition-all duration-300 group"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className="glass-button text-xs"
                        >
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
                        asChild
                      >
                        <Link href={`/blog/${post.slug}`}>
                          Read More
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">More Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {regularPosts.map((post) => (
                <Card
                  key={post.id}
                  className="glass-card border border-white/10 hover:border-primary/20 transition-all duration-300 group"
                >
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
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
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="glass-button"
              asChild
            >
              <Link href="/blog">
                View All Articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
