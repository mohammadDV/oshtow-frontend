import { Location } from "./location.type";
import { UserInfo } from "./user.type";

export type ProjectType = "sender" | "passenger";
export type PathType = "air" | "land" | "sea";
export type ProjectStatusType = "pending" | "in_progress" | "completed" | "canceled" | "reject" | "failed";

export interface Category {
  id: number;
  title: string;
  status: number | null;
  created_at: string | null;
}

export interface Project {
  id: number;
  title: string;
  type: ProjectType;
  path_type: PathType;
  amount: number;
  weight: number;
  dimensions: string;
  vip: boolean;
  description: string;
  status: ProjectStatusType;
  destination_image: string;
  send_date: string;
  receive_date: string;
  origin: Location;
  destination: Location;
  categories: Category[];
  user: UserInfo;
  created_at?: string;
  updated_at?: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ProjectSearchResponse {
  current_page: number;
  data: Project[];
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

export interface SingleProjectResponse {
  project: Project;
  recommended: Project[];
}

export interface PathTypeOption {
  value: string;
  label: string;
}