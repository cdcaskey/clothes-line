
import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  summary: z.string().min(30, "Summary must be at least 30 characters"),
  tags: z.string().min(1, "At least one tag is required"),
  content: z.string().min(1, "Content is required"),
  publishedAt: z.string().optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;
