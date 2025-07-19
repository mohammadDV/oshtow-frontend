import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import {
  ProjectSearchResponse,
  ProjectStatusType,
  ProjectType,
} from "@/types/project.type";

interface GetProfileProjectsParams {
  type: ProjectType;
  status?: ProjectStatusType;
  page?: number;
  count?: number;
}

export async function getProfileProjects({
  type,
  status,
  page = 1,
  count = 6,
}: GetProfileProjectsParams): Promise<ProjectSearchResponse> {
  const params = new URLSearchParams({
    type,
    page: page.toString(),
    count: count.toString(),
    ...(status && { status }),
  });
  return await getFetchAuth<ProjectSearchResponse>(
    `${apiUrls.projects.profile}?${params.toString()}`
  );
}
