
import { getPostBySlug } from '@/actions/blogAction';
import ContentForm from '@/components/content-form';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: { slug: string };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params; 
  const post = await getPostBySlug(slug);

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
