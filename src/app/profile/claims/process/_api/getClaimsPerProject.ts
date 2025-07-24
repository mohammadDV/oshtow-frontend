import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { ClaimsResponse } from "@/types/claim.type";

interface getClaimsPerProjectParams {
  id: string;
  page?: number;
  count?: number;
}

export async function getClaimsPerProject({
  id,
  page = 1,
  count = 6,
}: getClaimsPerProjectParams): Promise<ClaimsResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    count: count.toString(),
  });
  return await getFetchAuth<ClaimsResponse>(
    `${apiUrls.claims.project}/${id}?${params.toString()}`
  );
}
