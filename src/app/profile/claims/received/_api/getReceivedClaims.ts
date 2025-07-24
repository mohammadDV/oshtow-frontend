import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { ProjectSearchResponse, ProjectType } from "@/types/project.type";

interface GetReceivedProjectsClaimsParams {
  type?: ProjectType;
  page?: number;
  count?: number;
}

export async function getReceivedProjectsClaims({
  type,
  page = 1,
  count = 6,
}: GetReceivedProjectsClaimsParams): Promise<ProjectSearchResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    count: count.toString(),
    ...(type && { type }),
  });
  return await getFetchAuth<ProjectSearchResponse>(
    `${apiUrls.projects.profile}?${params.toString()}`
  );
}
