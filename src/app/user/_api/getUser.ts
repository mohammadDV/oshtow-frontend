import { API_URL } from "@/configs/global";
import { apiUrls } from "@/constants/apiUrls";
import { UserInfoResponse } from "@/types/user.type";

interface GetUserParams {
    id: string;
}

export async function getUser({
    id,
}: GetUserParams): Promise<UserInfoResponse> {
    const res = await fetch(`${API_URL}${apiUrls.user.info}/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch Projects");
    }

    return res.json();
}
