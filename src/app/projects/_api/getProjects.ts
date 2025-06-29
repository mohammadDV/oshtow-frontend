import { API_URL } from "@/configs/global";
import { apiUrls } from "@/constants/apiUrls";
import { ProjectSearchResponse, ProjectType } from "@/types/project.type";

interface GetProjectsParams {
  type: ProjectType;
  page?: number;
  count?: number;
  o_country_id?: string;
  o_province_id?: string;
  o_city_id?: string;
  d_country_id?: string;
  d_province_id?: string;
  d_city_id?: string;
}

export async function getProjects({
  page = 1,
  count = 12,
  type,
  o_country_id,
  o_province_id,
  o_city_id,
  d_country_id,
  d_province_id,
  d_city_id,
}: GetProjectsParams): Promise<ProjectSearchResponse> {
  const searchParams = new URLSearchParams({
    type: type,
    count: count.toString(),
    page: page.toString(),
  });

  if (o_country_id) searchParams.set("o_country_id", o_country_id);
  if (o_province_id) searchParams.set("o_province_id", o_province_id);
  if (o_city_id) searchParams.set("o_city_id", o_city_id);
  if (d_country_id) searchParams.set("d_country_id", d_country_id);
  if (d_province_id) searchParams.set("d_province_id", d_province_id);
  if (d_city_id) searchParams.set("d_city_id", d_city_id);

  const res = await fetch(
    `${API_URL}${apiUrls.projects.search}?${searchParams.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Projects");
  }

  return res.json();
}
