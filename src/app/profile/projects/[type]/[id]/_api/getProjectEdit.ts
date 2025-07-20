import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { ProjectEditResponse } from "@/types/project.type";

interface GetProjectParams {
    id: string;
}

export async function getProjectEdit({
    id,
}: GetProjectParams): Promise<ProjectEditResponse> {
    return getFetchAuth<ProjectEditResponse>(`${apiUrls.projects.profile}/${id}/edit`);
}
