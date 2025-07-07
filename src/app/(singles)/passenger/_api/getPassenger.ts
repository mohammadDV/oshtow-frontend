import { apiUrls } from "@/constants/apiUrls";
import { SingleProjectResponse } from "@/types/project.type";
import { getFetch } from "@/core/publicService";

interface GetPassengerParams {
  id: string;
}

export async function getPassenger({
  id,
}: GetPassengerParams): Promise<SingleProjectResponse> {
  return getFetch<SingleProjectResponse>(
    `${apiUrls.projects.single}/${id}`
  );
}
