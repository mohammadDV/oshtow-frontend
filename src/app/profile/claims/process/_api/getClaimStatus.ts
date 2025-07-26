import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { ClaimStatusResponse } from "@/types/claim.type";

interface getClaimStatusParams {
  id: string;
}

export async function getClaimStatus({
  id,
}: getClaimStatusParams): Promise<ClaimStatusResponse> {
  return await getFetchAuth<ClaimStatusResponse>(
    `${apiUrls.claims.all}/${id}/status`
  );
}
