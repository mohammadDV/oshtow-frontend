import { PaginationLink } from "./project.type";

export interface Post {
  id: number;
  pre_title: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  thumbnail: string | null;
  slide: string | null;
  video: string | null;
  view: number;
  special: number;
  created_at: string;
}

export interface PostsResponse {
  current_page: number;
  data: Post[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
