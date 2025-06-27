export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readingTime: number;
  tags: string[];
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [];
