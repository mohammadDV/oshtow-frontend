import { ReadType } from "@/constants/enums";
import { PaginationLink } from "./project.type";

export type NotificationsModalType =
  | "claim"
  | "passenger"
  | "sender"
  | "profile"
  | "chat"
  | "wallet"
  | "withdrawal"
  | "ticket";

export interface Notification {
  id: number;
  title: string;
  content: string;
  user_id: number;
  status: number;
  read: ReadType;
  model_id: number;
  model_type: NotificationsModalType;
  created_at: string;
  updated_at: string;
}

export interface NotificationsResponse {
  current_page: number;
  data: Notification[];
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
