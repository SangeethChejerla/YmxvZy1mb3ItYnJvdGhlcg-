// app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from '@/actions/blogAction';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // await the params object
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PostContent slug={slug} />
    </Suspense>
  );
}

async function PostContent({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }
  return (
    <div className="container mx-auto p-4 prose prose-slate">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.tag && (
        <Badge variant="secondary" className="mt-2">
          {post.tag}
        </Badge>
      )}
      <p className="text-gray-500 mt-1">
        Created: {post.createdAt.toLocaleString()}
      </p>
      <p className="text-gray-500 mt-1">
        Updated: {post.updatedAt.toLocaleString()}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
