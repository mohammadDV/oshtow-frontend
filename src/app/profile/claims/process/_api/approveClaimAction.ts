"use server";

import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { FullClaim } from "@/types/claim.type";

export interface ApproveClaimResponse {
  status: number;
  message: string;
  data?: FullClaim;
}

export const approveClaimAction = async (
  claimId: number
): Promise<ApproveClaimResponse> => {
  return await getFetchAuth<ApproveClaimResponse>(
    `${apiUrls.claims.all}/${claimId}/approve`
  );
};
