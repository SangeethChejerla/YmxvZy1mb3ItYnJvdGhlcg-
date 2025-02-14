// app/post/page.tsx
import ContentForm from '@/components/content-form';

export default function CreatePostPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <ContentForm />
    </div>
  );
}
