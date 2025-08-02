import { createdDateConvertor } from "@/lib/dateUtils"
import { ChatInfo, ChatsMessagesResponse } from "@/types/chat.type";
import { UserData, UserInfo } from "@/types/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar"
import { ChatMessages } from "./chatMessages";

interface CurrentChatProps {
    otherUser: UserInfo;
    chatMessages: ChatsMessagesResponse;
    chatInfo: ChatInfo;
    userData: UserData
}

export const CurrentChat = ({ chatInfo, chatMessages, otherUser, userData }: CurrentChatProps) => {
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