import { getChatInfo } from "../_api/getChatInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { createdDateConvertor } from "@/lib/dateUtils";
import { ChatMessages } from "../_components/chatMessages";
import { getChat } from "../_api/getChat";
import { getUserData } from "@/lib/getUserDataFromHeaders";

interface ChatPageParams {
    params: Promise<{
        chatId: string
    }>
}

export default async function ChatPage({ params }: ChatPageParams) {
    const userData = await getUserData();

    const resolvedParams = await params;
    const chatInfo = await getChatInfo({ id: resolvedParams.chatId });
    const chatMessages = await getChat({ id: resolvedParams.chatId });
    const otherUser = chatInfo.user.id === userData.user.id ? chatInfo.target : chatInfo.user;

    return (
        <>
            <div className="flex items-center gap-3">
                <Avatar className="size-11">
                    <AvatarImage src={otherUser.profile_photo_path!} alt={otherUser.nickname} />
                    <AvatarFallback>{otherUser.nickname}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-normal text-title">
                        {otherUser.nickname}
                    </h3>
                    <p className="text-xs text-caption font-normal">
                        {createdDateConvertor(chatInfo.created_at)}
                    </p>
                </div>
            </div>
            <ChatMessages
                otherUserId={otherUser.id}
                data={chatMessages?.data}
                userData={userData}
            />
        </>
    )
}