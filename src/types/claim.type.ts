import { PaginationLink, Project, ProjectType } from "./project.type";
import { UserInfo } from "./user.type";

export type AddressType = "other" | "me";
export type ClaimStatus =
  | "pending"
  | "approved"
  | "paid"
  | "in_progress"
  | "delivered"
  | "canceled";

export interface Claim {
  id: number;
  description: string | null;
  amount: string;
  weight: number;
  address: string;
  address_type: AddressType;
  image: string | null;
  status: ClaimStatus;
  user: UserInfo;
  sponsor_id: number;
  created_at?: string;
}

export interface FullClaim extends Claim {
  confirmation_image?: string | null;
  confirmation_description?: string | null;
  project_id?: number;
  user_id?: number;
  updated_at?: string;
  project: Project;
}

export interface ClaimsResponse {
  current_page: number;
  data: FullClaim[];
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

export interface ClaimStatusResponse {
  type: ProjectType;
  sponsor: boolean;
  status: ClaimStatus;
  confirmed_code: string;
}