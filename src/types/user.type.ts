import { VipType } from "@/constants/enums";
import { Project } from "./project.type";

export interface UserInfo {
  id: number;
  nickname: string;
  biography: string | null;
  profile_photo_path: string | null;
  bg_photo_path: string | null;
  rate: number;
  point: number | null;
  vip: VipType;
}

export interface UserData {
  is_admin: boolean;
  verify_email: boolean;
  verify_access: boolean;
  status_approval: false | "pending" | "paid" | "in_progress" | "completed";
  customer_number: string;
  user: UserInfo;
  bank_details: {
    sheba: string;
    bank_name: string;
    card_number: string;
    owner_name: string;
  };
  identity_amount: number;
}

export interface UserInfoResponse {
  user: UserInfo;
  sender_projects: Project[];
  passenger_projects: Project[];
  sender_projects_count: number;
  passenger_projects_count: number;
}

export interface UserAccountResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  nickname: string;
  address: string;
  country_id: number;
  province_id: number;
  city_id: number;
  mobile: string;
  biography: string | null;
  profile_photo_path: string | null;
  bg_photo_path: string | null;
  rate: number;
  point: number;
}
