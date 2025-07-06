import { API_URL } from "@/configs/global";
import { apiUrls } from "@/constants/apiUrls";
import { SingleProjectResponse } from "@/types/project.type";

interface GetPassengerParams {
  id: string;
}

export async function getPassenger({
  id,
}: GetPassengerParams): Promise<SingleProjectResponse> {
  const res = await fetch(`${API_URL}${apiUrls.projects.single}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Projects");
  }

  return res.json();
}
