
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  tags: string[];
  featuredImage: string;
  author: Author;
  publishedDate: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured?: boolean;
}

export type Category = 
  | 'Latest News' 
  | 'Match Reports' 
  | 'Match Previews' 
  | 'Transfer News' 
  | 'Features';

export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}
