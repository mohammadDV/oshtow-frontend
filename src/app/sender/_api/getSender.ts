import { API_URL } from "@/configs/global";
import { apiUrls } from "@/constants/apiUrls";
import { SingleProjectResponse } from "@/types/project.type";

interface GetSenderParams {
  id: string;
}

export async function getSender({
  id,
}: GetSenderParams): Promise<SingleProjectResponse> {
  const res = await fetch(`${API_URL}${apiUrls.projects.single}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Projects");
  }

  return res.json();
}
