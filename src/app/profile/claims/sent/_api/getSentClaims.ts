import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { ClaimsResponse, ClaimStatus } from "@/types/claim.type";

interface GetSentClaimsParams {
  id: number;
  status?: ClaimStatus;
  page?: number;
  count?: number;
}

export async function getSentClaims({
  id,
  status,
  page = 1,
  count = 6,
}: GetSentClaimsParams): Promise<ClaimsResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    count: count.toString(),
    ...(status && { status }),
  });
  return await getFetchAuth<ClaimsResponse>(
    `${apiUrls.claims.user}/${id}?${params.toString()}`
  );
}
