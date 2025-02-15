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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          {initialData ? 'Edit Post' : 'Create New Post'}
        </h2>
      </div>

      {/* Main Form Section */}
      <div className="space-y-6">
        {/* Title and Slug Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <Input
              type="text"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 px-4 border-gray-200 dark:border-gray-800 rounded-xl 
                        focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        bg-white dark:bg-gray-900 transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Slug
            </label>
            <Input
              type="text"
              placeholder="url-friendly-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              readOnly={!!initialData}
              className="h-12 px-4 border-gray-200 dark:border-gray-800 rounded-xl 
                        bg-gray-50 dark:bg-gray-800 transition-all duration-200"
            />
          </div>
        </div>

        {/* Tag Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <Select onValueChange={setTag} defaultValue={initialData?.tag}>
            <SelectTrigger
              className="h-12 px-4 border-gray-200 dark:border-gray-800 rounded-xl
                                    bg-white dark:bg-gray-900 transition-all duration-200"
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent
              className="bg-white dark:bg-gray-900 border-gray-200 
                                   dark:border-gray-800 rounded-lg shadow-lg"
            >
              <SelectItem
                value="none"
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                None
              </SelectItem>
              <SelectItem
                value="History"
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                History
              </SelectItem>
              <SelectItem
                value="Travel"
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Travel
              </SelectItem>
              <SelectItem
                value="Food"
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Food
              </SelectItem>
              <SelectItem
                value="Etymology"
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Etymology
              </SelectItem>
              <SelectItem
                value="Personal"
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Personal
              </SelectItem>
              <SelectItem
                value="Other"
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Other
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Editor Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <div
            className="rounded-xl overflow-hidden border border-gray-200 
                        dark:border-gray-800 transition-all duration-200
                        focus-within:ring-2 focus-within:ring-purple-500"
          >
            <Editor
              initialValue={
                initialData ? JSON.parse(initialData.content) : defaultValue
              }
              onChange={setContent}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 
                     hover:from-purple-700 hover:to-blue-600 text-white rounded-xl
                     transition-all duration-200 transform hover:scale-105
                     disabled:opacity-70 disabled:cursor-not-allowed
                     flex items-center gap-2"
          >
            {isPending && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isPending
              ? initialData
                ? 'Updating...'
                : 'Creating...'
              : initialData
              ? 'Update Post'
              : 'Publish Post'}
          </Button>
        </div>
      </div>
    </div>
  );
}
