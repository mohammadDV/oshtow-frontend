import { UserInfo } from "./user.type";

export type ProjectType = "sender" | "passenger";
export type PathType = "air" | "land" | "sea";
export type ProjectStatusType = "pending" | "inprogress" | "completed";

export interface Country {
  id: number;
  title: string;
  image: string | null;
  status: number;
  created_at: string | null;
}

export interface Province {
  id: number;
  title: string;
  status: number;
  country_id: number;
  created_at: string | null;
}

export interface City {
  id: number;
  title: string;
  status: number;
  province_id: number;
  created_at: string | null;
}

export interface Location {
  country: Country;
  province: Province;
  city: City;
}

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
