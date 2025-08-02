import { apiUrls } from "@/constants/apiUrls";
import { postFetchAuth } from "@/core/baseService";
import { ChatsResponse } from "@/types/chat.type";

interface GetChatsParams {
    page?: number;
    count?: number;
}

export const getChats = async ({
    page = 1,
    count = 100,
}: GetChatsParams): Promise<ChatsResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
        count: count.toString(),
    });

    return postFetchAuth(`${apiUrls.chat.all}?${params.toString()}`, {});
};
