// lib/db/schema.ts
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';

// Define the tags enum
export const tagEnum = pgEnum('tag', [
  'History',
  'Travel',
  'Food',
  'Etymology',
  'Personal',
  'Other',
]);

export const posts = pgTable(
  'post',
  {
    id: varchar('id', { length: 255 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()), // Use crypto.randomUUID() for better uniqueness
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    content: text('content').notNull(),
    tag: tagEnum('tag'), // Add the tag field, allowing null values.
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (post) => ({
    slugUnique: unique().on(post.slug),
  })
);

// Type definitions
export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;
