import { Claim } from "./claim.type";
import { City, Country, Location, Province } from "./location.type";
import { UserInfo } from "./user.type";

export type ProjectType = "sender" | "passenger";
export type PathType = "air" | "land" | "sea";
export type ProjectStatusType =
  | "pending"
  | "in_progress"
  | "completed"
  | "canceled"
  | "reject"
  | "failed"
  | "approved";

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
  address?: string;
  image?: string;
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
  claimsLimit?: Claim[];
  claims_count?: number;
  claimSelected?: Claim[];
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

export interface ProjectEditResponse {
  id: number;
  title: string;
  type: ProjectType;
  path_type: PathType;
  amount: number;
  weight: number;
  address: string;
  image: string | null;
  dimensions: string | null;
  vip: boolean;
  description: string;
  status: ProjectStatusType;
  destination_image: string;
  send_date: string;
  receive_date: string | null;
  o_country_id: number;
  o_province_id: number;
  o_city_id: number;
  d_country_id: number;
  d_province_id: number;
  d_city_id: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
  reason: string | null;
  categories: Category[];
  user: UserInfo;
  o_country: Country;
  o_province: Province;
  o_city: City;
  d_country: Country;
  d_province: Province;
  d_city: City;
}
