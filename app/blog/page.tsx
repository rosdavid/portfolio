import { getBlogPosts } from "@/lib/blog";
import { BlogClient } from "./blog-client";
import { Navigation } from "@/components/navigation";

export default function BlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <>
      <Navigation />
      <BlogClient initialPosts={blogPosts} />
    </>
  );
}
