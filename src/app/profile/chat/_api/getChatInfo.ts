import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { ChatInfo } from "@/types/chat.type";

interface GetChatInfoParams {
    id: string;
}

export async function getChatInfo({
    id,
}: GetChatInfoParams): Promise<ChatInfo> {
    return getFetchAuth<ChatInfo>(
        `${apiUrls.chat.info}/${id}`
    );
}
