import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { FullClaim } from "@/types/claim.type";

interface getTheClaimParams {
  id: string;
}

export async function getTheClaim({
  id,
}: getTheClaimParams): Promise<FullClaim> {
  return await getFetchAuth<FullClaim>(`${apiUrls.claims.all}/${id}`);
}
