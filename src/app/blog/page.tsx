// app/blog/page.tsx
import { deleteBlogAction, getAllPosts } from '@/actions/blogAction';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { Suspense } from 'react';

// Create a server action
async function deletePost(postId: string) {
  'use server';
  await deleteBlogAction(postId);
  revalidatePath('/blog');
}

async function BlogPage() {
  const allPosts = await getAllPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <Link href="/post">
        <Button className="mb-4">Create New Post</Button>
      </Link>
      <Suspense fallback={<p>Loading posts...</p>}>
        <ul>
          {allPosts.map((post) => (
            <li key={post.id} className="mb-4 p-4 border rounded-md shadow">
              <h2 className="text-xl font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {post.tag && (
                <Badge variant="secondary" className="mt-2">
                  {post.tag}
                </Badge>
              )}
              <p className="text-gray-500 mt-1">
                Created at: {post.createdAt.toLocaleString()}
              </p>
              <div className="mt-2 flex gap-2">
                <Link href={`/edit/${post.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <form action={deletePost.bind(null, post.id)}>
                  <Button type="submit" variant="destructive" size="sm">
                    Delete
                  </Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}

export default BlogPage;
