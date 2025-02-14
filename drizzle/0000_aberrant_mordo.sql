CREATE TYPE "public"."tag" AS ENUM('History', 'Travel', 'Food', 'Etymology', 'Personal', 'Other');--> statement-breakpoint
CREATE TABLE "post" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"tag" "tag",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "post_slug_unique" UNIQUE("slug")
);
