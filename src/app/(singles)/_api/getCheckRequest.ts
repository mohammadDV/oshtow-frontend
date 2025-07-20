import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";

interface CheckRequestProps {
    id: string
}

interface CheckRequestService {
    request_enable: boolean;
    chat_enable: boolean;
}

export const getCheckRequest = async ({ id }: CheckRequestProps): Promise<CheckRequestService> => {
    return await getFetchAuth(`${apiUrls.projects.single}/${id}/check-request`);
}