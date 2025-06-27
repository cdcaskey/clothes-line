
import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  tags: z.string().min(1, "At least one tag is required"),
  githubUrl: z.string().url("Must be a valid URL"),
  demoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  thumbnail: z.any().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
