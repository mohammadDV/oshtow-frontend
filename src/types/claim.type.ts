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
