import { getFetch } from "@/core/publicService";
import { apiUrls } from "@/constants/apiUrls";
import { SingleProjectResponse } from "@/types/project.type";

interface GetSenderParams {
  id: string;
}

export async function getSender({
  id,
}: GetSenderParams): Promise<SingleProjectResponse> {
  return getFetch<SingleProjectResponse>(`${apiUrls.projects.single}/${id}`);
}
