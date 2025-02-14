// components/content-form.tsx
'use client';

import { createBlogAction, updateBlogAction } from '@/actions/blogAction'; // Corrected import path
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

import Editor from '@/components/editor/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Post } from '@/db/schema'; // Corrected import path
import { useRouter } from 'next/navigation';

export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [],
    },
  ],
};
interface ContentFormProps {
  initialData?: Post;
}

export default function ContentForm({ initialData }: ContentFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [content, setContent] = useState<string>(initialData?.content || '');
  const [tag, setTag] = useState<string | undefined>(
    initialData?.tag || undefined
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const name = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setSlug(name);
  }, [title]);

  async function handleSubmit() {
    startTransition(async () => {
      let result;

      if (initialData) {
        result = await updateBlogAction(initialData.id, {
          title,
          slug,
          content,
          tag,
        });
      } else {
        result = await createBlogAction({ title, slug, content, tag });
      }

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(initialData ? 'Post Updated' : 'Post created');
      }
    });
  }

  return (
    <div className="mt-6 flex max-w-2xl flex-col gap-4">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          readOnly={!!initialData} // Slug is read-only when editing
        />
      </div>
      <Select onValueChange={setTag} defaultValue={initialData?.tag}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>{' '}
          {/* Changed value to "none" */}
          <SelectItem value="History">History</SelectItem>
          <SelectItem value="Travel">Travel</SelectItem>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Etymology">Etymology</SelectItem>
          <SelectItem value="Personal">Personal</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>

      <Editor
        initialValue={
          initialData ? JSON.parse(initialData.content) : defaultValue
        }
        onChange={setContent}
      />
      <Button onClick={handleSubmit} disabled={isPending}>
        {isPending
          ? initialData
            ? 'Updating...'
            : 'Submitting...'
          : initialData
          ? 'Update'
          : 'Create'}
      </Button>
    </div>
  );
}
