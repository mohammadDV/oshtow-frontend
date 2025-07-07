import { getFetch } from "@/core/publicService";
import { apiUrls } from "@/constants/apiUrls";
import { UserInfoResponse } from "@/types/user.type";

interface GetUserParams {
    id: string;
}

export async function getUser({
    id,
}: GetUserParams): Promise<UserInfoResponse> {
    return getFetch<UserInfoResponse>(`${apiUrls.user.info}/${id}`);
}
