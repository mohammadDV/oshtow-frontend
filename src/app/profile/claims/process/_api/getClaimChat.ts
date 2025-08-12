import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";

export interface ClaimChatResponse {
  id: number;
  user_id: number;
  target_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export const getClaimChat = async (claimId: number): Promise<ClaimChatResponse> => {
  return await getFetchAuth(`${apiUrls.chat.claims}/${claimId}`);
};