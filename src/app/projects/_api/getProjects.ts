import { API_URL } from "@/configs/global";
import { apiUrls } from "@/constants/apiUrls";
import { PathType, ProjectSearchResponse, ProjectType } from "@/types/project.type";

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
  send_date?: string;
  receive_date?: string;
  categories?: string[];
  path_type?: PathType;
  min_weight?: string
  max_weight?: string
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
  send_date,
  receive_date,
  categories,
  path_type,
  min_weight,
  max_weight
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
  if (send_date) searchParams.set("send_date", send_date);
  if (receive_date) searchParams.set("receive_date", receive_date);
  if (path_type) searchParams.set("path_type", path_type);
  if (min_weight) searchParams.set("min_weight", min_weight);
  if (max_weight) searchParams.set("max_weight", max_weight);

  if (categories && categories.length > 0) {
    categories.forEach(categoryId => {
      searchParams.append('categories[]', categoryId);
    });
  }

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
