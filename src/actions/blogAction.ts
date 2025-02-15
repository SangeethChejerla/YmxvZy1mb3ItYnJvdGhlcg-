'use server';

import { db } from '@/db';
import { NewPost, Post, posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(255)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must be lowercase and contain only letters, numbers, and hyphens'
    ),
  content: z.string().min(1, 'Content is required'),
  tag: z
    .enum(['History', 'Travel', 'Food', 'Etymology', 'Personal', 'Other'])
    .optional(),
});

export async function createBlogAction(
  data: Omit<NewPost, 'id' | 'createdAt' | 'updatedAt'>
) {
  const result = blogSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.message };
  }

  try {
    await db.insert(posts).values(result.data);
    revalidatePath('/blog');
    redirect('/blog'); //redirect after complete
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { error: 'Failed to create blog post.' };
  }
}

export async function updateBlogAction(
  id: string,
  data: Omit<NewPost, 'id' | 'createdAt' | 'updatedAt'>
) {
  const result = blogSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.message };
  }

  try {
    await db
      .update(posts)
      .set({ ...result.data, updatedAt: new Date() })
      .where(eq(posts.id, id));
    revalidatePath(`/blog`);
    revalidatePath(`/${data.slug}`);
    redirect(`/${data.slug}`);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return { error: 'Failed to update blog post.' };
  }
}

export async function deleteBlogAction(id: string) {
  try {
    await db.delete(posts).where(eq(posts.id, id));
    revalidatePath('/blog');
    redirect('/blog');
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return { error: 'Failed to delete blog post.' };
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const result = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);
    return result[0];
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return undefined;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const allPosts = await db.select().from(posts).orderBy(posts.createdAt);
    return allPosts;
  } catch (error) {
    console.error('Failed to fetch all posts:', error);
    return []; // Return an empty array on error
  }
}
