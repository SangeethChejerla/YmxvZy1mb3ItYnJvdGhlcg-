// app/edit/[id]/page.tsx
import { getAllPosts } from '@/actions/blogAction';
import ContentForm from '@/components/content-form';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: { id: string };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = (
    await db.select().from(posts).where(eq(posts.id, params.id)).limit(1)
  )[0];

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <ContentForm initialData={post} />
    </div>
  );
}

export async function generateStaticParams() {
  const postsData = await getAllPosts();

  return postsData.map((post) => ({
    id: post.id,
  }));
}
