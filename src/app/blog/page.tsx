import { getAllPosts } from '@/actions/blogAction';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Suspense } from 'react';

async function BlogPage() {
  const allPosts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>

      <Suspense fallback={<p>Loading posts...</p>}>
        <div className="flex flex-col gap-6">
          {allPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="flex flex-col p-6 rounded-xl bg-card hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/20">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.tag && (
                      <Badge variant="secondary" className="ml-2">
                        {post.tag}
                      </Badge>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  );
}

export default BlogPage;
