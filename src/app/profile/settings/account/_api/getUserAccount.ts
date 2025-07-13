import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { UserAccountResponse } from "@/types/user.type";

interface GetUserAccountProps {
    id: number;
}

export async function getUserAccount({
    id,
}: GetUserAccountProps): Promise<{ user: UserAccountResponse }> {
    return getFetchAuth<{ user: UserAccountResponse }>(`${apiUrls.user.profile}/${id}`);
}
