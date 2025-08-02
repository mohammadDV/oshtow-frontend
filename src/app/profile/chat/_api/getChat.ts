import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { ChatsMessagesResponse } from "@/types/chat.type";


interface GetChatParams {
    page?: number;
    count?: number;
    id: string;
}

export const getChat = async ({
    id,
    page = 1,
    count = 15,
}: GetChatParams): Promise<ChatsMessagesResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
        count: count.toString(),
        column: "created_at",
        sort: "desc"
    });

    return getFetchAuth<ChatsMessagesResponse>(
        `${apiUrls.chat.all}/${id}?${params.toString()}`
    );
};